import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Text } from '..';
import { useTheme, useTranslation } from '../../hooks';
import { PlansScreenNavigationProp } from '../../navigation/types';

export interface ITrainingPlans {
    id: string;
    nombre?: string;
    descripcion?: string;
    nivelPlan?: number;
    duracion?: string;
    imagen?: string;
    suscripcion?: number;
    rutinas: ITrainingRoutine[];
}

export interface ITrainingRoutine {
    id: string;
    dia: number;
    ejercicio: string;
}

const TrainigPlan = ({ props, isInMyPlans }: { props: ITrainingPlans; isInMyPlans: boolean }) => {
    // hooks from app
    const { t } = useTranslation();
    const { colors, sizes } = useTheme();
    const navigation = useNavigation<PlansScreenNavigationProp>();

    return (
        <Block color={colors.card} marginVertical={sizes.sm} radius={sizes.sm} shadow={true}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('PlanDetailScreen', {
                        planId: props.id,
                        isInMyPlans: isInMyPlans,
                    })
                }
            >
                <Block padding={sizes.sm}>
                    <Text h5 bold>
                        {props.nombre}
                    </Text>
                    <Text p>{props.descripcion}</Text>
                    <Block row>
                        <Text p bold>
                            {t('plans.label.level')}
                        </Text>
                        <Text p>{props.nivelPlan}</Text>
                    </Block>
                    <Block row>
                        <Text p bold>
                            {t('plans.label.duration')}
                        </Text>
                        <Text p>{props.duracion}</Text>
                    </Block>
                </Block>
            </TouchableOpacity>
        </Block>
    );
};

export default TrainigPlan;
