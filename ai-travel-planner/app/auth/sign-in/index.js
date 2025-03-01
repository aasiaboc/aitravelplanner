import { View, Text, Button, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SignIn() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  },[])
  return (
    <View style={{ 
      paddingTop: 50 + (Platform.OS === 'ios' ? 20 : StatusBar.currentHeight),
      marginHorizontal : 16,
      backgroundColor: Colors.backgroundColor
    }}>
      <TouchableOpacity>
        <MaterialIcons name="arrow-back-ios" size={20} color="black" />
      </TouchableOpacity>
      <Text>Signin</Text>
    </View>
  )
}