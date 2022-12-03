import React from 'react';
import { useTheme, useTranslation } from '../../hooks';
// import { IDayRoutine } from '../../screens/Plans/PlanDetailScreen';
import Block from '../Block';
import Text from '../Text';
import { ITrainingRoutine } from './TrainigPlan';

const DayRoutine = (props: ITrainingRoutine) => {
    // hooks from app
    const { sizes } = useTheme();
    const { t } = useTranslation();

    return (
        <Block marginBottom={sizes.margin}>
            <Text semibold>{t('plans.detail.label.day', { day: props.dia })}</Text>
            <Text p paddingLeft={sizes.sm}>
                {props.ejercicio}
            </Text>
        </Block>
    );
};

export default DayRoutine;
