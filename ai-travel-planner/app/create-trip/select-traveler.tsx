import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { SelectTravelerOptions } from "@/constants/Options";
import OptionCard from "@/components/CreateTrip/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";
import { Colors } from "@/constants/Colors";

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
    });
  }, []);

  useEffect(() => {
    setTripData({ ...tripData, 
      travelerCount: selectedTraveler });
  }, [selectedTraveler]);

  useEffect(() => {
    console.log("tripData", tripData);
  }, [tripData]);

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
              <OptionCard option={{ ...item, id: item.id.toString() }} selectedTraveler={selectedTraveler} />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          padding: 15,
          borderRadius: 20,
          marginTop: 20,
        }}
        // onPress={() => {
        //   navigation.navigate("SelectDestination");
        // }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "poppins-semibold",
            color: Colors.white,
            textAlign: "center",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
