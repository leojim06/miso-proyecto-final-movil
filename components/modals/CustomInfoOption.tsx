import React from 'react'
import { View, TouchableOpacity, StyleSheet, PixelRatio, Text } from 'react-native'

// import Colors from '../../../constants/Colors'
// import { LabelText14 } from '../../StyledText'

const CustomInfoOption = (props) => {
    return (
        <TouchableOpacity onPress={props.item.onPress}>
        <View style={[infoActionStyles.layoutWitIcon, { marginVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F9A31A' }]}>
            <View style={{ flexDirection: 'row' }}>
                {props.item.icon}
                <Text style={{ marginLeft: 10, alignSelf: 'center' }}>{props.item.text}</Text>
            </View>
            {props.item.actionIcon}
        </View>
        </TouchableOpacity>
    )
}

const infoActionStyles = StyleSheet.create({
    container: {
        backgroundColor: 'tomato',
        borderWidth: 1
    },
    layoutWitIcon: {
        flexDirection: 'row',
        marginHorizontal: 16 / PixelRatio.get(),
        marginTop: 16 / PixelRatio.get(),
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default CustomInfoOption
