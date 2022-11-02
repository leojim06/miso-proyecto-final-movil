import React from "react";
import { Text, View } from "react-native";
import styles from "../assets/style/styles";
import { useTheme } from "../hooks";

export default function BasicScreen(){
    const theme = useTheme();
    return(
        <View style={styles(theme).container}>
            <Text>Hola mundo</Text>
        </View>
    )
}