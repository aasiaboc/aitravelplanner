import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { router, useNavigation } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { CreateTripContext } from '@/context/CreateTripContext';
import { Colors } from '@/constants/Colors';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import SolidButton from '@/components/SolidButton';

export default function ReviewTrip() {
    const navigation = useNavigation();
        useEffect(() => {
            navigation.setOptions({
                headerShown: true,
                headerTransparent: true,
                headerTitle: "",
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                      <Ionicons name="chevron-back" size={24} color="black" />
                      
                    </TouchableOpacity>
                  ),
            }); 
        }, [navigation]);
    
    const tripContext = useContext(CreateTripContext);
    if (!tripContext) return null; // Ensure context is available
    const { tripData, setTripData } = tripContext;

    return (
    <View style={{
            padding: 25,
        paddingTop: Platform.OS === "android" ? 60 : 100,
            height: "100%",
            backgroundColor: "#fff",
        }}>
            <Text style={{
                fontSize: 35,
                fontFamily: "poppins-bold",
                marginTop: 10,
            }}>
                Review your trip
            </Text>
            <View style={{
                marginTop: 10,
            }}>
                <Text style={{
                    fontSize: 16,
                    fontFamily: "poppins-regular",
                    marginBottom: 20,
                }}>
                    Review your trip details and make any necessary changes.
                </Text>
                {/* Destination Info */}
                <View style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    marginEnd: 20,
                    gap:20,
                }}>
                    <Text style={{fontSize:30}}>📍</Text>
                    <View style={{width: 300}}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-regular",
                            color: Colors.grey,
                        }}>
                            Destination
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-medium",
                            marginBottom: 20,
                        }}>
                            {tripData?.locationInfo?.name}
                        </Text>
                    </View>
                    
                </View>
                
                {/* Date Info */}
                <View style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    marginEnd: 20,
                    gap:20,
                }}>
                    <Text style={{fontSize:30}}>🗓</Text>
                    <View style={{width: 300}}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-regular",
                            color: Colors.grey,
                        }}>
                            Travel Date
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-medium",
                            marginBottom: 20,
                        }}>
                            {moment(tripData?.startDate).format("MMMM D, YYYY")+" To " +
                            moment(tripData?.endDate).format("MMMM D, YYYY") + "\n" } 
                            ({tripData?.totalDays} days)
                        </Text>
                    </View>
                    
                </View>
                {/* Traveler Info */}
                <View style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    marginEnd: 20,
                    gap:20,
                }}>
                    <Text style={{fontSize:30}}>🚎</Text>
                    <View style={{width: 300}}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-regular",
                            color: Colors.grey,
                        }}>
                            Travelers
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-medium",
                            marginBottom: 20,
                        }}>
                            {tripData?.travelerCount?.title}
                        </Text>
                    </View>
                    
                </View>
                {/* Budget Info */}
                <View style={{
                    marginTop: 20,
                    display: "flex",
                    flexDirection: "row",
                    marginEnd: 20,
                    gap:20,
                }}>
                    <Text style={{fontSize:30}}>💰</Text>
                    <View style={{width: 300}}>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-regular",
                            color: Colors.grey,
                        }}>
                            Budget
                        </Text>
                        <Text style={{
                            fontSize: 16,
                            fontFamily: "poppins-medium",
                            marginBottom: 20,
                        }}>
                            {tripData?.budget}
                        </Text>
                    </View>
                    
                </View>
            </View>
            <SolidButton 
                color={Colors.primary} 
                textColor={Colors.white} 
                text={"Build My Trip"} 
                onPress={() => router.push("../(tabs)/mytrip")}
            />
    </View>
  )
}