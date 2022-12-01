import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { Block, Button, Text } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';
import { useFitMetrics } from '../../hooks/useFitMetrics';
import { useTimer } from '../../hooks/useTimer';
import {
    TrainingSessionScreenNavigationProp,
    TrainingWatcherScreenRouteProp,
} from '../../navigation/types/trainingSessionStackNavigatorParamList';

export default function TrainingWatcher() {
    const navigation = useNavigation<TrainingSessionScreenNavigationProp>();
    const route = useRoute<TrainingWatcherScreenRouteProp>();
    const { session } = route.params;

    const timer = useTimer();
    const sensor = useFitMetrics();
    const { assets, sizes, colors } = useTheme();
    const { t } = useTranslation();
    const { trainingSession, handleTrainingSession, user, isSensorActive } = useData();

    const handleFinishTrainingSession = () => {
        const currentSession = Object.assign(
            {},
            {
                ...trainingSession,
                rutinas: trainingSession.rutinas?.map((rutina) => ({
                    ...rutina,
                    dias: rutina.dias.map((dia) => {
                        if (dia.dia === session.day + 1) return { ...dia, activo: true };

                        return session.id === dia.id
                            ? { ...dia, activo: false, completo: true, tiempo: timer.time }
                            : { ...dia };
                    }),
                })),
            }
        );

        handleTrainingSession(currentSession);

        if (user.suscripcion.idTipoSuscripcion === 3) navigation.navigate('RestRoutineScreen');
        else navigation.navigate('TrainingSessionScreen');
    };

    const handleStartTrainigSession = () => {
        timer.isRunning ? timer.stop() : timer.start();
        sensor.isRunning ? sensor.start() : sensor.start();
    };

    useEffect(() => {
        console.log('sensor: ', isSensorActive);
        if (isSensorActive) sensor.start();
    }, []);

    return (
        <Block>
            <Block flex={1} center align="center" paddingTop={180} padding={sizes.padding}>
                <Text h1 primary>
                    {timer.time}
                </Text>
                <Block>
                    <Button onPress={handleStartTrainigSession}>
                        {timer.isRunning ? (
                            <Image source={assets.error} />
                        ) : (
                            <Image source={assets.success} />
                        )}
                    </Button>
                </Block>
            </Block>
            <Block flex={1} justify="flex-end" padding={sizes.padding}>
                {isSensorActive ? (
                    <Block justify="flex-end" align="flex-end">
                        <FontAwesome size={84} name={'heartbeat'} color={colors.danger} />
                        <Text h3 center tertiary>
                            {sensor.isRunning ? sensor.heartRate.slice(-1)[0].value : 0}
                        </Text>
                    </Block>
                ) : null}

                <Block flex={0} padding={sizes.padding}>
                    <Button
                        disabled={timer.isRunning || timer.milliseconds <= 0}
                        primary
                        paddingHorizontal={sizes.padding}
                        onPress={() => {
                            if (!timer.isRunning && timer.milliseconds > 0)
                                handleFinishTrainingSession();
                        }}
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
