import { View, Text, StyleSheet, Image, } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Video } from "expo-av";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Video 
              shouldPlay
              source={require('../assets/videos/splash.mp4')} 
              style={styles.video} 
              resizeMode="cover"
              isLooping={false} // Ensure it doesn't loop
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white
  },
  video: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})