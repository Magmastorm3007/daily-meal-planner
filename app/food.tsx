import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { auth, db } from '@/firebaseConfig'; // Adjust the path as necessary
import { getDocs, query, collection, where, addDoc, setDoc } from 'firebase/firestore';
import * as Animatable from 'react-native-animatable';

export default function Food() {
  const router = useRouter();
  const { day, mealType } = useLocalSearchParams<{ day: string; mealType: string }>();
  const [mealTitle, setMealTitle] = useState('');
  const [recipe, setRecipe] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Fetch user email on component mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      console.log('User not authenticated');
    }
  }, []);

  // Fetch the existing meal entry when the component mounts
  useEffect(() => {
    if (userEmail && day && mealType) {
      const q = query(
        collection(db, 'meals'),
        where('userEmail', '==', userEmail),
        where('day', '==', day),
        where('mealType', '==', mealType)
      );
      const fetchMealData = async () => {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const mealDoc = querySnapshot.docs[0].data();
          setMealTitle(mealDoc.mealTitle);
          setRecipe(mealDoc.recipe);
          setIngredients(mealDoc.ingredients || []);
          setImageUri(mealDoc.imageUrl || null);
        }
      };
      fetchMealData();
    }
  }, [userEmail, day, mealType]);

  const handleImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!userEmail) {
      alert('User is not authenticated');
      return;
    }
    if (!mealTitle.trim()) {
      alert('Please enter a recipe title.');
      return;
    }
  
    if (ingredients.length === 0 || ingredients.every(ingredient => !ingredient.trim())) {
      alert('Please add at least one ingredient.');
      return;
    }

    const q = query(
      collection(db, 'meals'),
      where('userEmail', '==', userEmail),
      where('day', '==', day),
      where('mealType', '==', mealType)
    );
    
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      saveMealEntry(); // No existing meal entry, save as new entry
    } else {
      updateMealEntry(querySnapshot.docs[0]); // Update the existing entry
    }
  };

  const saveMealEntry = async () => {
    try {
      // Save the meal entry to Firestore with local image URI
      await addDoc(collection(db, 'meals'), {
        mealTitle,
        recipe,
        ingredients,
        imageUrl: imageUri,
        userEmail,
        day,
        mealType,
      });

      alert('Meal saved successfully!');
    } catch (error) {
      console.error('Error saving meal:', error);
      alert('Error saving meal');
    }
  };

  const updateMealEntry = async (existingDoc: any) => {
    try {
      // Update the existing document with new data
      await setDoc(existingDoc.ref, {
        mealTitle,
        recipe,
        ingredients,
        imageUrl: imageUri,
        userEmail,
        day,
        mealType,
      }, { merge: true });

      alert('Meal updated successfully!');
    } catch (error) {
      console.error('Error updating meal:', error);
      alert('Error updating meal');
    }
  };

  const handleIngredientChange = (text: string, index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = text;
    setIngredients(updatedIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    if(index>0){
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-yellow-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        
        {/* Home Button */}
        <TouchableOpacity onPress={() => router.push(`/meals?day=${day}`)} className="absolute top-4 left-4 p-2 bg-orange-300 z-10 rounded-xl flex-row items-center space-x-2">
          <Ionicons name="arrow-back" size={14} color="white" />
          <Text className="text-white text-sm font-semibold">Back</Text>
        </TouchableOpacity>

        <Text className="text-3xl font-semibold mb-2 text-gray-800 text-center mt-10">{mealType}</Text>
        <Text className="text-2xl ffont-semibold mb-6 text-center">{day}</Text>

        {/* Meal Title */}
        <Text className="text-xl font-semibold mb-2">Meal Title</Text>
        <TextInput 
          className="w-full p-4 mb-4 border rounded-xl bg-white" 
          placeholder="Enter meal title" 
          value={mealTitle} 
          onChangeText={setMealTitle} 
        />

        {/* Meal Image */}
        <Text className="text-xl font-semibold mb-4">Image Upload</Text>
        <View className="mb-6">
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
          ) : (
            <View className="h-48 bg-gray-200 rounded-lg items-center justify-center">
              <Text className="text-gray-600 italic">No image selected (optional)</Text>
            </View>
          )}
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity className="flex-1 p-4 bg-blue-500 rounded-lg items-center mr-2" onPress={handleImagePicker}>
              <Ionicons name="image" size={20} color="white" />
              <Text className="text-white text-sm">Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 p-4 bg-orange-500 rounded-lg items-center" onPress={handleCamera}>
              <Ionicons name="camera" size={20} color="white" />
              <Text className="text-white text-sm">Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recipe Section */}
        <Animatable.View animation="fadeInUp" duration={800}>
          <Text className="text-xl font-semibold mb-2">Recipe</Text>
          <TextInput 
            className="w-full p-4 mb-4 border rounded-xl bg-white" 
            placeholder="Write recipe here" 
            value={recipe} 
            onChangeText={setRecipe} 
            multiline 
            textAlignVertical="top" 
            style={{ height: 120 }} 
          />
        </Animatable.View>

        {/* Ingredients Section */}
        <Animatable.View animation="fadeInUp" duration={800}>
          <Text className="text-xl font-semibold mb-2">Ingredients</Text>
          {ingredients.map((ingredient, index) => (
            <View key={index} className="flex-row items-center mb-4">
              <TextInput 
                className="flex-1 p-4 border rounded-xl bg-white" 
                placeholder={`Enter Ingredient ${index + 1}`} 
                value={ingredient} 
                onChangeText={(text) => handleIngredientChange(text, index)} 
              />
              <TouchableOpacity className="ml-2 mr-2 w-1/6 p-3 bg-red-500 items-center justify-center rounded-full" onPress={() => removeIngredient(index)}>
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity 
    onPress={addIngredient} 
    className="p-4 w-1/2 bg-blue-500 rounded-lg mb-6 flex-row items-center justify-center"
  >
    <Ionicons name="add-circle" size={20} color="white" />
    <Text className="text-white text-sm ml-2">Add Ingredient</Text>
  </TouchableOpacity>
        </Animatable.View>

        {/* Save Button */}
       {/* Save Button */}

       <Animatable.View animation="fadeInUp" duration={800} className="flex items-center">
  <TouchableOpacity 
    onPress={handleSave} 
    className="p-4 w-1/2 bg-green-600 rounded-lg flex-row items-center justify-center"
  >
    <Ionicons name="save" size={20} color="white" />
    <Text className="text-white text-lg ml-2">Save</Text>
  </TouchableOpacity>
</Animatable.View>
                                                           

      </ScrollView>
    </SafeAreaView>
  );
}

