import { View, Image, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

interface Trip {
  id: string; // <-- added id here
  tripData: string;
  tripPlan?: {
    tripPlan?: {
      location?: string;
      startDate?: string;
      travelers?: string;
    };
  };
}

export default function UserTripCard({ trip }: { trip: Trip }) {
  const formatData = (data: string) => {
    return JSON.parse(data);
  }
  const parsedTripData = JSON.parse(trip.tripData);
  const travelerTitle = parsedTripData.travelerCount?.title || 'No title available';
  const defaultImage = require('../../assets/images/placeDefaultImage.jpeg');

  return (
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: '/trip-details',
        params: {
          trip: JSON.stringify(trip),
        }
      })}
      style={{ 
        marginTop: 20, 
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
      }}
    >
      <Image
        source={parsedTripData.locationInfo?.photoRef
          ? { uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${parsedTripData.locationInfo.photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}` }
          : defaultImage
        }
        style={{
          width: 100,
          height: 100,
          borderRadius: 20,
        }}
      />
      <View style={{
        width: '50%',
      }}>
        <Text style={{
            fontSize: 18,
            fontFamily: 'poppins-medium',
        }}>
          {trip.tripPlan?.tripPlan?.location || 'No location available'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'poppins-regular',
            color: Colors.grey,
          }}
        >
          {moment(formatData(trip.tripData).startDate).format('MMMM Do YYYY')}
          </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'poppins-regular',
            color: Colors.grey,    
          }}
        >
          Traveling: {travelerTitle || '---'}
        </Text>
      </View>

      {/* Delete Button
      <TouchableOpacity 
        onPress={() => onDelete(trip.id)} // <-- Pass trip.id to onDelete
        style={{ marginLeft: 'auto' }}
      >
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
}
