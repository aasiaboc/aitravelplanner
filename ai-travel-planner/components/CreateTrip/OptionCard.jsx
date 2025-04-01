import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';


export default function OptionCard({ option, selectedTraveler }) {
  return (
    <View style={[{
      padding: 25,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.lightGrey,
      borderRadius: 20,
      marginBottom: 10,
    },
      selectedTraveler?.id === option?.id&&{
      borderWidth:1, 
      borderColor: Colors.primary
    }]}
      >
      <View>
        <Text style={{
          fontSize: 20,
          fontFamily: 'poppins-semibold',
          color: '#000',
        }}>{option?.title}</Text>
        <Text style={{
          fontSize: 14,
          fontFamily: 'poppins-regular',
          color: "#000",
        }}>
          {option?.desc}
        </Text>
        
      </View>
      <Text style={{
          fontSize: 30,
      }}>{option.icon}</Text>
    </View>
  )
}