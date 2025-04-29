import { View, Text, FlatList, TouchableOpacity, Platform, ToastAndroid, ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import { SelectTravelerOptions } from "@/constants/Options";
import OptionCard from "@/components/CreateTrip/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";
import { Colors } from "@/constants/Colors";
import SolidButton from "@/components/SolidButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SelectTraveler() {
  const navigation = useNavigation();
  const [selectedTraveler, setSelectedTraveler] = useState<{ id: string } | undefined>();
  const tripContext = useContext(CreateTripContext);

  if (!tripContext) return null; // Ensure context is available

  const { tripData, setTripData } = tripContext;

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
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, 
      travelerCount: selectedTraveler });
  }, [selectedTraveler]);

  useEffect(() => {
    console.log("tripData", tripData);
  }, [tripData]);

  const onTravelerSelectionContinue = () => {
    if (!selectedTraveler) {
      alert("Please select a traveler");
      ToastAndroid.show(
        "Please select a traveler",
        ToastAndroid.SHORT,
      );
      return;
    }
    router.push("../create-trip/select-dates");
  };
  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: Platform.OS === "android" ? 60 : 100,
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontFamily: "poppins-bold",
          marginTop: 10,
        }}
      >
        Who is Traveling?
      </Text>
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "poppins-regular",
            marginBottom: 20,
          }}
        >
          Choose your traveler.
        </Text>
        <FlatList
          data={SelectTravelerOptions}
          keyExtractor={(item) => item.id.toString()} // Ensure `id` is converted to a string
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectedTraveler({ ...item, id: item.id.toString() })}>
              <OptionCard option={{ ...item, id: item.id.toString() }} selectedOption={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>
      <SolidButton 
        color={Colors.primary} 
        textColor={Colors.white} 
        text={"Continue"} 
        onPress={onTravelerSelectionContinue}
        // onPress={() => router.push("../create-trip/select-dates")}
      />
    </ScrollView>
  );
}
