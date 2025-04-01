import { Button, Platform, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "@/context/CreateTripContext";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const tripContext = useContext(CreateTripContext);

  if (!tripContext) return null;

  const { tripData, setTripData } = tripContext;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
      headerTitleAlign: "center", // Ensures the title is centered on Android
      headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      ),
    });
  }, []);

  useEffect(() => {
    console.log("tripData", tripData);
  }, [tripData]);

  return (
    <View
      style={{
      padding: 25,
      paddingTop: Platform.OS === "android" ? 60 : 115,
      height: "100%",
      }}
    >
      <GooglePlacesAutocomplete
      placeholder="Search Place"
      fetchDetails={true}
      onPress={(data, details = null) => {
        setTripData({
        locationInfo: {
          name: data.description,
          coordinations: details?.geometry.location,
          url: details?.url,
        },
        });
        router.push("../create-trip/select-traveler");
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY || "",
        language: "en",
      }}
      styles={{
        textInput: {
        borderRadius: 20,
        padding: 15,
        fontFamily: "poppins-regular",
        color: Colors.black,
        shadowColor: Colors.black,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
        },
      }}
      />
    </View>
  );
}
