import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '../../components';

export default function PlanDetailScreen({ route, navigation }) {
    const { planId, isInMyPlans } = route.params;

    return (
        <View>
            <Text>Detalles del plan</Text>
            <Text>{planId}</Text>
            {isInMyPlans ? null : (
                <Button>
                    <Text primary bold transform="uppercase">
                        Registrarme en este plan
                    </Text>
                </Button>
            )}
        </View>
    );
}
