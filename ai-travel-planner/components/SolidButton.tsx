import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

interface SolidButtonProps {
    color: string;
    textColor: string;
    text: string;
    onPress: () => void;
}

const SolidButton: React.FC<SolidButtonProps> = ({ color, textColor, text, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        width: '100%',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
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
        fontSize: 16,
        fontFamily: 'poppins-semibold',
    },
});

export default SolidButton;
