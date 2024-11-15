import '../global.css'
import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <ImageBackground
      source={require('../assets/backgrounds/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Slot /> {/* This renders child components within the background */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
