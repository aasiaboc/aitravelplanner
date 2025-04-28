import { View, Image, Text } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Colors } from '@/constants/Colors';

interface Trip {
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
  return (
    <View style={{ 
        marginTop: 20, 
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    }}>
      <Image
        source={{ uri: 
          'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
          +formatData(trip.tripData).locationInfo?.photoRef
          +'&key='
          +process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY 
        }}
      style={{
          width: 100,
          height: 100,
          borderRadius: 20,
        }}
      />
      <View>
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
            Traveling: {trip.tripPlan?.tripPlan?.travelers || '---'}
        </Text>
      </View>
    </View>
  );
}
