import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import Login from "./../components/Login";
import SplashScreen from "../components/SplashScreen";
import { Colors } from '../constants/Colors';
import { auth } from "@/configs/FirebaseConfig";
import { Redirect } from "expo-router";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4();
console.log(id);

export default function Index() {
  const [showLogin, setShowLogin] = useState(false);

  const fadeSplash = useRef(new Animated.Value(1)).current; // Splash starts fully visible
  const fadeLogin = useRef(new Animated.Value(0)).current; // Login starts invisible
  const translateLoginY = useRef(new Animated.Value(-50)).current; // Login starts slightly above

  const user=auth.currentUser;
  useEffect(() => {
    setTimeout(() => {
      // Fade out SplashScreen
      Animated.timing(fadeSplash, {
        toValue: 0,
        duration: 1000, // 1s fade out
        useNativeDriver: true,
      }).start(() => {
        // After splash disappears, start login animation
        setTimeout(() => {
          setShowLogin(true);
          Animated.parallel([
            Animated.timing(fadeLogin, {
              toValue: 1, // Fade in login
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(translateLoginY, {
              toValue: 0, // Move login down
              duration: 800,
              useNativeDriver: true,
            }),
          ]).start();
        }, 300);
      });
    }, 3000); // Wait 3 seconds before starting fade out
  }, []);

  return (
    <View style={styles.container}>
      {/* Primary background should always be present */}
      <View style={styles.primaryBackground} />

      {/* Animated SplashScreen */}
      <Animated.View style={[styles.splashContainer, { opacity: fadeSplash }]}>
        <SplashScreen />
      </Animated.View>

      {/* Animated Login */}
      {showLogin && (
        <Animated.View
          style={[
            styles.loginContainer,
            { opacity: fadeLogin, transform: [{ translateY: translateLoginY }] },
          ]}
        >
          {user ? (
            <Redirect href="/(tabs)/mytrip" />
          ) : (
            <Login />
          )}

        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  primaryBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a5180' // Primary color is always there
  },
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent", // Ensure splash background does not stay white
  },
  loginContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
