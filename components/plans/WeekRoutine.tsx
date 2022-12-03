import React from 'react';
import { FlatList, View } from 'react-native';
import { useTheme, useTranslation } from '../../hooks';
import { IWeekRoutine } from '../../screens/Plans/PlanDetailScreen';
import Text from '../Text';
import DayRoutine from './DayRoutine';

const WeekRoutine = (props: IWeekRoutine) => {
    // hooks from app
    const { sizes } = useTheme();
    const { t } = useTranslation();

    return (
        <View>
            <Text h5>{t('plans.detail.label.week', { week: props.week })}</Text>
            {props.days.map((item, index) => {
                return <DayRoutine key={index} {...item} />;
            })}
        </View>
    );
};

export default WeekRoutine;
