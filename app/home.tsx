import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const daysOfWeek = [
  { day: 'Monday', icon: 'calendar' },
  { day: 'Tuesday', icon: 'calendar' },
  { day: 'Wednesday', icon: 'calendar' },
  { day: 'Thursday', icon: 'calendar' },
  { day: 'Friday', icon: 'calendar' },
  { day: 'Saturday', icon: 'calendar' },
  { day: 'Sunday', icon: 'calendar' },
];

export default function Home() {
  const router = useRouter();

  const handlePress = (day:any) => {
    router.push(`/meals?day=${day}`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-yellow-100 p-4">
      <Text className="text-2xl font-bold mb-6">Select a Day for Meal</Text> {/* Ensure this is wrapped in Text */}
      <View className="flex justify-center">
        {daysOfWeek.map((item, index) => (
          <Animatable.View 
            key={item.day} 
            animation="fadeIn" 
            duration={1000} 
            delay={index * 300} 
          >
            <TouchableOpacity
              className="w-48 h-24 m-2 bg-blue-100 rounded-lg justify-center items-center"
              onPress={() => handlePress(item.day)}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={32} color="rgb(249, 115, 22)" />
              <Text className="text-xl font-semibold mt-2">{item.day}</Text> {/* Ensure this is wrapped in Text */}
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
}
