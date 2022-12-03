import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '../../components';
import WeekSession from '../../components/trainings/WeekSession';
import DataNotFound from '../../components/utils/DataNotFound';
import { useData, useTheme, useTranslation } from '../../hooks';
import { ITrainingSessionProps } from './TrainingSesion';

export default function TrainingSessionScreen() {
    // hooks for screen

    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();
    const { trainingSession } = useData();

    return (
        <Block safe padding={sizes.padding}>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3 center tertiary>
                    {t('training.label.title')}
                </Text>
            </Block>
            {trainingSession === undefined ? (
                <DataNotFound
                    title={t('training.warning.trainingSessionNotFound')}
                    message={t('training.warning.instruction')}
                />
            ) : (
                // <Block></Block>
                <FlatList
                    data={trainingSession.rutinas}
                    ListHeaderComponent={
                        <Block flex={0}>
                            <Text h4 primary>
                                {trainingSession.nombre || 'Rutina'}
                            </Text>
                        </Block>
                    }
                    renderItem={({ item, index }) => <WeekSession {...item} />}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Block>
    );
}
