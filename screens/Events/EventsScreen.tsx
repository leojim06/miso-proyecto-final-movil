import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '../../components';
import Event, { IEventProps } from '../../components/events/Event';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import { useTranslation } from '../../hooks';
import useEventEndpoint from '../../services/api/useEventEndpoint';

export default function EventsScreen() {
    // hooks for screen
    const [mySuggestedEvents, setMySuggestedEvents] = useState<IEventProps[]>([]);
    const [isEventsLoading, setIsEventsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    // hooks from app
    const { t } = useTranslation();
    const { loadMySuggestedEvents } = useEventEndpoint();

    useEffect(() => {
        setMySuggestedEvents([]);
        setIsEventsLoading(true);

        loadMySuggestedEvents('10', true)
            .then((data: IEventProps[]) => setMySuggestedEvents(data))
            .catch((error: string) => setError(error))
            .finally(() => setIsEventsLoading(false));
    }, []);

    return (
        <View>
            <View>
                <Text h3>{t('events.label.title')}</Text>
            </View>
            <View>
                <FlatList
                    data={mySuggestedEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <Event {...item} />}
                    ListEmptyComponent={
                        isEventsLoading ? (
                            <LoadingPlaceholder />
                        ) : (
                            <Text>{t('events.warning.mySuggestedEventsNotFound')}</Text>
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}
