import { View, Text, TouchableOpacity, TextInput, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '../../../constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  },[])
  const [isEmailFocused, setIsEmailFocused] = React.useState(false);
  const [isPasswordFocused, setPasswordIsFocused] = React.useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={20} color={Colors.black} />
      </TouchableOpacity>
      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[
          styles.input,
          { 
            borderColor: isEmailFocused ? Colors.primary : Colors.grey, 
            borderWidth: isEmailFocused ? 1 : 0 }
        ]}
        placeholder="Enter Email"
        placeholderTextColor={Colors.grey}
        keyboardType="email-address"
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />
      <Text style={styles.label}>Password</Text>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        ...styles.containerRadius,
        borderColor: isPasswordFocused ? Colors.primary : Colors.grey, 
        borderWidth: isPasswordFocused ? 1 : 0 
      }}>
        <TextInput
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            flex: 1, 
          }}
          placeholder="Enter Password"
          placeholderTextColor={Colors.grey}
          secureTextEntry={!isPasswordVisible}
          onFocus={() => setPasswordIsFocused(true)}
          onBlur={() => setPasswordIsFocused(false)}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} size={24} color={Colors.grey} />
        </TouchableOpacity>
      </View>
      <Text style={{
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        marginTop: 15,
        color: Colors.grey,
        alignSelf: 'flex-end'
        // onPress
      }}>
      Forgot Password?
      </Text>

      {/* Sign in btn */}
      <TouchableOpacity style={{
        ...styles.containerRadius,
        backgroundColor: Colors.primary,
        marginTop: 80,
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
        }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.replace('auth/sign-up')}>
          <Text style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 14,
            color: Colors.primary,
            marginLeft: 5,
          }}>Sign Up</Text>
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
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginTop: 25,
  },
  input: {
    height: 50,
    borderRadius: 30,
    marginTop: 10,
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
    marginTop: 10,
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
  }
};