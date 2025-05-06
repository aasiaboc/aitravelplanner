import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Platform, ImageBackground, RefreshControl } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../configs/FirebaseConfig"; // Import from your existing firebase config
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type UserProfile = {
  displayName: string;
  email: string;
  photoURL: string | null;
  joinedDate: string; 
};

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState(auth.currentUser)


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
              joinedDate: userData.joinedDate || 'April 2025',
            });
          } else {
            // If no user document exists yet, use auth data
            setProfile({
              displayName: auth.currentUser.displayName || 'Traveler',
              email: auth.currentUser.email || '',
              photoURL: auth.currentUser.photoURL,
              joinedDate: 'April 2025',
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
  const handleProfile = () => {
    router.push('/profile/edit-profile');

  };
  const onRefresh = useCallback(() => {
    setRefreshing(true)
    onAuthStateChanged(auth, (user) => {
      setUser(user)
      setRefreshing(false)
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#000'/>
      <ScrollView 
      // style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }    
      >
        <View
          style={{ 
            width: '100%', 
            height: 350,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            overflow: 'hidden',
            shadowColor: '#000',
            backgroundColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            // elevation: 5,
          }} 
          >
          <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
              {user?.photoURL ? (
                <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
              ) : (
                <View style={styles.profileImageFallback}>
                  <Text style={styles.profileImageFallbackText}>{user?.displayName?.charAt(0) || "U"}</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.profileName}>{profile?.displayName}</Text>
            <Text style={styles.profileEmail}>{profile?.email}</Text>
          </View>
        </View>
        

        <View style={styles.menuSection}>
          
          <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
            <View style={styles.menuIconContainer}>
              <AntDesign name="user" size={24} color="#1E5B8D" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        
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
            <Ionicons name="chevron-forward" size={20} color={Colors.red} />
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
  content: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 110,
  },
  
  profileName: {
    fontSize: 22,
    fontFamily: 'poppins-bold',
    color: Colors.white,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: 'poppins-regular',
  },
  
  menuSection: {
    marginTop: 20,
    paddingHorizontal: 30,
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
    color: Colors.red,
    fontFamily: 'poppins-regular',
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileImageFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E8F3",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileImageFallbackText: {
    fontSize: 40,
    fontFamily: "poppins-bold",
    color: "#3A66C5",
  }
  
});

export default ProfileScreen;