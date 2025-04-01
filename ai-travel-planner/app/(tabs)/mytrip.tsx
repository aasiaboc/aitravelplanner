import { View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '@/components/MyTrips/StartNewTripCard';
export default function MyTrip() {
  
  const [userTrips, setUserTrips] = useState([]);
  
  return (
    <View style={{
      padding: 25,
        paddingTop: Platform.OS === "android" ? 40 : 100,
      backgroundColor: Colors.white,
      height: '100%'
    }}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
      }}>
        <Text style={{
          fontSize: 35,
          fontFamily: 'poppins-bold',
        }}>
          My Trip
        </Text>
        <Ionicons name="add-circle-outline" size={35} color="black" />
      </View>

      {userTrips?.length === 0 ? (
        <StartNewTripCard/>
      ) : (
        null
      )}
    </View>
  )
}