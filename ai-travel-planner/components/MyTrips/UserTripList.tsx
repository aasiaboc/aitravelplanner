import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '@/constants/Colors';
import moment from 'moment';
import UserTripCard from './UserTripCard';

interface UserTrip {
  tripData: string;
  tripPlan?: {
    tripPlan?: {
      Location?: string;
      startDate?: string;
      travelers?: string;
    };
  };
}

export default function UserTripList({ userTrips }: {userTrips: UserTrip[]}) {

  const LatestTrip = JSON.parse(userTrips[0].tripData);

  return userTrips&&(
    <View>
      <View style={{ marginTop: 5 }}>
      {LatestTrip?.locationInfo?.photoRef ? 
        <Image
          source={{ uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
            +LatestTrip.locationInfo?.photoRef
            +'&key='
            +process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY 
          }}
        style={{
            width: '100%',
            height: 240,
            resizeMode: 'cover',
            borderRadius: 20,
          }}
        />
       : 
        <Image
          source={require('./../../assets/images/default.jpeg')}
          style={{
            width: '100%',
            height: 240,
            resizeMode: 'cover',
            borderRadius: 20,
          }}
        />
      }


        <View style={{ marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'poppins-bold',
              color: Colors.black,
            }}
          >
            {userTrips[0].tripPlan?.tripPlan?.Location || 'No location available'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontFamily: 'poppins-regular' }}>
              {moment(LatestTrip.startDate).format('MMMM Do YYYY')}
            </Text>
            <Text style={{ fontSize: 16, fontFamily: 'poppins-regular' }}>
              🚌 {userTrips[0].tripPlan?.tripPlan?.travelers || 'No title available'}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              borderRadius: 25,
              marginTop: 10,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: Colors.primary,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.18,
              shadowRadius: 1.0,
              elevation: 1,
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: 16,
                fontFamily: 'poppins-bold',
              }}
            >
              View Trip
            </Text>
          </TouchableOpacity>
        </View>

        {userTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  );
}
