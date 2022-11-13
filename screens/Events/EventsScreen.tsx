import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Block, Text } from '../../components';
import Event, { IEventProps } from '../../components/events/Event';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import DataNotFound from '../../components/utils/DataNotFound';
import { useTheme, useTranslation } from '../../hooks';
import useEventEndpoint from '../../services/api/useEventEndpoint';

export default function EventsScreen() {
    // hooks for screen
    const [mySuggestedEvents, setMySuggestedEvents] = useState<IEventProps[]>([]);
    const [isEventsLoading, setIsEventsLoading] = useState<boolean>(false);
    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();
    const { loadMySuggestedEvents } = useEventEndpoint();
    const isFocused = useIsFocused();

    useEffect(() => {
        setMySuggestedEvents([]);
        setIsEventsLoading(true);

        loadMySuggestedEvents('10', false)
            .then((data: IEventProps[]) => setMySuggestedEvents(data))
            .catch((error: string) => {})
            .finally(() => setIsEventsLoading(false));
    }, [isFocused]);

    return (
        <Block safe padding={sizes.padding}>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3 center>
                    {t('events.label.title')}
                </Text>
            </Block>
            <Block flex={1} marginBottom={sizes.xl}>
                <FlatList
                    data={mySuggestedEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <Event props={item} path="Events" />}
                    ListEmptyComponent={
                        isEventsLoading ? (
                            <LoadingPlaceholder />
                        ) : (
                            <DataNotFound title={t('events.warning.mySuggestedEventsNotFound')} />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </Block>
        </Block>
    );
}
