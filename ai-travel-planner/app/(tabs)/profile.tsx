import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig"; // Import from your existing firebase config
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

type UserProfile = {
  displayName: string;
  email: string;
  photoURL: string | null;
  bio: string | null;
  joinedDate: string;
  tripsCount: number;
};

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (auth.currentUser) {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setProfile({
              displayName: userData.displayName || auth.currentUser.displayName || 'Traveler',
              email: auth.currentUser.email || '',
              photoURL: userData.photoURL || auth.currentUser.photoURL,
              bio: userData.bio || 'No bio available',
              joinedDate: userData.joinedDate || 'April 2025',
              tripsCount: userData.tripsCount || 2,
            });
          } else {
            // If no user document exists yet, use auth data
            setProfile({
              displayName: auth.currentUser.displayName || 'Traveler',
              email: auth.currentUser.email || '',
              photoURL: auth.currentUser.photoURL,
              bio: 'No bio available',
              joinedDate: 'April 2025',
              tripsCount: 2,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [auth.currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.replace("/(auth)/sign-in")
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleAbout = () => {
    router.push('/profile/about');

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>

      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image 
            source={profile?.photoURL ? { uri: profile.photoURL } : require('../../assets/images/defaultprofile.png')} 
            style={styles.profileImage} 
          />
          <Text style={styles.profileName}>{profile?.displayName}</Text>
          <Text style={styles.profileEmail}>{profile?.email}</Text>
        </View>

        <View style={styles.menuSection}>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleAbout}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="information-circle-outline" size={22} color="#1E5B8D" />
            </View>
            <Text style={styles.menuText}>About</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="log-out-outline" size={22} color="#E53935" />
            </View>
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    paddingTop: Platform.OS === 'android' ? 40 : 100,

  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'poppins-bold',
  },
  settingsButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'poppins-bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: Colors.grey,
    marginBottom: 20,
    fontFamily: 'poppins-regular',
  },
  
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'poppins-regular',

  },
  logoutText: {
    color: '#E53935',
    fontFamily: 'poppins-regular',
  },
  
});

export default ProfileScreen;