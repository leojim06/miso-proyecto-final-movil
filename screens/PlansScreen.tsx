import React from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '../components';
import TrainigPlan, { TrainigPlanProps } from '../components/plans/TrainigPlan';
import { useTheme, useTranslation } from '../hooks';

const data: TrainigPlanProps[] = [
    {
        id: 1,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Beginner',
        duration: 10,
    },
    {
        id: 2,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Intermediate',
        duration: 10,
    },
    {
        id: 3,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Advanced',
        duration: 10,
    },
];

export default function PlansScreen() {
    const { t } = useTranslation();
    const { sizes } = useTheme();

    
    return (
        <Block scroll>
            <Block align="center" paddingBottom={sizes.s}>
                <Text h3>{t('plans.label.title')}</Text>
            </Block>
            <Block>
                <FlatList
                    data={data}
                    ListHeaderComponent={<Text h4>{t('plans.label.myPlans')}</Text>}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <TrainigPlan {...item} />}
                    ListEmptyComponent={<Text>Cargando</Text>}
                />
            </Block>
            <Block>
                <Text h4>{t('plans.label.suggestedPlans')}</Text>
                <Text p>lista sugerencias</Text>
            </Block>
        </Block>
    );
}
