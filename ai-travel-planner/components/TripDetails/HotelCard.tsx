import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetPhotoRef } from '@/services/GooglePlaceAPI';

export default function HotelCard({ item }: any) {
  const [photoRef, setPhotoRef] = useState<string | undefined>();

  useEffect(() => {
    GetGooglePhotoRef();
  }, []);

  const GetGooglePhotoRef = async () => {
    const result = await GetPhotoRef(item.hotelName);
    setPhotoRef(result?.results[0]?.photos?.[0]?.photo_reference);
  };

  return (
    <View
      style={{
        marginRight: 15,
        width: 180,
      }}
    >
      <Image
        source={
          photoRef
            ? {
                uri:
                  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' +
                  photoRef +
                  '&key=' +
                  process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
              }
            : require('@/assets/images/hotelDefaultImage.png')
        }
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
    </View>
  );
}
