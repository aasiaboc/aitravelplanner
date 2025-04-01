import { View, Text, Touchable, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import CalendarPicker from "react-native-calendar-picker";
import { Colors } from "@/constants/Colors";
import moment from 'moment';
import { CreateTripContext } from "@/context/CreateTripContext";
import SolidButton from "@/components/SolidButton";

export default function SelectDates() {
    const navigation = useNavigation();
    const [startDate, setStartDate] = useState<moment.Moment | undefined>();
    const [endDate, setEndDate] = useState<moment.Moment | undefined>();
    const tripContext = useContext(CreateTripContext);
    if (!tripContext) return null; // Ensure context is available
    const { tripData, setTripData } = tripContext;

    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: "",
        }); 
    }, [navigation]);

    const onDateChange = (date: any, type: any) => {
        console.log(date, type);
        if (type=='START_DATE') {
            setStartDate(moment(date));
        }
        else if (type=='END_DATE') {
            setEndDate(moment(date));
        }

    };

    const onDateSelectionContinue = () => {
        if (!startDate || !endDate) {
            ToastAndroid.show(
                "Please select a start and end date",
                ToastAndroid.LONG
            );
            return;
        }
        const totalDays = (endDate?.diff(startDate, 'days')+1);
        console.log("Total Days: ",totalDays );
        setTripData({
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalDays: totalDays,
        });

        router.push("../create-trip/select-budget");
    };

    return (
        <View
            style={{
                padding: 25,
                paddingTop: 40,
                height: "100%",
                backgroundColor: "#fff",
            }}
        >
            <Text
                style={{
                    fontSize: 35,
                    fontFamily: "poppins-bold",
                    marginTop: 10,
                }}
            >
                Travel Dates
            </Text>
            <View style={{ marginTop: 30 }}>
                <CalendarPicker 
                    onDateChange={onDateChange} 
                    allowRangeSelection={true}
                    minDate={new Date()} 
                    selectedRangeStyle={{
                        backgroundColor: Colors.primary,
                    }}
                    selectedDayTextStyle={{
                        color: "#fff",
                    }}

                />
            </View>
            <SolidButton 
                color={Colors.primary} 
                textColor={Colors.white} 
                text={"Continue"} 
                onPress={onDateSelectionContinue}
            />
            
        </View>
    );
}