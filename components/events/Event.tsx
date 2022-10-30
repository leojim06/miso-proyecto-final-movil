import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTranslation } from '../../hooks';
import Text from '../Text';

export interface IEventProps {
    id: number;
    date?: Date;
    name?: string;
    description?: string;
    onPress?: () => void;
}

const Event = (props: IEventProps) => {
    const { i18n } = useTranslation();

    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text h5 bold>
                {i18n.l("currency", "2009") }
            </Text>
            <Text p>{props.description}</Text>
        </TouchableOpacity>
    );
};

export default Event;
