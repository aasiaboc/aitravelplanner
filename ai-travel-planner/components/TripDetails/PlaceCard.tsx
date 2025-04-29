import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GetPhotoRef } from '@/services/GooglePlaceAPI';

export default function PlaceCard({ place }: any) {
  const [photoRef, setPhotoRef] = useState<string | undefined>();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(place.placeName);
    setPhotoRef(result?.results[0]?.photos?.[0]?.photo_reference);
  };

  const openMap = () => {
    const geoCoordinates = place?.geoCoordinates; // Example: "48.8584° N, 2.2945° E"
    
    if (geoCoordinates) {
      // Extract latitude and longitude from the string
      const coords = geoCoordinates.split(', ');
      const latitude = parseFloat(coords[0].replace('° N', '').replace('° S', ''));
      const longitude = parseFloat(coords[1].replace('° E', '').replace('° W', ''));

      // Format the URL for Google Maps
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;

      // Open the map
      Linking.openURL(url).catch((err) => console.error('Failed to open map:', err));
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.lightblue,
        padding: 10,
        borderColor: Colors.grey,
        borderRadius: 15,
        marginVertical: 10,
      }}
    >
      <Image
        style={{
          width: '100%',
          height: 140,
          borderRadius: 15,
        }}
        source={
          photoRef
            ? {
                uri:
                  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
                  photoRef +
                  '&key=' +
                  process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              }
            : require('@/assets/images/placeDefaultImage.jpeg')
        }
      />

      <View style={{ marginTop: 5 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'poppins-bold',
          }}
        >
          {place?.placeName}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'poppins-regular',
            color: Colors.grey,
          }}
        >
          {place?.placeDetails}
        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ width: '85%' }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'poppins-regular',
                marginTop: 5,
              }}
            >
              🎟️ Ticket Price: <Text style={{ fontFamily: 'poppins-bold' }}>{place?.ticketPricing}</Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'poppins-regular',
                marginTop: 5,
              }}
            >
              🕒 Time Open: <Text style={{ fontFamily: 'poppins-bold' }}>{place?.timeOpen}</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: Colors.primary,
              padding: 5,
            }}
            onPress={openMap} 
          >
            <Ionicons name="navigate" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
