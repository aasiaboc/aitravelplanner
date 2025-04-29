import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import HotelCard from './HotelCard';

export default function HotelList({ hotelList }: any) {
  const openMap = (geoCoordinatesString: string) => {
    if (!geoCoordinatesString) {
      console.warn('No geoCoordinates provided.');
      return;
    }
  
    const parts = geoCoordinatesString.split(',');
    if (parts.length === 2) {
      const lat = parseFloat(parts[0].trim());
      const lon = parseFloat(parts[1].trim());
  
      if (!isNaN(lat) && !isNaN(lon)) {
        const url = `https://www.google.com/maps?q=${lat},${lon}`;
        Linking.openURL(url).catch(err => console.error('Failed to open map:', err));
      } else {
        console.warn('Invalid numbers in geoCoordinates:', geoCoordinatesString);
      }
    } else {
      console.warn('Invalid geoCoordinates format:', geoCoordinatesString);
    }
  };
  

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'poppins-bold',
        }}
      >
        🏨 Hotel Recommendation
      </Text>

      <FlatList
        style={{ marginTop: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={hotelList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openMap(item.geoCoordinates)}
            style={{ marginRight: 15 }}
          >
            <HotelCard item={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
