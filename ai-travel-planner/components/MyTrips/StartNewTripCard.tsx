import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function StartNewTripCard() {

  const router=useRouter();

  return (
    <View style={{
      padding: 20,
      marginTop: 50,
      display: 'flex',
      alignItems: 'center',
      gap: 25
    }}>
      <Entypo name="location-pin" size={30} color="black" />
      <Text style={{
        fontSize: 25,
        fontFamily: 'poppins-medium',
      }}>
        No trips planned yet.
      </Text>
      <Text style={{
        fontSize: 20,
        fontFamily: 'poppins-regular',
        textAlign: 'center',
        color:Colors.grey
      }}>
        Looks like it's time to plan a new travel experience! Get started below.
      </Text>
      <TouchableOpacity 
      onPress={()=>router.push('/create-trip/search-place')}
      style={{
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 15,
        paddingHorizontal: 30,
      }}>
        <Text style={{
          fontSize: 17,
          fontFamily: 'poppins-medium',
          color: Colors.white
        }}>
          Start a new trip
        </Text>
      </TouchableOpacity>
    </View>
  )
}