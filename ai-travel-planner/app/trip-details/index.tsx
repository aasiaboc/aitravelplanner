import { View, Text, Image, ScrollView } from 'react-native'
import {useState, useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import FlightInfo from '@/components/TripDetails/FlightInfo';
import HotelList from '@/components/TripDetails/HotelList';
import PlannedTrip from '@/components/TripDetails/PlannedTrip';
interface Trip {
    tripData: string;
    tripPlan?: {
      tripPlan?: {
        location?: string;
        startDate?: string;
        travelers?: string;
        flight?: {
            flightDetails?: {
                flightNumber?: string;
                departureTime?: string;
                arrivalTime?: string;
                airline?: string;
                duration?: string;
                layover?: string;
            }[];
        };
        hotels?: {
            hotelName?: string;
            checkInDate?: string;
            checkOutDate?: string;
            price?: string;
        }[];
        itinerary?: {
            day: number; 
            places?: {
                bestTime?: string;
                geoCoordinates?: string;
                placeDetails?: string;
                placeName?: string;
                ticketPricing?: string;
                timeOpen?: string;
            }[];
        }[];
    };
  };
}
export default function TripDetails() {
    const navigation=useNavigation();
    const{trip}=useLocalSearchParams();
    const [tripDetails, setTripDetails] = useState<Trip | null>(null);

    const formatData = (data: string) => {
        return JSON.parse(data);
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: '',
            headerTransparent: true,
        });
        
        if (typeof trip === 'string') {
            setTripDetails(JSON.parse(trip));
        } else {
            console.error('Invalid trip data:', trip);
        }
        
    }
    , []);
  return tripDetails && (
    <ScrollView>
        <Image
            source={{ uri: 
            'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference='
            +formatData(tripDetails?.tripData).locationInfo?.photoRef
            +'&key='
            +process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY 
            }}
        style={{
            width: '100%',
            height: 330,
            }}
        />
        <View style={{
            padding: 20,
            backgroundColor: 'white',
            height: '100%',
            marginTop: -20,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,

        }}>
            <Text style={{
                fontSize: 18,
                fontFamily: 'poppins-bold',
            }}>
                {tripDetails?.tripPlan?.tripPlan?.location || 'No location available'}
            </Text>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
                marginTop: 5,
            }}>
                <Text
                    style={{
                    fontSize: 14,
                    fontFamily: 'poppins-regular',
                    color: Colors.grey,
                    }}
                >{moment(formatData(tripDetails?.tripData).startDate).format('MMMM Do YYYY')}
                </Text>
                <Text
                    style={{
                    fontSize: 14,
                    fontFamily: 'poppins-regular',
                    color: Colors.grey,
                    }}
                >- {moment(formatData(tripDetails?.tripData).endDate).format('MMMM Do YYYY')}
                </Text>
            </View>
            <Text style={{ 
                fontSize: 16, 
                fontFamily: 'poppins-regular', 
                color: Colors.grey,
            }}>
                🚌 {formatData(tripDetails?.tripData)?.travelerCount?.title} 
            </Text>
            
            {/* FLight Info */}
            <FlightInfo flightData={tripDetails.tripPlan?.tripPlan?.flight}/>
            {/* Hotels List */}
            <HotelList hotelList={tripDetails.tripPlan?.tripPlan?.hotels}/>
            {/* Trip Day Planner Info */}
            <PlannedTrip
                details={tripDetails.tripPlan?.tripPlan?.itinerary?.map((dayPlan) => ({
                day: Number(dayPlan.day), 
                places: dayPlan.places || [],
            }))}
            />
        </View>
    </ScrollView>
  )
}