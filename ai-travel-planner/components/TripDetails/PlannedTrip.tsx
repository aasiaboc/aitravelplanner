import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import PlaceCard from './PlaceCard';
interface Place {
    bestTime?: string;
    geoCoordinates?: string;
    placeDetails?: string;
    placeName?: string;
    ticketPricing?: string;
    timeOpen?: string;
    placeImageUrl?: string;
  }
  
  interface Itinerary {
    day: number;
    places: Place[];
  }
  
  interface PlannedTripProps {
    details?: Itinerary[];
  }
  
  
export default function PlannedTrip({details}: PlannedTripProps) {
  return (
    <View>
      <Text style={{
        fontSize: 20,
        fontFamily: 'poppins-bold',
        marginTop: 20,
      }}>🏕️ Plan Details</Text>

      {details?.map((dayPlan, dayIndex) => (
        <View key={`day-${dayIndex}`}>
          <Text style={{
            fontFamily: 'poppins-medium',
            fontSize: 20,
            marginTop: 20,
          }}>
            Day {dayPlan.day}
          </Text>

          {dayPlan.places.map((place, placeIndex) => (
            <PlaceCard 
            key={`place-${dayIndex}-${placeIndex}`} 
            place={place} 
          />
          ))}
          </View>
      ))}

  </View>
  )
}