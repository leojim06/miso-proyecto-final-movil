import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/style/styles';
import { Text, Button, Block, Image } from '../../components';
import CustomModal, { ICustomPanel } from '../../components/modals/CustomModal';
import DayRoutine from '../../components/plans/DayRoutine';
import { ITrainingPlan } from '../../components/plans/TrainigPlan';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import { PlanDetailScreenRouteProp, PlansScreenNavigationProp } from '../../navigation/types';
import usePlansEndpoint from '../../services/api/usePlansEndpoint';
import {
    IDayTrainingSessionProps,
    ITrainingSessionProps,
} from '../TrainingSession/TrainingSesion';

export default function PlanDetailScreen() {
    //hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [planDetail, setPlanDetail] = useState<ITrainingPlan>();

    // hooks from app
    const navigation = useNavigation<PlansScreenNavigationProp>();
    const route = useRoute<PlanDetailScreenRouteProp>();
    const { planId, isInMyPlans } = route.params;
    const { t } = useTranslation();
    const { sizes, assets } = useTheme();
    const {
        handleLoading,
        trainingSession,
        handleTrainingSession,
        user,
        suscriptionCatalog,
        trainingLevelCatalog,
    } = useData();
    const { loadPlanDetail, subscribeMyPlan } = usePlansEndpoint();

    useEffect(() => {
        setPlanDetail(undefined);
        handleLoading(true);

        loadPlanDetail(planId)
            .then((data: ITrainingPlan) => {
                const info: ITrainingPlan = Object.assign(
                    {},
                    {
                        ...data,
                        suscripcionDetalle: {
                            ...suscriptionCatalog.find(
                                (suscription) => suscription.id === data.suscripcion
                            ),
                        },
                        nivelPlanDetalle: {
                            ...trainingLevelCatalog.find((level) => level.id === data.nivelPlan),
                        },
                    }
                );
                setPlanDetail(info);
            })
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
        let modalInformation: ICustomPanel = {
            type: 'success',
            isVisible: true,
            title: t('plans.detail.modal.warningTitleStartRoutine'),
            message: '',
            confirmButtonTitle: t('plans.detail.modal.confirmBtnTitle'),
            cancelButtonTitle: t('plans.detail.modal.cancelBtnTitle'),
            onCancelPress: () => setModal({ ...modal, isVisible: false }),
        };

        modalInformation = trainingSession
            ? trainingSession.id === planDetail?.id
                ? {
                      ...modalInformation,
                      type: 'info',
                      message: t('plans.detail.modal.warningMessageSameRoutine'),
                      confirmButtonTitle: t('plans.detail.modal.configmBtnTitleInfo'),
                      onConfirmPress: () => setModal({ ...modal, isVisible: false }),
                  }
                : {
                      ...modalInformation,
                      type: 'warning',
                      message: t('plans.detail.modal.warningMessageWithRoutine', {
                          nameOld: trainingSession.nombre,
                          nameNew: planDetail?.nombre,
                      }),
                      onConfirmPress: () => {
                          setModal({ ...modal, isVisible: false });
                          registerRoutineToStart();
                      },
                  }
            : {
                  ...modalInformation,
                  type: 'warning',
                  message: t('plans.detail.modal.warningMessageNewRoutine', {
                      name: planDetail?.nombre,
                  }),
                  onConfirmPress: () => {
                      setModal({ ...modal, isVisible: false });
                      registerRoutineToStart();
                  },
              };
        setModal(modalInformation);
    };

    const handleTrainingSuscription = () => {
        setModal({
            isVisible: true,
            title: t('plans.detail.modal.warningTitleSuscription'),
            message: t('plans.detail.modal.warningMessageSuscription', {
                name: planDetail?.nombre,
            }),
            type: 'warning',
            confirmButtonTitle: t('plans.detail.modal.confirmBtnTitle'),
            cancelButtonTitle: t('plans.detail.modal.cancelBtnTitle'),
            onConfirmPress: () => {
                setModal({ ...modal, isVisible: false });
                registerRoutineToSuscription();
            },
            onCancelPress: () => {
                setModal({ ...modal, isVisible: false });
            },
        });
    };

    const registerRoutineToStart = () => {
        try {
            const trainingSession: ITrainingSessionProps = Object.assign(
                {},
                {
                    activo: true,
                    id: planDetail?.id, 
                    nombre: planDetail?.nombre,
                    descripcion: planDetail?.descripcion,
                    duracion: planDetail?.duracion,
                    rutinas: [
                        {
                            semana: 1,
                            activo: true,
                            dias: planDetail?.rutinas.map(
                                (rutina, index): IDayTrainingSessionProps => ({
                                    ...rutina,
                                    activo: index === 0,
                                    completo: false,
                                })
                            ),
                        },
                    ],
                }
            );

            console.info(JSON.stringify(trainingSession, null, 3));

            handleTrainingSession(trainingSession);
            setModal({
                ...modal,
                isVisible: true,
                type: 'info',
                title: t('plans.detail.modal.warningTitleStartRoutine'),
                message: t('plans.detail.modal.successMessageRegistery', {
                    name: planDetail?.nombre,
                }),
                confirmButtonTitle: t('plans.detail.modal.configmBtnTitleInfo'),
                onConfirmPress: () => setModal({ ...modal, isVisible: false }),
            });
        } catch (error) {
            setModal({
                ...modal,
                isVisible: true,
                type: 'error',
                title: t('plans.detail.modal.warningTitleStartRoutine'),
                message: t('plans.detail.modal.errorMessageRegistery'),
                confirmButtonTitle: t('plans.detail.modal.configmBtnTitleInfo'),
                onConfirmPress: () => setModal({ ...modal, isVisible: false }),
            });
        }
    };

    const registerRoutineToSuscription = () => {
        handleLoading(true);
        subscribeMyPlan(user.userId, planDetail?.id)
            .then((data: boolean) => {
                if (data)
                    setModal({
                        isVisible: true,
                        title: t('plans.detail.modal.warningTitleSuscription'),
                        message: t('plans.detail.modal.successMessageRegistery', {
                            name: planDetail?.nombre,
                        }),
                        type: 'success',
                        confirmButtonTitle: t('plans.detail.modal.configmBtnTitleInfo'),
                        onConfirmPress: () => {
                            setModal({ ...modal, isVisible: false });
                            navigation.pop();
                        },
                    });
                else throw '';
            })
            .catch((error: string) =>
                setModal({
                    isVisible: true,
                    title: t('plans.detail.modal.warningTitleSuscription'),
                    message: t('plans.detail.modal.errorMessageRegistery'),
                    type: 'error',
                    confirmButtonTitle: t('plans.detail.modal.configmBtnTitleInfo'),
                    onConfirmPress: () => setModal({ ...modal, isVisible: false }),
                })
            )
            .finally(() => handleLoading(false));
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
                            {planDetail?.nombre}
                        </Text>
                    </Block>
                    {/* Image */}
                    <Block flex={0} paddingVertical={sizes.padding} style={styles.image_container}>
                        {planDetail?.imagen ? (
                            <Image
                                source={{ uri: planDetail?.imagen }}
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
                        <IconRow
                            name={'smile-o'}
                            text={String(planDetail?.suscripcionDetalle?.descripcion)}
                        />
                        <IconRow name={'play'} text={planDetail?.descripcion} />
                        <IconRow name={'clock-o'} text={planDetail?.duracion} />
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
                        {planDetail.rutinas?.map((item, index) => {
                            return <DayRoutine key={index} {...item} />;
                        })}
                    </Block>
                </Block>
            )}
        </>
    );
}
