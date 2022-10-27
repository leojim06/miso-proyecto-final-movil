import React from 'react';
import { Block, Text } from '..';
import { useTranslation } from '../../hooks';

export type TrainigPlanProps = {
    id: number;
    name?: string;
    description?: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced';
    duration?: number;
};

const TrainigPlan = (props: TrainigPlanProps) => {
    const { t } = useTranslation();

    return (
        <Block>
            <Text h4>{props.name}</Text>
            <Text p>{props.description}</Text>
            <Block>
                <Text h5>{t('plans.trainigPlan.label.level')}</Text>
                <Text p>{props.level}</Text>
                <Text h5>{t('plans.trainigPlan.label.duration')}</Text>
                <Text p>{props.duration}</Text>
            </Block>
        </Block>
    );
};

export default TrainigPlan;
