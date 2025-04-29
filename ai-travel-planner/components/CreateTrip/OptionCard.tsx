import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

// Define the type for the props
interface OptionCardProps {
  option: {
    id: string;
    title: string;
    desc: string;
    icon: string;
  };
  selectedOption?: {
    id: string;
  };
}

export default function OptionCard({ option, selectedOption }: OptionCardProps) {
  return (
    <View
      style={[
        styles.container,
        selectedOption?.id === option?.id && {
          borderWidth: 1,
          borderColor: Colors.primary,
        },
      ]}
    >
      <View>
        <Text style={styles.title}>{option?.title}</Text>
        <Text style={styles.desc}>{option?.desc}</Text>
      </View>
      <Text style={styles.icon}>{option.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: "poppins-semibold",
    color: "#000",
  },
  desc: {
    fontSize: 14,
    fontFamily: "poppins-regular",
    color: "#000",
  },
  icon: {
    fontSize: 30,
  },
});
