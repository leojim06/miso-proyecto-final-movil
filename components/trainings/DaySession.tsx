import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme, useTranslation } from '../../hooks';
import { IDayTrainigSession } from '../../screens/TrainingSession/TrainingSesionScreen';
import Block from '../Block';
import Text from '../Text';

const DaySession = (props: IDayTrainigSession) => {
    // hooks from app
    const { sizes, colors } = useTheme();
    const { t } = useTranslation();

    return (
        <Block
            card
            marginBottom={sizes.s}
            color={props.complete ? colors.success : props.active ? colors.tertiary : colors.light}
        >
            <TouchableOpacity disabled={!props.active && !props.complete}>
                <Text semibold>{t('plans.detail.label.day', { day: props.day })}</Text>
                <Text p paddingLeft={sizes.sm}>
                    {props.exercise}
                </Text>
            </TouchableOpacity>
        </Block>
    );
};
export default DaySession;
