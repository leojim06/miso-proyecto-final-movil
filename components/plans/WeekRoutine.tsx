import React from 'react';
import { FlatList } from 'react-native';
import { useTheme, useTranslation } from '../../hooks';
import { IWeekRoutine } from '../../screens/Plans/PlanDetailScreen';
import Text from '../Text';
import DayRoutine from './DayRoutine';

const WeekRoutine = (props: IWeekRoutine) => {
    // hooks from app
    const { sizes } = useTheme();
    const { t } = useTranslation();

    return (
        <FlatList
            ListHeaderComponent={
                <Text h5>{t('plans.detail.label.week', { week: props.week })}</Text>
            }
            data={props.days}
            renderItem={({ item, index }) => <DayRoutine {...item} />}
            style={{ paddingLeft: sizes.sm }}
        />
    );
};

export default WeekRoutine;
