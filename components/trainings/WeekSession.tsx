import React from 'react';
import { FlatList } from 'react-native';
import { useTheme, useTranslation } from '../../hooks';
import { IWeekTrainigSession } from '../../screens/TrainingSession/TrainingSesionScreen';
import Block from '../Block';
import Text from '../Text';
import DayRoutine from './DaySession';

const WeekSession = (props: IWeekTrainigSession) => {
    // hooks from app
    const { sizes, colors } = useTheme();
    const { t } = useTranslation();

    return (
        <Block card marginBottom={sizes.sm} color={props.active ? colors.primary : colors.gray}>
            <FlatList
                ListHeaderComponent={
                    <Text
                        h5
                        color={props.active ? colors.white : colors.black}
                        transform={props.active ? 'uppercase' : 'none'}
                        bold={props.active}
                    >
                        {t('plans.detail.label.week', { week: props.week })}
                    </Text>
                }
                data={props.days}
                renderItem={({ item, index }) => <DayRoutine {...item} />}
                style={{ paddingLeft: sizes.sm }}
            />
        </Block>
    );
};

export default WeekSession;
