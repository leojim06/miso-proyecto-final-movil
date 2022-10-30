import React, { useEffect, useState } from 'react';
import { ImageURISource, View } from 'react-native';
import { Image, Text } from '../../components';
import { useData, useTheme, useTranslation } from '../../hooks';
import useEventEndpoint from '../../services/api/useEventEndpoint';

export interface IEventDetailProps {
    id: string;
    image: ImageURISource;
    location: string;
    time: {
        start: Date;
        end: Date;
    };
    name: string;
    description: string;
    food: string;
    host: string;
}

export default function EventDetailScreen({ route }) {
    // properties
    const { eventId } = route.params;
    // hooks for screen
    const [eventDetail, setEventDetail] = useState<IEventDetailProps>();
    const [isEventDetailLoading, setIsEventDetailLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    // hoots from app
    const { t } = useTranslation();
    const { handleLoading } = useData();
    const { assets } = useTheme();
    const { loadEventDetail } = useEventEndpoint();

    useEffect(() => {
        setEventDetail(undefined);
        handleLoading(true)

        loadEventDetail(eventId, true)
            .then((data: any) => setEventDetail(data))
            .catch((error: string) => setError(error))
            .finally(() => handleLoading(false));
            
    }, []);

    return (
        <View>
            <View>
                <Text>{t('event.detail.title')}</Text>
            </View>
            <View>
                <Image source={eventDetail?.image ?? assets.landscapePlaceholder } />
            </View>
                
            <Text>{eventId}</Text>
        </View>
    );
}
