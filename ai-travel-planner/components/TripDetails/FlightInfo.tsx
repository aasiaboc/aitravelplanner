import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { Linking } from 'react-native';


export default function FlightInfo({flightData}: any) {
    const bookFlight = () => {
        let url = flightData.flightDetails[0].bookingUrl;

    // Ensure the URL has the correct protocol (http:// or https://)
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url; // Default to https if no protocol is provided
    }

    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    };
  return (
    <View style={{
        marginTop: 20,
        borderWidth:1,
        borderColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 15,
        
    }}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 20,
                fontFamily: 'poppins-bold',
            }}>
                🛫 Flights
            </Text>
            <TouchableOpacity 
                style={{
                    backgroundColor: Colors.primary,
                    padding: 5,
                    width: 100,
                    borderRadius: 10
                }}
                onPress={bookFlight }
                  
            >
                <Text style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    fontFamily: 'poppins-regular',
                }}>
                    Book Here
                </Text>
            </TouchableOpacity>
        </View>
        
        <Text style={{
            fontSize: 16,
            fontFamily: 'poppins-regular',
            marginTop: 5,
        }}>
            Airline: {flightData?.flightDetails[0].flightName}
        </Text>
        <Text style={{
            fontSize: 16,
            fontFamily: 'poppins-regular',
            marginTop: 5,
        }}>
            Price: {flightData?.flightDetails[0].flightPrice}
        </Text>
        
    </View>
  )
}