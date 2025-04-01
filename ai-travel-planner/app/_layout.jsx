import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { CreateTripContext } from "../context/CreateTripContext";
import { useState } from "react";


export default function RootLayout() {

  useFonts({
    'poppins-regular':require('../assets/fonts/Poppins-Regular.ttf'),
    'poppins-light':require('../assets/fonts/Poppins-Light.ttf'),
    'poppins-medium':require('../assets/fonts/Poppins-Medium.ttf'),
    'poppins-semibold':require('../assets/fonts/Poppins-SemiBold.ttf'),
    'poppins-bold':require('../assets/fonts/Poppins-Bold.ttf'),

  })
  const [tripData, setTripData] = useState([]);
  return (
    <CreateTripContext.Provider value={{tripData,setTripData}}>
      <Stack screenOptions={{
        headerShown: false,
      }}>
        
        <Stack.Screen name="(tabs)"/>
      </Stack>
    </CreateTripContext.Provider>
  );
}

