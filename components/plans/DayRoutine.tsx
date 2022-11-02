import React from 'react';
import { useTheme, useTranslation } from '../../hooks';
import { IDayRoutine } from '../../screens/Plans/PlanDetailScreen';
import Block from '../Block';
import Text from '../Text';

const DayRoutine = (props: IDayRoutine) => {
    // hooks from app
    const { sizes } = useTheme();
    const { t } = useTranslation();

    return (
        <Block marginBottom={sizes.margin}>
            <Text semibold>{t('plans.detail.label.day', { day: props.day })}</Text>
            <Text p paddingLeft={sizes.sm}>
                {props.exercise}
            </Text>
        </Block>
    );
};

export default DayRoutine;
