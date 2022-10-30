import React from 'react';
import { useTheme, useTranslation } from '../../hooks';
import { IRoutine } from '../../screens/Plans/PlanDetailScreen';
import Block from '../Block';
import Text from '../Text';

const Routine = (props: IRoutine) => {
    // hooks from app
    const { sizes } = useTheme();
    const { t } = useTranslation();

    return (
        <Block marginBottom={sizes.margin}>
            <Text bold>{t('plans.detail.label.day', {day: props.day})}</Text>
            <Text p paddingLeft={sizes.sm}>
                {props.exercise}
            </Text>
        </Block>
    );
};

export default Routine;
