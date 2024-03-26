import React from 'react';
import { StyleSheet }  from "react-native";
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors/colors';




const BtnIcon = ({antIconName, size, color, style, onPress}) => {
    return (
            <AntDesign 
            name={antIconName} 
            size={size || 24} 
            color={color || colors.bleuciel }
            style={[styles.icon, {...style}]}
            onPress={onPress}
            />
            
            
    );
};

const styles = StyleSheet.create({
    icon: {
        backgroundColor: colors.vertfonce,
        padding: 15,
        borderRadius: 50,
    
    }
})

export default BtnIcon;