import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text } from '../';

const IconRow = ({
    name,
    color,
    text,
}: {
    name?: React.ComponentProps<typeof FontAwesome>['name'];
    color?: string;
    text?: string;
}) => {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            <View style={{ width: 36, alignItems: 'center' }}>
                <FontAwesome size={24} name={name} color={color} />
            </View>
            <View>
                <Text p>{text}</Text>
            </View>
        </View>
    );
};

export default IconRow;
