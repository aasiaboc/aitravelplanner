import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect } from 'react'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function About() {
  const router = useRouter();
    const navigation = useNavigation(); 
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          ),
        });
      }, []);
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/images/icon.png')} 
            style={styles.logoPlaceholder} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About SuroyAI</Text>
          <Text style={styles.sectionText}>
          SuroyAi is your ultimate AI-powered travel planner!
          With just a few taps, SuroyAi helps you create a complete trip itinerary tailored to your destination, travel dates, budget, and companion type.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="airplane" size={24} color="#1E5B8D" style={styles.featureIcon}  />
            <Text style={styles.featureText}>Get flight recommendations and book instantly through airline websites.</Text>
          </View>
          
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="bed" size={24} color="#1E5B8D" style={styles.featureIcon} />
            <Text style={styles.featureText}>Discover top hotels with real images and check their location easily on the map.</Text>
          </View>
          
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="ferris-wheel" size={24} color="#1E5B8D" style={styles.featureIcon} />
            <Text style={styles.featureText}>Explore must-visit places and attractions based on your preferences.</Text>
          </View>

          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="map-marker" size={24} color="#1E5B8D" style={styles.featureIcon} />
            <Text style={styles.featureText}>Navigate quickly by tapping hotel and place cards to view their coordinates in Google Maps.</Text>
          </View>
        </View>


        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 SuroyAI. All rights reserved.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    marginHorizontal: 15,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'poppins-bold',

  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor:'#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    
    
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'poppins-bold',
  },
  appName: {
    fontSize: 24,
    fontFamily: 'poppins-bold',
    marginBottom: 5,
  },
  version: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 30,
    marginRight: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'poppins-bold',
    marginBottom: 15,
    color: '#1E5B8D',
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontFamily: 'poppins-regular',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'poppins-regular',

  },
  contactEmail: {
    fontSize: 16,
    color: '#1E5B8D',
    marginTop: 10,
    fontFamily: 'poppins-bold',
  },
  footer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
    fontFamily: 'poppins-regular',

  },
});