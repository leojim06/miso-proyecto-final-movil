import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useData } from '../hooks';

export default function ProfileScreen() {
    const {
        handleUser,
        handleTrainingSession,
        handleSuscriptionCatalog,
        handleTrainingLevelCatalog,
    } = useData();
    const logout = () => {
        handleUser(undefined);
    };

    const dropTrainingSession = () => {
        handleTrainingSession(undefined);
    };

    const resetCatalogs = () => {
        handleSuscriptionCatalog([]);
        handleTrainingLevelCatalog([]);
    };

    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
            <Button title="Logout" onPress={logout} />
            <Button title="Borrar entrenamiento" onPress={dropTrainingSession} />
            <Button title="Reset catálogos" onPress={resetCatalogs} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
