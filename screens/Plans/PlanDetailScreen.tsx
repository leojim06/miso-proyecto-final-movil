import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image as ReactImage } from 'react-native';
import styles from '../../assets/style/styles';
import { Text, Button, Block, Image } from '../../components';
import WeekRoutine from '../../components/plans/WeekRoutine';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import { PlanDetailScreenRouteProp } from '../../navigation/types';
import usePlansEndpoint from '../../services/api/usePlansEndpoint';

export interface ITrainigPlanDetailProps {
    id: string;
    image?: string;
    suscription?: 'Free' | 'Intermediate' | 'Pro';
    name?: string;
    description?: string;
    duration?: string;
    routine?: IWeekRoutine[];
}

export interface IWeekRoutine {
    week: number;
    days: IDayRoutine[];
}

export interface IDayRoutine {
    id: string;
    day: number;
    exercise: string;
}

export default function PlanDetailScreen() {
    //hooks for screen
    const [planDetail, setPlanDetail] = useState<ITrainigPlanDetailProps>();
    const [error, setError] = useState<string>();

    // hooks from app
    const route = useRoute<PlanDetailScreenRouteProp>();
    const { planId, isInMyPlans } = route.params;
    const { t } = useTranslation();
    const { sizes, assets, colors } = useTheme();
    const { handleLoading } = useData();
    const { loadPlanDetail } = usePlansEndpoint();

    useEffect(() => {
        console.log('Prueba de logeo detalle plan', String(assets.landscapePlaceholder));
        setPlanDetail(undefined);
        handleLoading(true);

        loadPlanDetail(planId, true)
            .then((data: ITrainigPlanDetailProps) => setPlanDetail(data))
            .catch((error: string) => setError(error))
            .finally(() => handleLoading(false));
    }, []);

    return (
        <>
            {!planDetail ? null : (
                // screen
                <Block scroll showsVerticalScrollIndicator={false} padding={sizes.margin}>
                    {/* title */}
                    <Block align="center">
                        <Text h4 center>
                            {planDetail?.name}
                        </Text>
                    </Block>
                    {/* Image */}
                    <Block flex={0} paddingVertical={sizes.padding} style={styles.image_container}>
                        {planDetail?.image ? (
                            <Image
                                source={{ uri: planDetail?.image }}
                                style={styles.image_background}
                            />
                        ) : (
                            <Image
                                source={assets.landscapePlaceholder}
                                style={styles.image_background}
                            />
                        )}
                    </Block>
                    {/* Content */}
                    <Block>
                        <IconRow name={'smile-o'} text={planDetail?.suscription} />
                        <IconRow name={'play'} text={planDetail?.description} />
                        <IconRow name={'clock-o'} text={planDetail?.duration} />
                    </Block>
                    {/* Button suscription */}
                    <Block paddingBottom={sizes.md}>
                        <Button primary>
                            <Text white bold transform="uppercase">
                                {isInMyPlans
                                    ? t('plans.detail.btn.startTrainig')
                                    : t('plans.detail.btn.suscribe')}
                            </Text>
                        </Button>
                    </Block>
                    {/* Routine */}
                    <Block card>
                        <Block flex={0} paddingBottom={sizes.s}>
                            <Text h4>{t('plans.detail.label.routine')}</Text>
                        </Block>
                        <FlatList
                            data={planDetail?.routine}
                            renderItem={({ item, index }) => <WeekRoutine {...item} />}
                        />
                    </Block>
                </Block>
            )}
        </>
    );
}
