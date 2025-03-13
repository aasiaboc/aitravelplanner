import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import SolidButton from './SolidButton'
import { StyleSheet, Platform } from 'react-native';
import {useRouter} from 'expo-router'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Login() {
  const router=useRouter();

  return (
    <ImageBackground source={require('./../assets/images/login.png')}
      style={{
          flex: 1,
          width: '100%',
          height: '100%'
      }}
    >
      <View style={{
        flex:1,
        width:'100%',
        alignItems:'center',
        marginTop: 510,
      }}>
        <Text style={{
            fontSize: 50,
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'center',
            color:'white',
            paddingVertical: 10,
            width: '100%',
            ...styles.elevationShadow,
        }}>
          SuroyAi 
        </Text>
        <Text style={{
            fontSize: 12,
            fontFamily: 'Poppins-Light',
            textAlign: 'center',
            color:'white',
            paddingVertical: 10,
            paddingHorizontal: 30,
            lineHeight: 18,
            width: '100%',

        }}>
          Effortlessly plan your trips with AI-powered itineraries, must-visit spots, and optimized routes—all tailored to your preferences. Get real-time updates and seamless travel organization in one app.
        </Text>
        <Text style={{
            fontSize: 14,
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
            color:'white',
            paddingVertical: 10,
            paddingHorizontal: 65,
            lineHeight: 18,
            width: '100%',
        }}>
          Plan Smarter. Travel Better.
        </Text>
        <SolidButton 
          color={Colors.white} 
          textcolor={Colors.black} 
          text='Get Started' 
          styles={styles.elevationShadow}
          onPress={()=>router.push('/(auth)/sign-in')}/>
      </View>
    
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  elevationShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

