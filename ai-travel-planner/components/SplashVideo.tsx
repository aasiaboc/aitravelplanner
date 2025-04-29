import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Video, ResizeMode } from 'expo-av';
import { Colors } from '@/constants/Colors';

const SplashScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Video 
              shouldPlay
              source={require('../assets/videos/splash.mp4')} 
              style={styles.video} 
              resizeMode={ResizeMode.COVER}
              isLooping={false} // Ensure it doesn't loop
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  video: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default SplashScreen;
