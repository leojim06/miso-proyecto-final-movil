import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Image } from 'react-native';
import { Block, Button, Text } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';
import { useTimer } from '../../hooks/useTimer';
import {
    TrainingSessionScreenNavigationProp,
    TrainingWatcherScreenRouteProp,
} from '../../navigation/types/trainingSessionStackNavigatorParamList';

export default function TrainingWatcher() {
    const navigation = useNavigation<TrainingSessionScreenNavigationProp>();
    const route = useRoute<TrainingWatcherScreenRouteProp>();
    const { session } = route.params;

    const { start, stop, time, isRunning } = useTimer();
    const { assets, sizes } = useTheme();
    const { t } = useTranslation();
    const { trainingSession, handleTrainingSession } = useData();

    const handleFinishTrainingSession = () => {
        console.warn(session);
        const currentSession = Object.assign(
            {},
            {
                ...trainingSession,
                rutinas: trainingSession.rutinas?.map((rutina) => ({
                    ...rutina,
                    dias: rutina.dias.map((dia) => {
                        if (dia.dia === session.day + 1) return { ...dia, activo: true };

                        return session.id === dia.id
                            ? { ...dia, activo: false, completo: true, tiempo: time }
                            : { ...dia };
                    }),
                })),
            }
        );

        handleTrainingSession(currentSession);
        navigation.navigate('TrainingSessionScreen')
    };

    return (
        <Block flex={1} center align="center" paddingTop={130} padding={sizes.padding}>
            <Text h1>{time}</Text>
            <Block>
                <Button
                    onPress={() => {
                        isRunning ? stop() : start();
                    }}
                >
                    {isRunning ? (
                        <Image source={assets.error} />
                    ) : (
                        <Image source={assets.success} />
                    )}
                </Button>
                <Block justify="flex-end" paddingBottom={sizes.padding}>
                    <Button
                        primary
                        paddingHorizontal={sizes.padding}
                        onPress={() => handleFinishTrainingSession()}
                    >
                        <Text white bold transform="uppercase">
                            {t('training.detail.btn.end')}
                        </Text>
                    </Button>
                </Block>
            </Block>
        </Block>
    );
}
