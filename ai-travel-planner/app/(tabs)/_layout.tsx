import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/Colors';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: 'gray',
    }}>
        <Tabs.Screen name="mytrip"
          options={{
            tabBarLabel: 'My Trip',
            tabBarIcon: ({color}) =>
              <Entypo name="location-pin" 
              size={24} color={color} />  ,
          }}
        />
        <Tabs.Screen name="discover"
          options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({color}) =>
              <Feather name="globe" 
              size={24} color={color} />
          }}
        />
        <Tabs.Screen name="profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color}) =>
              <FontAwesome name="user"
              size={24} color={color} />
          }}
        />
    </Tabs>
  )
}