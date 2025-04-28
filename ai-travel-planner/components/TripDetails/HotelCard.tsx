import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { GetPhotoRef } from '@/services/GooglePlaceAPI';

export default function HotelCard({ item }: any) {
  const [photoRef, setPhotoRef] = useState<string | undefined>();
  const [geoCoordinates, setGeoCoordinates] = useState<{ lat: number, lon: number } | null>(null);

  useEffect(() => {
    GetGooglePhotoRef();
    parseGeoCoordinates();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName);
    setPhotoRef(result?.results[0]?.photos?.[0]?.photo_reference);
  };

  const parseGeoCoordinates = () => {
    // Extract latitude and longitude from the geo coordinates string (e.g., "48.8712° N, 2.3005° E")
    const geoString = item.geoCoordinates; // e.g., "48.8712° N, 2.3005° E"
    const regex = /([0-9.-]+)°\s([NS]),\s([0-9.-]+)°\s([EW])/;
    const match = geoString.match(regex);

    if (match) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[3]);

      // Handle N/S for latitude and E/W for longitude
      const latFinal = match[2] === 'S' ? -lat : lat;
      const lonFinal = match[4] === 'W' ? -lon : lon;

      setGeoCoordinates({ lat: latFinal, lon: lonFinal });
    }
  };

  const openMap = () => {
    if (geoCoordinates) {
      const { lat, lon } = geoCoordinates;
      const url = `https://www.google.com/maps?q=${lat},${lon}`;
      Linking.openURL(url).catch(err => console.error('Failed to open map:', err));
    }
  };

  return (
    <TouchableOpacity
      style={{
        marginRight: 15,
        width: 180,
      }}
      onPress={openMap} // Open map on press
    >
      <Image
        source={{
          uri:
            'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
            photoRef +
            '&key=' +
            process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        }}
        style={{
          height: 120,
          width: 160,
          borderRadius: 20,
          alignContent: 'center',
        }}
      />
      <View
        style={{
          padding: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'poppins-medium',
          }}
        >
          {item.hotelName}
        </Text>
        <Text
          style={{
            fontFamily: 'poppins-regular',
          }}
        >
          ⭐ {item.rating}
        </Text>
        <Text
          style={{
            fontFamily: 'poppins-regular',
          }}
        >
          💰 {item.hotelPrice}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
