import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageURISource, View } from 'react-native';
import { Image, Text } from '../../components';
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
    const [isEventDetailLoading, setIsEventDetailLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    // hoots from app
    const route = useRoute<EventDetailScreenRouteProp>();
    const { eventId } = route.params;
    const { t } = useTranslation();
    const { handleLoading } = useData();
    const { assets, sizes, colors } = useTheme();
    const { loadEventDetail } = useEventEndpoint();

    useEffect(() => {
        setEventDetail(undefined);
        handleLoading(true);

        loadEventDetail(eventId, true)
            .then((data: any) => setEventDetail(data))
            .catch((error: string) => setError(error))
            .finally(() => handleLoading(false));
    }, []);

    return (
        <View>
            <View>
                <Text h3>{t('events.detail.title')}</Text>
                <Text h4>{eventDetail?.name}</Text>
            </View>
            <View>
                {/* <Image
                    radius={sizes.s}
                    width={sizes.xl}
                    height={sizes.xl}
                    source={{ uri: eventDetail?.image ? eventDetail?.image : String(assets.landscapePlaceholder) }}
                    style={{ backgroundColor: colors.white }}
                /> */}
            </View>

            <View>
                <FontAwesome size={30} name={'map-marker'} />
                <Text p>{eventDetail?.location}</Text>

                <FontAwesome size={30} name={'calendar'} />
                <Text p>{eventDetail?.time?.start?.toString()}</Text>

                <FontAwesome size={30} name={'clock-o'} />
                <Text p>{eventDetail?.time?.end?.toString()}</Text>

                <Text p>{eventDetail?.description}</Text>

                <FontAwesome size={30} name={'houzz'} />
                <Text p>{eventDetail?.food}</Text>

                <FontAwesome size={30} name={'bed'} />
                <Text p>{eventDetail?.host}</Text>
            </View>
        </View>
    );
}
