import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import styles from '../../assets/style/styles';
import { Block, Image, Text } from '../../components';
import IconRow from '../../components/utils/IconRow';
import { useData, useTheme, useTranslation } from '../../hooks';
import { EventDetailScreenRouteProp } from '../../navigation/types';
import useEventEndpoint from '../../services/api/useEventEndpoint';

export interface IEventDetailProps {
    id: string;
    image?: string;
    location?: string;
    time?: {
        start?: Date;
        end?: Date;
    };
    name?: string;
    description?: string;
    food?: string;
    host?: string;
}

export default function EventDetailScreen() {
    // hooks for screen
    const [eventDetail, setEventDetail] = useState<IEventDetailProps>();
    const [error, setError] = useState<string>();

    // hoots from app
    const route = useRoute<EventDetailScreenRouteProp>();
    const { eventId } = route.params;
    const { t, i18n } = useTranslation();
    const { handleLoading } = useData();
    const { assets, sizes, colors } = useTheme();
    const { loadEventDetail } = useEventEndpoint();

    useEffect(() => {
        setEventDetail(undefined);
        handleLoading(true);

        loadEventDetail(eventId, true)
            .then((data: IEventDetailProps) => setEventDetail(data))
            .catch((error: string) => setError(error))
            .finally(() => handleLoading(false));
    }, []);

    return (
        <>
            {!eventDetail ? null : (
                <Block padding={sizes.margin}>
                    {/* title */}
                    <Block flex={0} align="center" paddingBottom={sizes.s}>
                        <Text h4 center>
                            {eventDetail?.name}
                        </Text>
                    </Block>
                    {/* Image */}
                    <Block flex={0} paddingVertical={sizes.padding} style={styles.image_container}>
                        {eventDetail?.image ? (
                            <Image
                                source={{ uri: eventDetail?.image }}
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
                        <IconRow
                            name={'houzz'}
                            text={t('events.detail.label.food', { food: eventDetail?.food })}
                        />
                        <IconRow
                            name={'bed'}
                            text={t('events.detail.label.host', { host: eventDetail.host })}
                        />
                    </Block>
                </Block>
            )}
        </>
    );
}
