import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/style/styles';
import { Block, Image, Text } from '../../components';
import { IEventProps } from '../../components/events/Event';
import CustomModal, { ICustomPanel } from '../../components/modals/CustomModal';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import { EventDetailScreenRouteProp, EventsScreenNavigationProp } from '../../navigation/types';
import useEventEndpoint from '../../services/api/useEventEndpoint';

export default function EventDetailScreen() {
    // hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [eventDetail, setEventDetail] = useState<IEventProps>();

    // hoots from app
    const navigation = useNavigation<EventsScreenNavigationProp>();
    const route = useRoute<EventDetailScreenRouteProp>();
    const { eventId } = route.params;
    const { t, i18n } = useTranslation();
    const { handleLoading } = useData();
    const { assets, sizes } = useTheme();
    const { loadEventDetail } = useEventEndpoint();

    useEffect(() => {
        setEventDetail(undefined);
        handleLoading(true);

        loadEventDetail(eventId)
            .then((data: IEventProps) => setEventDetail(data))
            .catch((error: string) => {
                setModal({
                    isVisible: true,
                    title: t('events.detail.modal.errorTitle'),
                    message: error,
                    type: 'error',
                    confirmButtonTitle: t('events.detail.modal.errorButton'),
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
                        <Text h4 center tertiary>
                            {eventDetail?.nombre}
                        </Text>
                    </Block>
                    {/* Image */}
                    <Block flex={0} paddingVertical={sizes.padding} style={styles.image_container}>
                        {eventDetail?.imagen ? (
                            <Image
                                source={{ uri: eventDetail?.imagen }}
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
                        <IconRow name={'map-marker'} text={eventDetail?.ciudad} />
                        <IconRow
                            name={'calendar'}
                            text={i18n.toTime(
                                'date.formats.short',
                                eventDetail?.fechaInicio ?? Date.now()
                            )}
                        />
                        <IconRow
                            name={'clock-o'}
                            text={i18n.toTime(
                                'date.formats.short',
                                eventDetail?.fechaFin ?? Date.now()
                            )}
                        />
                        <IconRow text={eventDetail?.descripcion} />
                        <IconRow
                            name={'houzz'}
                            text={t('events.detail.label.food', { food: eventDetail?.comida })}
                        />
                        <IconRow
                            name={'bed'}
                            text={t('events.detail.label.host', { host: eventDetail.estadia })}
                        />
                    </Block>
                </Block>
            )}
        </>
    );
}
