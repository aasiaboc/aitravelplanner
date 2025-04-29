import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../configs/FirebaseConfig';
import { Colors } from '@/constants/Colors';


export default function DeleteAccount() {
  const user = auth.currentUser
  const [password, setPassword] = useState("")
  const [confirmText, setConfirmText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  const router = useRouter()
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
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

  const handleDeleteAccount = async () => {
  }
  const confirmDeleteAccount = async () => {
  }
  return (
    <View style={styles.container}>

      <View style={styles.formContainer}>
        <View style={styles.warningContainer}>
          <Ionicons name="warning" size={40} color={Colors.red} style={styles.warningIcon} />
          <Text style={styles.warningTitle}>Delete Your Account</Text>
          <Text style={styles.warningText}>
            This action is permanent and cannot be undone. All your data will be permanently deleted.
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Your Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
          <Text style={styles.helperText}>
            For security reasons, please enter your password to verify your identity
          </Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Deletion</Text>
          <TextInput
            style={styles.input}
            value={confirmText}
            onChangeText={setConfirmText}
            placeholder='Type "DELETE" to confirm'
            autoCapitalize="characters"
          />
          <Text style={styles.helperText}>Type DELETE in all caps to confirm</Text>
        </View>

        <TouchableOpacity
          style={[styles.deleteButton, isLoading && styles.disabledButton]}
          onPress={handleDeleteAccount}
          disabled={isLoading}
        >
          <Text style={styles.deleteButtonText}>{isLoading ? "Processing..." : "Delete My Account"}</Text>
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
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "poppins-semibold",
    alignSelf: "center",
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  warningContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  warningIcon: {
    marginBottom: 10,
  },
  warningTitle: {
    fontFamily: "poppins-bold",
    fontSize: 18,
    color: Colors.red,
    marginBottom: 10,
  },
  warningText: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "poppins-medium",
    fontSize: 14,
    color: "#1C1C1C",
    marginBottom: 8,
  },
  input: {
    fontFamily: "poppins-regular",
    fontSize: 14,
    color: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  helperText: {
    fontFamily: "poppins-regular",
    fontSize: 12,
    color: "#666666",
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor:Colors.red,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: Colors.red,
  },
  deleteButtonText: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
  cancelButton: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    color: "#1C1C1C",
  },
})