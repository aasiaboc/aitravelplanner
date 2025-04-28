import { View, Text, Platform, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from '@/components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import UserTripList from '@/components/MyTrips/UserTripList';

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

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState<UserTrip[]>([]);
  const user = auth.currentUser;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) GetMyTrips();
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    setUserTrips([]);

    const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      setUserTrips((prev) => [...prev, doc.data() as UserTrip]);
    });

    setLoading(false);
  };

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: Platform.OS === 'android' ? 40 : 100,
        backgroundColor: Colors.white,
        height: '100%',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            fontFamily: 'poppins-bold',
          }}
        >
          My Trip
        </Text>
        <Ionicons name="add-circle-outline" size={35} color="black" />
      </View>

      {loading && <ActivityIndicator size="large" color={Colors.primary} />}

      {userTrips?.length === 0 ? <StartNewTripCard /> : <UserTripList userTrips={userTrips} />}
    </ScrollView>
  );
}
