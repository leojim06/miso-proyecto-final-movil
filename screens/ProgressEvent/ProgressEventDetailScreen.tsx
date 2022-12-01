import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Block, Text } from '../../components';
import CustomModal, { ICustomPanel } from '../../components/modals/CustomModal';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import {
    ProgressEventDetailScreenRouteProp,
    ProgressEventScreenNavigationProp,
} from '../../navigation/types/progressEventStackNavigatorParamList';
import useEventEndpoint from '../../services/api/useEventEndpoint';
import { IEventDetailProps } from '../Events/EventDetailScreen';
import { BarChart } from 'react-native-gifted-charts';

export default function ProgressEventDetailScreen() {
    const barData = [
        {
            value: 250,
            label: 'Apr',
            frontColor: '#4ADDBA',
            sideColor: '#36D9B2',
            topColor: '#7DE7CE',
        },
    ];

    // hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [eventDetail, setEventDetail] = useState<IEventDetailProps>();
    const [caloriesData, setCaloriesData] = useState<any>([]);
    const [timeData, setTimeData] = useState<any>([]);

    // hooks from app
    const navigation = useNavigation<ProgressEventScreenNavigationProp>();
    const route = useRoute<ProgressEventDetailScreenRouteProp>();
    const { eventId } = route.params;
    const { t, i18n } = useTranslation();
    const { handleLoading } = useData();
    const { sizes, colors } = useTheme();
    const { loadMyEventProgressDetail } = useEventEndpoint();

    useEffect(() => {
        setEventDetail(undefined);
        handleLoading(true);

        loadMyEventProgressDetail(eventId, true)
            .then((data: IEventDetailProps) => {
                setCaloriesData([
                    {
                        value: data.calorias,
                        label: t('progress.detail.label.caloriesSymbol'),
                        frontColor: colors.primary,
                    },
                ]);
                setTimeData([
                    {
                        value: data.tiempo,
                        label: t('progress.detail.label.timeSymbol'),
                        frontColor: colors.tertiary,
                    },
                ]);
                setEventDetail(data);
            })
            .catch((error: string) => {
                setModal({
                    isVisible: true,
                    title: t('progress.detail.modal.errorTitle'),
                    message: error,
                    type: 'error',
                    confirmButtonTitle: t('progress.detail.modal.errorButton'),
                    onConfirmPress: () => {
                        setModal({ ...modal, isVisible: false });
                        navigation.pop();
                    },
                });
            })
            .finally(() => handleLoading(false));
    }, []);

    const roundUpToNearest100 = (num: number): number => Math.ceil(num / 100) * 100;

    return (
        <>
            <CustomModal {...modal} />
            {!eventDetail ? null : (
                <Block padding={sizes.padding}>
                    {/* title */}
                    <Block flex={0} align="center" paddingBottom={sizes.s}>
                        <Text h4 center tertiary>
                            {eventDetail?.name}
                        </Text>
                    </Block>
                    {/* Content */}
                    <Block flex={0}>
                        <IconRow name={'map-marker'} text={eventDetail?.location} />
                        <IconRow
                            name={'calendar'}
                            text={i18n.toTime(
                                'date.formats.short',
                                eventDetail?.time?.start ?? Date.now()
                            )}
                        />
                        <IconRow
                            name={'clock-o'}
                            text={i18n.toTime(
                                'date.formats.short',
                                eventDetail?.time?.end ?? Date.now()
                            )}
                        />
                        <IconRow text={eventDetail?.description} />
                    </Block>
                    {/* Graficas */}
                    <Block row>
                        <Block>
                            <Text bold primary h5>
                                {t('progress.detail.label.calories')}
                            </Text>
                            <BarChart
                                barWidth={32}
                                noOfSections={3}
                                maxValue={roundUpToNearest100(eventDetail.calorias)}
                                data={caloriesData}
                                yAxisThickness={0}
                                rulesColor={colors.tertiary}
                            />
                        </Block>
                        <Block>
                            <Text bold primary h5>
                                {t('progress.detail.label.time')}
                            </Text>
                            <BarChart
                                barWidth={32}
                                noOfSections={3}
                                maxValue={roundUpToNearest100(eventDetail.tiempo)}
                                data={timeData}
                                yAxisThickness={0}
                                rulesColor={colors.dribbble}
                            />
                        </Block>
                    </Block>
                </Block>
            )}
        </>
    );
}
