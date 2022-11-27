import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { IRadioButtonsProps } from '../constants/types';
import { Text } from './';

const RadioButtons = ({
    id = 'RadioButtons',
    children,
    key,
    item,
    checked,
    setChecked,
}: IRadioButtonsProps) => {
    const radioPress = () => {
        setChecked(item?.id);
    };
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
            }}
        >
            <TouchableOpacity onPress={radioPress}>
                <View
                    style={[
                        {
                            height: 24,
                            width: 24,
                            borderRadius: 12,
                            borderWidth: 2,
                            borderColor: '#000',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    ]}
                >
                    {checked == item?.id ? (
                        <View
                            style={{
                                height: 12,
                                width: 12,
                                borderRadius: 6,
                                backgroundColor: '#000',
                            }}
                        />
                    ) : null}
                </View>
            </TouchableOpacity>
            {children}
        </View>
    );
};

export default RadioButtons;
