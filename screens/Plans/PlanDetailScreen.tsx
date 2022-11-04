import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image as ReactImage } from 'react-native';
import styles from '../../assets/style/styles';
import { Text, Button, Block, Image } from '../../components';
import CustomModal, { ICustomPanel } from '../../components/modals/CustomModal';
import WeekRoutine from '../../components/plans/WeekRoutine';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import { PlanDetailScreenRouteProp, PlansScreenNavigationProp } from '../../navigation/types';
import usePlansEndpoint from '../../services/api/usePlansEndpoint';

export interface ITrainingPlanDetailProps {
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
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [planDetail, setPlanDetail] = useState<ITrainingPlanDetailProps>();

    // hooks from app
    const navigation = useNavigation<PlansScreenNavigationProp>();
    const route = useRoute<PlanDetailScreenRouteProp>();
    const { planId, isInMyPlans } = route.params;
    const { t } = useTranslation();
    const { sizes, assets, colors } = useTheme();
    const { handleLoading } = useData();
    const { loadPlanDetail } = usePlansEndpoint();

    useEffect(() => {
        setPlanDetail(undefined);
        handleLoading(true);

        loadPlanDetail(planId, true)
            .then((data: ITrainingPlanDetailProps) => setPlanDetail(data))
            .catch((error: string) =>
                setModal({
                    isVisible: true,
                    title: t('plans.detail.modal.errorTitle'),
                    message: error,
                    type: 'error',
                    confirmButtonTitle: t('plans.detail.modal.errorButton'),
                    onConfirmPress: () => {
                        setModal({ ...modal, isVisible: false });
                        navigation.pop();
                    },
                })
            )
            .finally(() => handleLoading(false));
    }, []);

    const handleStartRoutine = () => {
        setModal({
            isVisible: true,
            title: t('plans.detail.modal.warningTitleStartRoutine'),
            message: t('plans.detail.modal.warningMessageNewRoutine', { name: planDetail?.name }),
            type: 'warning',
            confirmButtonTitle: t('plans.detail.modal.confirmBtnTitle'),
            cancelButtonTitle: t('plans.detail.modal.cancelBtnTitle'),
            onConfirmPress: () => {},
            onCancelPress: () => {
                setModal({ ...modal, isVisible: false });
            },
        });
    };

    const handleTrainingSuscription = () => {
        setModal({
            isVisible: true,
            title: t('plans.detail.modal.warningTitleSuscription'),
            message: t('plans.detail.modal.warningMessageSuscription', { name: planDetail?.name }),
            type: 'warning',
            confirmButtonTitle: t('plans.detail.modal.confirmBtnTitle'),
            cancelButtonTitle: t('plans.detail.modal.cancelBtnTitle'),
            onConfirmPress: () => {},
            onCancelPress: () => {
                setModal({ ...modal, isVisible: false });
            },
        });
    };

    return (
        <>
            <CustomModal {...modal} />
            {!planDetail ? null : (
                // screen
                <Block scroll showsVerticalScrollIndicator={false} padding={sizes.padding}>
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
                        <Button
                            primary
                            onPress={isInMyPlans ? handleStartRoutine : handleTrainingSuscription}
                        >
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
