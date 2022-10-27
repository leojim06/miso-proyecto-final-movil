import React from 'react';
import { Text, View } from "react-native";
import { useTranslation } from '../hooks';


export default function EventsScreen() {
    const {t} = useTranslation();
    return (
        <View>
            <Text>{t('app.screen.events')}</Text>
        </View>
    )
}