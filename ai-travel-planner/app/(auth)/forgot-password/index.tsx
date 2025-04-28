import { View, TextInput, Text, Platform, TouchableOpacity, ToastAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '@/configs/FirebaseConfig';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailFocused, setisEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onSend = () => {
    if (
      email.length === 0 ||
      password.length === 0
    ) {
      alert('Please fill in all fields.');
      ToastAndroid.show('Please fill in all fields.', ToastAndroid.SHORT);
      return; // Prevents further execution if any field is empty
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return; // Prevents sign-up if email format is invalid
    }
    if (password.length === 0) {
      return; // Prevents further execution if password is empty
    }
    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert(
          'Reset Link Sent',
          'Check your email for a password reset link. Follow the instructions to reset your password.',
          [{ text: 'OK', onPress: () => router.push('/(auth)/sign-in') }]
        );
      } catch (error) {
        console.error('Error sending password reset email:', error);
        Alert.alert('Error', (error as Error).message || 'Failed to send reset link. Please try again.');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, error.code);
      if(errorCode === 'auth/user-not-found') {
        alert('User not found.');
        ToastAndroid.show('User not found.', ToastAndroid.SHORT);
      }
      if(errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        ToastAndroid.show('Wrong password.', ToastAndroid.SHORT);
      }
      if(errorCode === 'auth/invalid-email') {
        alert('Invalid email.');
        ToastAndroid.show('Invalid email.', ToastAndroid.SHORT);
      }
      if(errorCode === 'auth/user-disabled') {
        alert('User disabled.');
        ToastAndroid.show('User disabled.', ToastAndroid.SHORT);
      }
      if(errorCode === 'auth/network-request-failed') {
        alert('Network request failed.');
        ToastAndroid.show('Network request failed.', ToastAndroid.SHORT);
      }
      if(errorCode === 'auth/invalid-credential') {
        alert('Invalid credential.');
        ToastAndroid.show('Invalid credential.', ToastAndroid.SHORT);
      }
    });
  }
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={20} color={Colors.black} />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      {/* Email section */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[
          styles.input,
          { 
            borderColor:
              isSubmitted && email.length === 0
                ? Colors.red
                : isSubmitted && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                ? Colors.red
                : Colors.grey,
            borderWidth:
              isSubmitted && (email.length === 0 || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) ? 1 : 0,
          }
        ]}
        placeholder="Enter Email"
        placeholderTextColor={Colors.grey}
        onFocus={() => setisEmailFocused(true)}
        onBlur={() => setisEmailFocused(false)}
        autoCapitalize='none'
        onChangeText={(value) => {
          setEmail(value);
          setIsSubmitted(false);
        }}
        maxLength={40}
      />
      {isSubmitted && email.length === 0 && (
        <Text style={styles.errorText}>Email is required.</Text>
      )}
      {isSubmitted && email.length > 0 && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) && (
        <Text style={styles.errorText}>Invalid email format.</Text>
      )}

      {/* Password */}
      <Text style={styles.label}>Password</Text>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        ...styles.containerRadius,
        borderColor:
          isSubmitted && password.length === 0
            ? Colors.red // Required validation on submit
            : isPasswordFocused
            ? Colors.primary
            : Colors.grey,
        borderWidth:
          isSubmitted && password.length === 0 || (password.length > 0 && password.length < 8) ? 1 : 0,
      }}>
        <TextInput
          style={{
            fontFamily: 'poppins-regular',
            fontSize: 14,
            flex: 1, 
          }}
          placeholder="Enter Password"
          placeholderTextColor={Colors.grey}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setPasswordIsFocused(true)}
          onBlur={() => setPasswordIsFocused(false)}
          onChangeText={(value) => {
            setPassword(value);
            setIsSubmitted(false); // Reset submit state when typing
          }}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      {/* Show validation errors */}
      {isSubmitted && password.length === 0 && (
        <Text style={styles.errorText}>Password is required.</Text>
      )}

      {/* Sign in btn */}
      <TouchableOpacity onPress={onSend} style={{
        ...styles.containerRadius,
        backgroundColor: Colors.primary,
        marginTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          fontFamily: 'poppins-semibold',
          fontSize: 16,
          color: Colors.white,
        }}>Send Reset Link</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundColor,
  },
  title: {
    fontSize: 35,
    fontFamily: 'poppins-semibold',
    marginTop: 18,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'poppins-medium',
    marginTop: 15,
  },
  input: {
    height: 50,
    borderRadius: 30,
    marginTop: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
    fontFamily: 'poppins-regular',
    fontSize: 14,
  },
  elevationShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  containerRadius:{
    height: 50,
    borderRadius: 30,
    marginTop: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  errorText: {
    color: Colors.red,
    fontSize: 12,
    fontFamily: 'poppins-regular',
    marginTop: 5,
  },
};