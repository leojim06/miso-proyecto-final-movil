import { useNavigation } from '@react-navigation/native';
import { DateTime } from 'i18n-js/typings';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme, useTranslation } from '../../hooks';
import { EventsScreenNavigationProp } from '../../navigation/types';
import { ProgressEventScreenNavigationProp } from '../../navigation/types/progressEventStackNavigatorParamList';
import Block from '../Block';
import Text from '../Text';

export interface IEventProps {
    id: string;
    date?: DateTime;
    name?: string;
    description?: string;
}

const Event = ({ props, path }: { props: IEventProps; path: 'Events' | 'Progress' }) => {
    // hooks from app
    const { i18n } = useTranslation();
    const eventNavigation = useNavigation<EventsScreenNavigationProp>();
    const progressNavigation = useNavigation<ProgressEventScreenNavigationProp>();
    const { colors, sizes } = useTheme();

    return (
        <Block color={colors.card}>
            <TouchableOpacity
                onPress={() => {
                    if (path === 'Events') {
                        eventNavigation.navigate('EventDetailScreen', {
                            eventId: props.id,
                        });
                    } else {
                        progressNavigation.navigate('ProgressEventDetailScreen', {
                            eventId: props.id,
                        });
                    }
                }}
            >
                <Block outlined info paddingHorizontal={sizes.sm}>
                    <Text h5 bold>
                        {/* {i18n.l("time.formats.short", "2019-11-09T18:10:34")} */}
                        {/* {i18n.strftime(props.date ?? Date.now(), "%d/%m/%Y")} */}
                        {i18n.toTime('date.formats.short', props.date ?? Date.now())}
                    </Text>
                    <Text p semibold>
                        {props.name}
                    </Text>
                    <Text p>{props.description}</Text>
                </Block>
            </TouchableOpacity>
        </Block>
    );
};

export default Event;
