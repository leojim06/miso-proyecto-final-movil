import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Block, Image, Text } from '../../components';
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
                <Block scroll margin={sizes.margin}>
                    {/* title */}
                    <Block flex={0} align="center" paddingBottom={sizes.s}>
                        <Text h4 center>
                            {eventDetail?.name}
                        </Text>
                    </Block>
                    {/* Image */}
                    <Block>
                        {/* <Image
                    radius={sizes.s}
                    width={sizes.xl}
                    height={sizes.xl}
                    source={{ uri: eventDetail?.image ? eventDetail?.image : String(assets.landscapePlaceholder) }}
                    style={{ backgroundColor: colors.white }}
                /> */}
                    </Block>

                    {/* Content */}
                    <Block>
                        <Block row align="center">
                            <FontAwesome size={30} name={'map-marker'} />
                            <Text p paddingLeft={sizes.s}>
                                {eventDetail?.location}
                            </Text>
                        </Block>

                        <Block row align="center">
                            <FontAwesome size={30} name={'calendar'} />
                            <Text p paddingLeft={sizes.s}>
                                {i18n.toTime('date.formats.short', eventDetail?.time?.start ?? Date.now())}
                            </Text>
                        </Block>

                        <Block row align="center">
                        <FontAwesome size={30} name={'clock-o'} />
                            <Text p paddingLeft={sizes.s}>
                                {i18n.toTime('date.formats.short', eventDetail?.time?.end ?? Date.now())}
                            </Text>
                        </Block>

                        <Block row align="center">
                            <Text p paddingLeft={sizes.s}>
                                {eventDetail?.description}
                            </Text>
                        </Block>

                        <Block row align="center">
                            <FontAwesome size={30} name={'houzz'} />
                            <Text p paddingLeft={sizes.s}>
                            {t('events.detail.label.food', {food: eventDetail?.food})}
                            </Text>
                        </Block>

                        <Block row align="center">
                            <FontAwesome size={30} name={'bed'} />
                            <Text p paddingLeft={sizes.s}>
                                {t('events.detail.label.host', {host: eventDetail.host})}
                            </Text>
                        </Block>
                    </Block>
                </Block>
            )}
        </>
    );
}
