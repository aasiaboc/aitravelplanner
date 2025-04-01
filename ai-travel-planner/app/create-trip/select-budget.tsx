import { View, Text, FlatList, Touchable, TouchableOpacity, ToastAndroid, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import SolidButton from '@/components/SolidButton';
import { Colors } from '@/constants/Colors';
import { SelectBudgetOptions } from '@/constants/Options';
import OptionCard from '@/components/CreateTrip/OptionCard';
import { CreateTripContext } from '@/context/CreateTripContext';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SelectBudget() {
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

    const [selectedOption, setSelectedOption] = useState<{ id: string; [key: string]: any } | undefined>(undefined);
    
    const tripContext = useContext(CreateTripContext);
    if (!tripContext) return null; // Ensure context is available
    const { tripData, setTripData } = tripContext;

    useEffect(() => {
        selectedOption && setTripData({ ...tripData, budget: selectedOption?.title });
    }, [selectedOption]);
    
    const router = useRouter();
    const onClickContinue=()=> {
        if (!selectedOption) {
            ToastAndroid.show(
                "Please select a budget option",
                ToastAndroid.SHORT,
            );
            return;
        }
        router.push("../create-trip/review-trip");
    }

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
            Budget
        </Text>
        <View style={{
            marginTop: 20,
        }}>
            <Text style={{ 
                fontSize: 16, 
                fontFamily: "poppins-regular",
                marginBottom: 20,
            }}>
                Choose spending habits for your trip.
            </Text>
            <FlatList
                data={SelectBudgetOptions}
                keyExtractor={(item, index) => item.id.toString()} // Ensure `id` is converted to a string
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                    onPress={() => setSelectedOption({ ...item, id: item.id.toString() })}>
                        <OptionCard option={{ ...item, id: item.id.toString() }}
                        selectedOption={selectedOption}/>
                    </TouchableOpacity>
                )}
            />
        </View>
        

        <SolidButton 
            color={Colors.primary} 
            textColor={Colors.white} 
            text={"Continue"} 
            onPress={() => onClickContinue()}
        />
    </View>
  )
}