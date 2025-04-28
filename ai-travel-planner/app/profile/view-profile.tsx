import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router';

export default function ViewProfile() {
  const router = useRouter();
  const navigation = useNavigation(); 
  useEffect(() => {
      navigation.setOptions({
          headerShown: true,
          headerTransparent: true, 
          headerTitle: 'Profile',
          headerTitleAlign: 'center',    
                 
      })
      
  }, [])
  return (
    <View>
      <Text>ViewProfile</Text>
    </View>
  )
}