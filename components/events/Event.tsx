import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTranslation } from '../../hooks';
import { EventsScreenNavigationProp } from '../../navigation/types';
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

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('EventDetailScreen', {
                    eventId: props.id,
                })
            }
        >
            <Text h5 bold>
                {i18n.l('currency', '2009')}
            </Text>
            <Text p>{props.description}</Text>
        </TouchableOpacity>
    );
};

export default Event;
