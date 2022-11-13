import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '../../components';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import TrainigPlan, { ITrainingPlan } from '../../components/plans/TrainigPlan';
import DataNotFound from '../../components/utils/DataNotFound';
import { useData, useTheme, useTranslation } from '../../hooks';
import usePlansEndpoint from '../../services/api/usePlansEndpoint';

export default function PlansScreen() {
    // hooks for screen
    const [myPlans, setMyPlans] = useState<ITrainingPlan[]>([]);
    const [isMyPlansLoading, setIsMyPlansLoading] = useState<boolean>(false);
    const [mySuggestedPlans, setMySuggestedPlans] = useState<ITrainingPlan[]>([]);
    const [isMySuggestedPlansLoading, setIsMySuggestedPlansLoading] = useState<boolean>(false);

    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();
    const { loadMyPlans, loadMySuggestedPlans } = usePlansEndpoint();
    const isFocused = useIsFocused();
    const { user, suscriptionCatalog, trainingLevelCatalog } = useData();

    useEffect(() => {
        setMyPlans([]);
        setIsMyPlansLoading(true);
        setMySuggestedPlans([]);
        setIsMySuggestedPlansLoading(true);

        let errorMessage = '';

        loadMyPlans(user.userId)
            .then((data: ITrainingPlan[]) => {
                const info: ITrainingPlan[] = data.map((plan) => ({
                    ...plan,
                    suscripcionDetalle: {
                        ...suscriptionCatalog.find(
                            (suscription) => suscription.id === plan.suscripcion
                        ),
                    },
                    nivelPlanDetalle: {
                        ...trainingLevelCatalog.find((level) => level.id === plan.nivelPlan),
                    },
                }));
                setMyPlans(info);
            })
            .catch((error: string) => {
                console.error(error)
                errorMessage = errorMessage ? `${errorMessage}\n${error}` : error;
            })
            .finally(() => setIsMyPlansLoading(false));

        loadMySuggestedPlans(user.userId)
            .then((data: ITrainingPlan[]) => {
                const info: ITrainingPlan[] = data.map((plan) => ({
                    ...plan,
                    suscripcionDetalle: {
                        ...suscriptionCatalog.find(
                            (suscription) => suscription.id === plan.suscripcion
                        ),
                    },
                    nivelPlanDetalle: {
                        ...trainingLevelCatalog.find((level) => level.id === plan.nivelPlan),
                    },
                }));
                setMySuggestedPlans(info);
            })
            .catch((error: string) => {
                console.error(error)
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
                            <DataNotFound title={t('plans.warning.myPlansNotFound')} />
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
                            <DataNotFound title={t('plans.warning.mySuggestedPlansNotFound')} />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </Block>
        </Block>
    );
}
