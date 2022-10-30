import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Text } from '..';
import { useTheme, useTranslation } from '../../hooks';
import { PlansScreenNavigationProp } from '../../navigation/types';

export interface ITrainigPlans {
    id: string;
    name?: string;
    description?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    duration?: number;
}

const TrainigPlan = ({ props, isInMyPlans }: { props: ITrainigPlans, isInMyPlans: boolean }) => {
    // hooks from app
    const { t } = useTranslation();
    const { colors, sizes } = useTheme();
    const navigation = useNavigation<PlansScreenNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('PlanDetailScreen', {
                    planId: props.id,
                    isInMyPlans: isInMyPlans,
                })
            }
        >
            <Block
                color={colors.card}
                marginVertical={sizes.sm}
                padding={sizes.sm}
                radius={sizes.sm}
                shadow={true}
            >
                <Text h5 bold>
                    {props.name}
                </Text>
                <Text p>{props.description}</Text>
                <Block row>
                    <Text p bold>
                        {t('plans.trainigPlan.label.level')}
                    </Text>
                    <Text p>{props.level}</Text>
                </Block>
                <Block row>
                    <Text p bold>
                        {t('plans.trainigPlan.label.duration')}
                    </Text>
                    <Text p>{props.duration}</Text>
                </Block>
            </Block>
        </TouchableOpacity>
    );
};

export default TrainigPlan;
