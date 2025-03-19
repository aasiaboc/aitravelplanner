import { View, TextInput, Text, Platform, TouchableOpacity, ToastAndroid } from 'react-native'
import { Colors } from '../../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRouter } from 'expo-router';
import React, { useState, useEffect  } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../configs/FirebaseConfig';

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
    },[])

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isNameFocused, setisNameFocused] = React.useState(false);
  const [isEmailFocused, setisEmailFocused] = React.useState(false);
  const [isPasswordFocused, setPasswordIsFocused] = React.useState(false);
  const [isConfirmPasswordFocused, setConfirmPasswordIsFocused] = React.useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = React.useState(false);
  
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);


  
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  
  // const handleSignUp = () => {
  //   setIsSubmitted(true); // Mark form as submitted
  //   if (
  //     name.length === 0 ||
  //     email.length === 0 ||
  //     password.length === 0 ||
  //     confirmPassword.length === 0
  //   ) {
  //     return; // Prevents further execution if any field is empty
  //   }
  //   if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
  //     return; // Prevents sign-up if email format is invalid
  //   }
  //   if (password.length === 0) {
  //     return; // Prevents further execution if password is empty
  //   }
  //   if (password.length < 8) {
  //     return; // Prevents sign-up if password is too short
  //   }
  //   if (confirmPassword !== password) {
  //     return; // Prevents sign-up if passwords don’t match
  //   }
  // };

  const onCreateAccount = () => {
    setIsSubmitted(true); // Mark form as submitted
    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
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
    if (password.length < 8) {
      return; // Prevents sign-up if password is too short
    }
    if (confirmPassword !== password) {
      return; // Prevents sign-up if passwords don’t match
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      router.replace('/(tabs)/mytrip');
      console.log(user);
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios" size={20} color={Colors.black} />
      </TouchableOpacity>
      <Text style={styles.title}>Sign up</Text>

      {/* Name section */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={[
          styles.input,
          { 
            borderColor: isSubmitted && name.length === 0 ? Colors.red : Colors.grey,
            borderWidth: isSubmitted && name.length === 0 ? 1 : 0,
          }
        ]}
        placeholder="Enter Full Name"
        placeholderTextColor={Colors.grey}
        onFocus={() => setisNameFocused(true)}
        onBlur={() => setisNameFocused(false)}
        maxLength={40}
        onChangeText={(value) => {
          setName(value);
          setIsSubmitted(false);
        }}
        autoCapitalize='words'
      />
      {isSubmitted && name.length === 0 && (
        <Text style={styles.errorText}>Name is required.</Text>
      )}

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          ...styles.containerRadius,
          borderColor:
            isSubmitted && password.length === 0
              ? Colors.red // Required validation on submit
              : password.length > 0 && password.length < 8
              ? Colors.red // Turns red while typing if < 8 characters
              : isPasswordFocused
              ? Colors.primary
              : Colors.grey,
          borderWidth:
            isSubmitted && password.length === 0 || (password.length > 0 && password.length < 8) ? 1 : 0,
        }}
      >
        <TextInput
          style={{
            fontFamily: "Poppins-Regular",
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
            setIsSubmitted(false);
          }}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons
            name={isPasswordVisible ? "visibility" : "visibility-off"}
            size={24}
            color={Colors.grey}
          />
        </TouchableOpacity>
      </View>

      {/* Show validation errors */}
      {isSubmitted && password.length === 0 && (
        <Text style={styles.errorText}>Password is required.</Text>
      )}

      {password.length > 0 && password.length < 8 && (
        <Text style={styles.errorText}>Password must be at least 8 characters.</Text>
      )}


      {/* Confirm Password */}
      <Text style={styles.label}>Confirm Password</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          ...styles.containerRadius,
          borderColor:
            isSubmitted && confirmPassword.length === 0
              ? Colors.red
              : isSubmitted && confirmPassword !== password
              ? Colors.red
              : Colors.grey,
          borderWidth:
            isSubmitted && (confirmPassword.length === 0 || confirmPassword !== password) ? 1 : 0,
        }}
      >
        <TextInput
          style={{ 
            fontFamily: "Poppins-Regular", 
            fontSize: 14, 
            flex: 1 
          }}
          placeholder="Re-enter Password"
          placeholderTextColor={Colors.grey}
          secureTextEntry={!isConfirmPasswordVisible}
          onChangeText={(value) => {
            setConfirmPassword(value);
            setIsSubmitted(false);
          }}

        />
        <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
          <MaterialIcons
            name={isConfirmPasswordVisible ? "visibility" : "visibility-off"}
            size={24}
            color={Colors.grey}
          />
        </TouchableOpacity>
      </View>
      {isSubmitted && confirmPassword.length === 0 && (
        <Text style={styles.errorText}>Confirm Password is required.</Text>
      )}
      {isSubmitted && confirmPassword.length > 0 && confirmPassword !== password && (
        <Text style={styles.errorText}>Passwords do not match.</Text>
      )}

      {/* Sign up btn */}
      <TouchableOpacity onPress={onCreateAccount} style={{
        ...styles.containerRadius,
        backgroundColor: Colors.primary,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          fontFamily: 'Poppins-SemiBold',
          fontSize: 16,
          color: Colors.white,
        }}>Sign In</Text>
      </TouchableOpacity>

      {/* create acc btn */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
      }}>
        <Text style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 14,
          color: Colors.grey,
        }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.replace('/(auth)/sign-in')}>
          <Text style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 14,
            color: Colors.primary,
            marginLeft: 5,
          }}>Sign In</Text>
        </TouchableOpacity>
      </View>

      
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
    fontFamily: 'Poppins-SemiBold',
    marginTop: 18,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
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

    fontFamily: 'Poppins-Regular',
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
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
  },
};
