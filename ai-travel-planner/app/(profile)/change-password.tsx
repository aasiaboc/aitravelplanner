import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Platform } from "react-native"
import { useState, useEffect } from "react"
import { useNavigation } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { auth } from '../../configs/FirebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";


export default function ChangePassword() {
  const user = auth.currentUser
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Change Password",
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

  const handleSave = async () => {
    if (!currentPassword.trim()) {
      Alert.alert("Error", "Current password is required");
      return;
    }
  
    if (!newPassword.trim()) {
      Alert.alert("Error", "New password is required");
      return;
    }
  
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords don't match");
      return;
    }
  
    try {
      setIsLoading(true);
  
      if (!user?.email) {
        throw new Error("User email not found.");
      }
  
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
      // This is the correct way to reauthenticate
      await reauthenticateWithCredential(user, credential);
  
      // Then update the password
      await updatePassword(user, newPassword);
  
      Alert.alert("Success", "Password updated successfully");
      navigation.goBack();
    } catch (error: any) {
      console.error("Error updating password:", error);
  
      if (error.code === "auth/wrong-password") {
        Alert.alert("Error", "The current password is incorrect");
      } else {
        Alert.alert("Error", error.message || "Failed to update password. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <View style={styles.container}>


      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter your current password"
            secureTextEntry
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter your new password"
            secureTextEntry
          />
          <Text style={styles.helperText}>Password must be at least 6 characters long</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your new password"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.disabledButton]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>{isLoading ? "Updating..." : "Save Changes"}</Text>
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
  saveButton: {
    backgroundColor: "#4F80E1",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#A5BEE9",
  },
  saveButtonText: {
    fontFamily: "poppins-medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
})