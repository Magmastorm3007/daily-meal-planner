import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function Meals() {
  const router = useRouter();
  const { day } = useLocalSearchParams<{ day: string }>();

  const handlePress = (mealType: string) => {
    router.push(`/food?day=${day}&mealType=${mealType}`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-yellow-100 p-4">
      <TouchableOpacity 
        onPress={() => router.push('/home')} 
        className="absolute top-4 left-4 p-2 bg-orange-300 z-10 rounded-xl flex-row items-center space-x-2"
      >
        <Ionicons name="arrow-back" size={14} color="white" />
        <Text className="text-white text-sm font-semibold">Back</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-bold mb-12">Select a Meal for {day}</Text>

      <View className="flex-col items-center">
        {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((mealType, index) => (
          <Animatable.View 
            key={mealType} 
            animation="fadeIn" // Animation on load
            duration={1000} // Duration of the animation
            delay={index * 300} // Staggered delay for each meal type
          >
            <TouchableOpacity
              className="w-64 p-4 mb-4 bg-blue-200 rounded-lg flex-row items-center justify-between"
              onPress={() => handlePress(mealType)}
            >
              {/* Icons for each meal type */}
              <Ionicons 
                name={
                  mealType === 'Breakfast' ? 'sunny' :
                  mealType === 'Lunch' ? 'pizza' :
                  mealType === 'Snack' ? 'ice-cream' :
                  'restaurant'
                }
                size={24}
                color="rgb(234, 88, 12)"
              />
              <Text className="text-xl font-semibold">{mealType}</Text>
              <Ionicons name="chevron-forward" size={20} color="rgb(234, 88, 12)" />
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
}
