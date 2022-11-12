import React, { useEffect, useState } from 'react';
import { Block, Text } from '../../components';
import { IEventProps } from '../../components/events/Event';
import { useTheme, useTranslation } from '../../hooks';
import useEventEndpoint from '../../services/api/useEventEndpoint';

export default function ProgressEventScreen() {
    // hooks for screen
    const [myProgressEvents, setMyProgressEvents] = useState<IEventProps[]>([]);
    const [isMyEProgressEventsLoading, setIsMyEProgressEventsLoading] = useState<boolean>(false);

    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();
    const { loadMyEventProgress } = useEventEndpoint();

    useEffect(() => {
        setMyProgressEvents([]);
        setIsMyEProgressEventsLoading(true);
    });

    return (
        <Block>
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3 center>
                    {t('progress.label.title')}
                </Text>
            </Block>
            <Block flex={1} marginBottom={sizes.xl}>
                <Text>Eventos</Text>
            </Block>
        </Block>
    );
}
