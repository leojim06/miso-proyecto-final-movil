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
import { BarChart } from 'react-native-chart-kit';

const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

const caloriasData = {
    labels: ['Calorias'],
    datasets: [{ data: [250] }],
};

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
        },
    ],
};

export default function ProgressEventDetailScreen() {
    // hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [eventDetail, setEventDetail] = useState<IEventDetailProps>();

    // hooks from app
    const navigation = useNavigation<ProgressEventScreenNavigationProp>();
    const route = useRoute<ProgressEventDetailScreenRouteProp>();
    const { eventId } = route.params;
    const { t, i18n } = useTranslation();
    const { handleLoading } = useData();
    const { sizes } = useTheme();
    const { loadMyEventProgressDetail } = useEventEndpoint();

    useEffect(() => {
        setEventDetail(undefined);
        handleLoading(true);

        loadMyEventProgressDetail(eventId, true)
            .then((data: IEventDetailProps) => setEventDetail(data))
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

    return (
        <>
            <CustomModal {...modal} />
            {!eventDetail ? null : (
                <Block padding={sizes.padding}>
                    {/* title */}
                    <Block flex={0} align="center" paddingBottom={sizes.s}>
                        <Text h4 center>
                            {eventDetail?.name}
                        </Text>
                    </Block>
                    {/* Content */}
                    <Block>
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
                    <Block>
                        {/* <BarChart
                            // style={graphStyle}
                            data={data}
                            width={200}
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix='suffix'
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                        /> */}
                    </Block>
                </Block>
            )}
        </>
    );
}
