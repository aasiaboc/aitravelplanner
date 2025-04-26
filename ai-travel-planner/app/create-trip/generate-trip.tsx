import { View, Text, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { CreateTripContext } from '@/context/CreateTripContext';
import { AI_PROMPT } from '@/constants/Options';
import { ai } from '@/configs/AiModal'; // You import your Gemini instance here
import { useRouter } from 'expo-router';
import { doc, setDoc } from 'firebase/firestore';
import { auth,db} from '@/configs/FirebaseConfig'; // Import your Firebase config
export default function GenerateTrip() {
  const tripContext = useContext(CreateTripContext);
  if (!tripContext) return null;
  const { tripData, setTripData } = tripContext;

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData) {
      GenerateAiTrip();
    }
  }, [tripData]);

  const GenerateAiTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', tripData?.locationInfo?.name)
      .replace('{totalDays}', tripData?.totalDays)
      .replace('{totalNight}', (tripData?.totalDays - 1).toString())
      .replace('{titleTraveler}', tripData?.travelerCount?.title)
      .replace('{traveler}', tripData?.travelerCount?.title)
      .replace('{budget}', tripData?.budget);

    console.log('FINAL_PROMPT', FINAL_PROMPT);


    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: FINAL_PROMPT }],
          },
        ],
      });

      const text = await response.text;
      console.log('Raw Gemini response:', text);

      // Extract JSON block from Gemini's response using regex
      const match = text?.match(/\{[\s\S]*\}/);
      if (!match) {
      throw new Error('No valid JSON found in the response');
      }

      const tripResponse = JSON.parse(match[0]);      
      const docId = Date.now().toString();

      await setDoc(doc(db, 'UserTrips', docId), {
        userEmail: user?.email,
        tripPlan: tripResponse, //ai result
        tripData: JSON.stringify(tripData), //user input
        docId: docId,
      });


      setLoading(false);
      router.push('../(tabs)/mytrip');
    } catch (error) {
      setLoading(false);
      console.error('Failed to generate trip:', error);
    }
  }; 

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        height: '100%',
        backgroundColor: '#fff',
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: 'poppins-bold',
          textAlign: 'center',
        }}
      >
        Please wait...
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: 'poppins-semibold',
          textAlign: 'center',
        }}
      >
        We are working to generate your dream trip.
      </Text>

      <Image
        source={require('../../assets/images/plane.gif')}
        style={{
          width: '100%',
          height: 200,
          objectFit: 'contain',
        }}
      />

      <Text
        style={{
          fontSize: 16,
          fontFamily: 'poppins-regular',
          color: Colors.grey,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        Do not Go Back
      </Text>
    </View>
  );
}
