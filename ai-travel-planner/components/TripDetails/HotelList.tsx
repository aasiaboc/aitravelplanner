import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { GetPhotoRef } from '@/services/GooglePlaceAPI'
import HotelCard from './HotelCard';

export default function HotelList({hotelList}: any) {
  
  return (
    <View style={{
      marginTop: 20,
      }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'poppins-bold',
      }}>🏨 Hotel Recommendation</Text>

      <FlatList
        style={{
        marginTop: 10,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={hotelList}
        renderItem={({item, index})=>(
            <HotelCard item={item} />
                
        )}
      />
    </View>
  )
}