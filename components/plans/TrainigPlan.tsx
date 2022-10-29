import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Block, Text } from '..';
import { useTheme, useTranslation } from '../../hooks';

export interface ITrainigPlans {
    id: number,
    name?: string;
    description?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    duration?: number;
    onPress?: () => void;
}

const TrainigPlan = (props: ITrainigPlans) => {
    const { t } = useTranslation();
    const { colors, sizes } = useTheme();

    return (
        <TouchableOpacity onPress={props.onPress}>
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
