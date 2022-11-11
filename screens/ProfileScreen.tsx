import React from 'react';
import { Text, View, StyleSheet, Button, ScrollViewBase, ScrollView } from 'react-native';
import { useData } from '../hooks';

export default function ProfileScreen() {
    const {
        handleUser,
        handleTrainingSession,
        handleSuscriptionCatalog,
        handleTrainingLevelCatalog,
        trainingSession,
    } = useData();

    const logout = () => {
        handleUser(undefined);
    };

    const dropTrainingSession = () => {
        handleTrainingSession(undefined);
    };

    const resetCatalogs = () => {
        handleSuscriptionCatalog(undefined);
        handleTrainingLevelCatalog(undefined);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>ProfileScreen</Text>
                <Button title="Logout" onPress={logout} />
                <Button title="Borrar entrenamiento" onPress={dropTrainingSession} />
                <Button title="Reset catálogos" onPress={resetCatalogs} />
                <Text>{JSON.stringify(trainingSession, null, 2)}</Text>
            </ScrollView>
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
