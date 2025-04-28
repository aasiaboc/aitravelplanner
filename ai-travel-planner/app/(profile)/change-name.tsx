import { View, TextInput, Text, TouchableOpacity, ToastAndroid, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth } from '../../configs/FirebaseConfig';
import { updateProfile } from 'firebase/auth';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfile() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation(); 
  useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerTransparent: true,
        headerTitle: "Change Name",
        headerTitleStyle: {
          fontFamily: "poppins-medium",
          fontSize: 16,
          
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        ),
      });

      // Prefill existing user data
      const user = auth.currentUser;
      if (user) {
        setName(user.displayName || '');
        setEmail(user.email || '');
      }
    }, []);

    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUpdateProfile = () => {
    setIsSubmitted(true);
    
    if (name.length === 0) {
      ToastAndroid.show('Name cannot be empty.', ToastAndroid.SHORT);
      return;
    }

    const user = auth.currentUser;
    if (user) {
      updateProfile(user, {
        displayName: name
      }).then(() => {
        ToastAndroid.show('Profile updated successfully.', ToastAndroid.SHORT);
        router.back(); // Go back after saving
      }).catch((error) => {
        console.error('Error updating profile:', error.message);
        ToastAndroid.show('Failed to update profile.', ToastAndroid.SHORT);
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={(value) => {
                  setName(value);
                  setIsSubmitted(false);
                }}
                placeholder="Enter your first name"
                autoCapitalize="words"
                maxLength={40}
            />
        </View>

        <TouchableOpacity
            style={[styles.saveButton, isLoading && styles.disabledButton]}
            onPress={handleUpdateProfile}
            disabled={isLoading}
        >
            <Text style={styles.saveButtonText}>{isLoading ? "Updating..." : "Save Changes"}</Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>
  )
}

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 100,
    backgroundColor: Colors.white,
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 24,
    color: Colors.black,
    marginBottom: 20,
    marginTop: 10,
  },

  containerRadius: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  errorText: {
    fontFamily: 'poppins-regular',
    fontSize: 12,
    color: Colors .red,
    marginTop: -5,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
      marginBottom: 20,
  },
  label: {
      fontFamily: "poppins-medium",
      fontSize: 14,
      color: "#1C1C1C",
      marginBottom: 8,
  },
  input: {
      fontFamily: "poppins-regular",
      fontSize: 14,
      color: "#1C1C1C",
      borderWidth: 1,
      borderColor: "#E0E0E0",
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
  },
  saveButton: {
      backgroundColor: "#4F80E1",
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: "center",
      marginTop: 10,
  },
  disabledButton: {
      backgroundColor: "#A5BEE9",
  },
  saveButtonText: {
      fontFamily: "poppins-medium",
      fontSize: 16,
      color: "#FFFFFF",
  },
};