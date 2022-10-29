import { Animated, Image, StyleSheet, Text, TouchableOpacity,View } from 'react-native'

// import Colors from '../constants/Colors'
import React from 'react'

export interface MainButtonProps {
    onPress?(): void
    title: string
    disabled?: boolean
    styleText?: {}
    elevation?: Animated.Value
}

export default ({ onPress, title, disabled = false, styleText = {}, elevation }: MainButtonProps) => {
    return (
        <Animated.View style={{ elevation: elevation ? elevation : 8 }}>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.loginButtonContainer, {
                    backgroundColor: disabled ? '#787878' : '#225D85'
                }]}
                disabled={disabled}>
                <Text allowFontScaling={false} style={[styles.loginButtonText, styleText]} numberOfLines={1}>{title}</Text>
            </TouchableOpacity>
        </Animated.View>
    )
}


export const MainButtonIcon = ({ onPress, title, disabled = false, styleText = {}, image = null, backgroundColor = '#225D85' }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.loginButtonContainer, { backgroundColor: disabled ? '#787878' : backgroundColor, paddingVertical: 6, }]}
            disabled={disabled}>
            <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                {
                    image ?
                        (
                            <Image
                                source={image}
                                style={[{ width: 15, height: 15, resizeMode: "contain" }]}
                            />
                        )
                        : (null)
                }
                <Text allowFontScaling={false} style={[styles.loginButtonText, styleText]} numberOfLines={1}>

                    &nbsp;{title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    loginButtonContainer: {
        // elevation: 4,
        backgroundColor: '#225D85',
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'center',
    },
    loginButtonText: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        textAlign: 'center',
        justifyContent: 'center',
        //alignItems:'center',
        //alignContent:'center',
        //justifyContent:'center',
        textAlignVertical: 'center',

    }
})
