import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { auth } from '../firebaseConfig'; // Adjust the path as necessary
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router'; //

const Login = () => {
 const router=useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupMode, setIsSignupMode] = useState(false); // State to toggle between login and signup

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, navigate to home
        router.push('/home');
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const handleAuthPress = async () => {
    try {
      if (isSignupMode) {
        // Sign up logic
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Sign Up Successful', 'You can now log in.');
        setIsSignupMode(false); // Switch back to login mode after successful signup
      } else {
        // Login logic
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push('/home');// Navigate to home on successful login or signup
    } catch (error) {
      Alert.alert('Authentication Failed','Please Login Again'); // Show error message
    }
  };

  return (
    <View className="flex-1 justify-center items-center ">
    <View className="bg-white rounded-xl shadow-lg p-6 w-4/5">
      <Text className="text-2xl mb-4 text-center text-orange-600">{isSignupMode ? 'Sign Up' : 'Login'}</Text>
      
      <TextInput
        className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-300"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-300"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity 
        className="bg-orange-600 p-3 rounded-lg w-full mb-4"
        onPress={handleAuthPress}
      >
        <Text className="text-white text-center text-lg">{isSignupMode ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setIsSignupMode(!isSignupMode)}>
        <Text className="text-orange-500 text-center">
          {isSignupMode ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  
  );
};

export default Login;
