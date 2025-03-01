import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

const SolidButton = ({ color, textColor,text, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        width: 330,
        borderRadius: 30,
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
    buttonText: {
        textAlign: 'center',
        width:'100%',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold'
    },
});

export default SolidButton;