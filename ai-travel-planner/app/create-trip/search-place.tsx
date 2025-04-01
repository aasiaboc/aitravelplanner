import { View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "@/context/CreateTripContext";

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
    });
  }, []);

  useEffect(() => {
    console.log("tripData", tripData);
  }, [tripData]);

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 60,
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
