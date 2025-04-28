import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';

export default function About() {
  const router = useRouter();
    const navigation = useNavigation(); 
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true, 
            headerTitle: '',
            
                   
        })
        
    }, [])
  return (
    <View style={styles.container}>

      <ScrollView style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>AI Travel</Text>
          </View>
          <Text style={styles.appName}>AI Travel Planner</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About AI Travel Planner</Text>
          <Text style={styles.sectionText}>
            AI Travel Planner is your intelligent travel companion, helping you plan, organize, and remember your journeys around the world. 
            Create detailed itineraries with AI assistance, save your favorite places, and share your adventures with friends and family.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureItem}>
            <Ionicons name="map" size={20} color="#1E5B8D" style={styles.featureIcon} />
            <Text style={styles.featureText}>AI-powered trip planning</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="location" size={20} color="#1E5B8D" style={styles.featureIcon} />
            <Text style={styles.featureText}>Personalized recommendations</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="calendar" size={20} color="#1E5B8D" style={styles.featureIcon} />
            <Text style={styles.featureText}>Smart itinerary management</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="share-social" size={20} color="#1E5B8D" style={styles.featureIcon} />
            <Text style={styles.featureText}>Share your adventures</Text>
          </View>
        </View>


        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 AI Travel Planner. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#1E5B8D',
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