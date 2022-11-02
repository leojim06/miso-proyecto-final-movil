import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme, useTranslation } from '../../hooks';
import { EventsScreenNavigationProp } from '../../navigation/types';
import Block from '../Block';
import Text from '../Text';

export interface IEventProps {
    id: string;
    date?: Date;
    name?: string;
    description?: string;
}

const Event = (props: IEventProps) => {
    // hooks from app
    const { i18n } = useTranslation();
    const navigation = useNavigation<EventsScreenNavigationProp>();
    const { colors, sizes } = useTheme();

    return (
        <Block color={colors.card} marginVertical={sizes.sm} radius={sizes.sm} shadow={true}>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('EventDetailScreen', {
                        eventId: props.id,
                    })
                }
            >
                <Block padding={sizes.sm}>
                    <Text h5 bold>
                        {props.name}
                    </Text>
                    <Text p semibold>
                        {i18n.toTime('date.formats.short', props.date ?? Date.now())}
                    </Text>
                    <Text p>{props.description}</Text>
                </Block>
            </TouchableOpacity>
        </Block>
    );
};

export default Event;
