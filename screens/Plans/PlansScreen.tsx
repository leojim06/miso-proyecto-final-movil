import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '../../components';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import TrainigPlan, { ITrainigPlans } from '../../components/plans/TrainigPlan';
import { useTheme, useTranslation } from '../../hooks';
import usePlansEndpoint from '../../services/api/usePlansEndpoint';

export default function PlansScreen() {
    // hooks for screen
    const [myPlans, setMyPlans] = useState<ITrainigPlans[]>([]);
    const [isMyPlansLoading, setIsMyPlansLoading] = useState<boolean>(false);
    const [mySuggestedPlans, setMySuggestedPlans] = useState<ITrainigPlans[]>([]);
    const [isMySuggestedPlansLoading, setIsMySuggestedPlansLoading] = useState<boolean>(false);

    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();
    const { loadMyPlans, loadMySuggestedPlans } = usePlansEndpoint();
    const isFocused = useIsFocused();

    useEffect(() => {
        setMyPlans([]);
        setIsMyPlansLoading(true);
        setMySuggestedPlans([]);
        setIsMySuggestedPlansLoading(true);

        let errorMessage = '';

        loadMyPlans('10', true)
            .then((data: ITrainigPlans[]) => setMyPlans(data))
            .catch((error: string) => {
                errorMessage = errorMessage ? `${errorMessage}\n${error}` : error;
            })
            .finally(() => setIsMyPlansLoading(false));

        loadMySuggestedPlans('10', true)
            .then((data: ITrainigPlans[]) => setMySuggestedPlans(data))
            .catch((error: string) => {
                errorMessage = errorMessage ? `${errorMessage}\n${error}` : error;
            })
            .finally(() => setIsMySuggestedPlansLoading(false));
    }, [isFocused]);

    return (
        <Block safe padding={sizes.padding}>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3 center>
                    {t('plans.label.title')}
                </Text>
            </Block>
            <Block flex={1} marginBottom={sizes.xl}>
                <Text h4>{t('plans.label.myPlans')}</Text>
                <FlatList
                    data={myPlans}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TrainigPlan props={item} isInMyPlans={true} />
                    )}
                    ListEmptyComponent={
                        isMyPlansLoading ? (
                            <LoadingPlaceholder />
                        ) : (
                            <Text>{t('plans.warning.myPlansNotFound')}</Text>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </Block>
            <Block flex={1}>
                <Text h4>{t('plans.label.suggestedPlans')}</Text>
                <FlatList
                    data={mySuggestedPlans}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <TrainigPlan props={item} isInMyPlans={false} />
                    )}
                    ListEmptyComponent={
                        isMySuggestedPlansLoading ? (
                            <LoadingPlaceholder />
                        ) : (
                            <Text>{t('plans.warning.mySuggestedPlansNotFound')}</Text>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </Block>
        </Block>
    );
}
