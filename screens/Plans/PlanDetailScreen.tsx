import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useTransition } from 'react';
import { FlatList, View } from 'react-native';
import { Text, Button, Block } from '../../components';
import Routine from '../../components/events/Routine';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
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
    routine?: IRoutine[];
}

export interface IRoutine {
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
    const { sizes } = useTheme();
    const { handleLoading } = useData();
    const { loadPlanDetail } = usePlansEndpoint();

    useEffect(() => {
        setPlanDetail(undefined);
        handleLoading(true);

        loadPlanDetail(planId, true)
            .then((data: ITrainigPlanDetailProps) => setPlanDetail(data))
            .catch((error: string) => setError(error))
            .finally(() => handleLoading(false));
    }, []);

    return (
        <>
            {!planDetail ? (
                null
            ) : (
                // screen
                <Block scroll margin={sizes.margin}>
                    {/* title */}
                    <Block flex={0} align="center" paddingBottom={sizes.s}>
                        <Text h4 center>
                            {planDetail?.name}
                        </Text>
                    </Block>
                    {/* Image */}
                    <Block></Block>
                    {/* Content */}
                    <Block>
                        <Block row align="center">
                            <FontAwesome size={30} name={'smile-o'} />
                            <Text p paddingLeft={sizes.s}>
                                {planDetail?.suscription}
                            </Text>
                        </Block>

                        <Block flex={0} row>
                            <FontAwesome size={30} name={'play'} />
                            <Text p paddingLeft={sizes.s}>
                                {planDetail?.description}
                            </Text>
                        </Block>

                        <Block row align="center">
                            <FontAwesome size={30} name={'clock-o'} />
                            <Text p paddingLeft={sizes.s}>
                                {planDetail?.duration}
                            </Text>
                        </Block>
                    </Block>
                    {/* Button suscription */}
                    <Block>
                        {isInMyPlans ? null : (
                            <Button primary>
                                <Text white bold transform="uppercase">
                                    {t('plans.detail.btn.suscribe')}
                                </Text>
                            </Button>
                        )}
                    </Block>
                    {/* Routine */}
                    <Block card>
                        <Block flex={0} paddingBottom={sizes.s}>
                            <Text h4>{t('plans.detail.label.routine')}</Text>
                        </Block>
                        <FlatList
                            data={planDetail?.routine}
                            renderItem={({ item, index }) => <Routine {...item} />}
                        />
                    </Block>
                </Block>
            )}
        </>
    );
}
