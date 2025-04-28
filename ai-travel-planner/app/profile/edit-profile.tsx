import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { router, useNavigation, useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { auth } from '../../configs/FirebaseConfig';
export default function EditProfile() {
    const user = auth.currentUser;
    const navigation = useNavigation(); 
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: "Edit Profile",
          headerTitleStyle: {
            fontFamily: "poppins-medium",
            fontSize: 16,
            
          },
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
    <View style={styles.container}>
        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <TouchableOpacity 
        style={styles.settingItem} 
        onPress={() => router.push("/(profile)/change-name")}
        >
        <View style={styles.settingContent}>
        <Text style={styles.settingLabel}>Change Name</Text>
        <Text style={styles.settingValue}>{user?.displayName || "Not set"}</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#CCCCCC" />
        </TouchableOpacity>


        <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => router.push("/(profile)/change-password")}
        >
            <View style={styles.settingContent}>
            <Text style={styles.settingLabel}>Change Password</Text>
            <Text style={styles.settingValue}>••••••••</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#CCCCCC" />
        </TouchableOpacity>

        </View>

        <View style={styles.section}>

        <TouchableOpacity 
            style={[styles.settingItem, styles.dangerItem]}
            onPress={() => router.push("/(profile)/delete-account")}>
            <View style={styles.settingContent}>
            <Text style={[styles.settingLabel, styles.dangerText]}>Delete Account</Text>
            <Text style={styles.settingDescription}>Permanently delete your account and data</Text>
            </View>
            <Feather name="trash-2" size={20} color="#E53935" />
        </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20, 
      marginTop: Platform.OS === "android" ? 40 : 100,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 20,
      paddingBottom: 10,
    },
    backButton: {
      padding: 5,
    },
    headerTitle: {
      fontFamily: "poppins-medium",
      fontSize: 18,
      color: "#1C1C1C",
    },
    section: {
      backgroundColor: "#FFFFFF",
      marginTop: 20,
      borderRadius: 15,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontFamily: "poppins-medium",
      fontSize: 16,
      color: "#1C1C1C",
      marginBottom: 15,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F0F0",
    },
    settingContent: {
      flex: 1,
    },
    settingLabel: {
      fontFamily: "poppins-medium",
      fontSize: 14,
      color: "#1C1C1C",
    },
    settingValue: {
      fontFamily: "poppins-regular",
      fontSize: 12,
      color: "#666666",
      marginTop: 2,
    },
    settingDescription: {
      fontFamily: "poppins-regular",
      fontSize: 12,
      color: "#666666",
      marginTop: 2,
    },
    dangerItem: {
      borderBottomWidth: 0,
    },
    dangerText: {
      color: "#E53935",
    },
  })