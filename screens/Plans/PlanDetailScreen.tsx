import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Text, Button } from '../../components';
import { PlanDetailScreenRouteProp } from '../../navigation/types';

export default function PlanDetailScreen() {
    // hooks from app
    const route = useRoute<PlanDetailScreenRouteProp>();
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
