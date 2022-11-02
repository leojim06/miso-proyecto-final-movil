import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '../../components';
import WeekSession from '../../components/training/WeekSession';
import { useData, useTheme, useTranslation } from '../../hooks';

export interface ITrainigSessionProps {
    name?: string;
    description?: string;
    duration?: string;
    routine?: IWeekTrainigSession[];
}

export interface IWeekTrainigSession {
    active: boolean;
    week: number;
    days: IDayTrainigSession[];
}

export interface IDayTrainigSession {
    active: boolean;
    complete?: boolean;
    id: string;
    day: number;
    exercise: string;
}

const trainigSession: ITrainigSessionProps = {
    name: 'Plan para comenzar a caminar',
    description:
        'Es importante que, para mantener un balance en el trabajo que se hace durante la caminata, se complemente con alguna serie sencilla de ejercicios de fortalecimiento abdominal, de esta forma la postura logrará mejorías y la columna se verá beneficiada.',
    duration: '6 semanas',
    routine: [
        {
            active: true,
            week: 1,
            days: [
                { active: false, complete: true, id: '1', day: 1, exercise: '30’ con paso lento' },
                { active: true, id: '2', day: 2, exercise: '25’ con paso moderado' },
                { active: false, id: '3', day: 3, exercise: '30’ con paso lento' },
            ],
        },
        {
            active: false,
            week: 2,
            days: [
                { active: false, id: '4', day: 1, exercise: '30’ con paso moderado' },
                { active: false, id: '5', day: 2, exercise: '35’ con paso lento' },
                { active: false, id: '6', day: 3, exercise: '30’ con paso moderado' },
            ],
        },
        {
            active: false,
            week: 3,
            days: [
                { active: false, id: '7', day: 1, exercise: '30’ con paso moderado' },
                { active: false, id: '8', day: 2, exercise: '35’ con paso lento' },
                { active: false, id: '9', day: 3, exercise: '30’ con paso moderado' },
            ],
        },
        {
            active: false,
            week: 4,
            days: [
                { active: false, id: '10', day: 1, exercise: '35’ con paso acelerado' },
                { active: false, id: '11', day: 2, exercise: '40’ con paso moderado' },
                { active: false, id: '12', day: 3, exercise: '35’ con paso acelerado' },
            ],
        },
        {
            active: false,
            week: 5,
            days: [
                { active: false, id: '13', day: 1, exercise: '40’ con paso acelerado' },
                { active: false, id: '14', day: 2, exercise: '45’ con paso moderado' },
                { active: false, id: '15', day: 3, exercise: '40’ con paso acelerado' },
            ],
        },
        {
            active: false,
            week: 6,
            days: [
                { active: false, id: '16', day: 1, exercise: '45’ con paso moderado' },
                { active: false, id: '17', day: 2, exercise: '45’ con paso acelerado' },
                { active: false, id: '18', day: 3, exercise: '45’ con paso moderado' },
            ],
        },
    ],
};

export default function TrainingSessionScreen() {
    // hooks for screen

    // hooks from app
    const { t } = useTranslation();
    const { colors, sizes } = useTheme();
    const { handleTrainingSession, trainingSession } = useData();

    useEffect(() => {
        handleTrainingSession('hola mundo');
    }, []);

    return (
        <Block safe margin={sizes.margin}>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3 center>
                    {t('training.label.title')}
                </Text>
            </Block>
            {trainingSession === undefined ? (
                <Block card tertiary>
                    <Text h4 bold>
                        {t('training.warning.trainingSessionNotFound')}
                    </Text>
                    <Text p>{t('training.warning.instruction')}</Text>
                </Block>
            ) : (
                <FlatList
                    data={trainigSession.routine}
                    renderItem={({ item, index }) => <WeekSession {...item} />}
                />
            )}
        </Block>
    );
}
