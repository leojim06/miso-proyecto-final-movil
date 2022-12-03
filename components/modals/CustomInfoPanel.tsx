import { Image, Modal, StyleSheet, Text, View } from 'react-native';
// import MainButton, { MainButtonIcon } from "../../MainButton";
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import MainButton, { MainButtonIcon } from './MainButton';

// import Colors from "../../../constants/Colors";
// import { textStyles } from "../../../constants/Styles";

export type InfoPanelProps = {
    type: 'success' | 'error' | 'warn' | 'info';
    isVisible: boolean;
    title: string;
    message: string;
    acceptButtonTitle?: string;
    confirmButtonTitle?: string;
    cancelButtonTitle?: string;
    onAcceptPress?: () => void;
    onConfirPress?: () => void;
    onCancelPress?: () => void;
    children?: ReactNode;
    tempInfo?: string;
};

const CustomInfoPanel = (props: InfoPanelProps) => {
    const [modalHeight, setModalHeight] = useState(0);

    const onLayout = useCallback(({ nativeEvent: { layout } }) => {
        setModalHeight(layout.height);
    }, []);

    useEffect(() => {}, [modalHeight]);

    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={props.isVisible}
            onRequestClose={() => {}}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: '#00000040',
                }}
            >
                <View onLayout={onLayout}>
                    <View style={infoPanelStyles().transparence}></View>
                    <View style={infoPanelStyles({ height: modalHeight }).infoIconContainer}>
                        {props.type === 'success' || props.type === 'info' ? (
                            <Image
                                source={require('../../assets/icons/aprobado.png')}
                                style={infoPanelStyles().image}
                            />
                        ) : props.type === 'warn' ? (
                            <Image
                                source={require('../../assets/icons/pendiente.png')}
                                style={infoPanelStyles().image}
                            />
                        ) : (
                            <Image
                                source={require('../../assets/icons/denegado.png')}
                                style={infoPanelStyles().image}
                            />
                        )}
                    </View>
                    <View style={infoPanelStyles().content}>
                        <View
                            style={{
                                position: 'absolute',
                                alignSelf: 'flex-end',
                                marginTop: 22,
                                paddingRight: 17,
                            }}
                        >
                            {props.tempInfo ? (
                                <Text style={{ color: '#ABABAB', fontSize: 18 }}>
                                    {props.tempInfo}
                                </Text>
                            ) : null}
                        </View>
                        <View style={infoPanelStyles().titleContent}>
                            <Text allowFontScaling={false} style={[infoPanelStyles(props).title]}>
                                {props.title}
                            </Text>
                        </View>
                        <View style={infoPanelStyles().messageContent}>
                            <Text
                                allowFontScaling={false}
                                style={[
                                    infoPanelStyles().message,
                                    props.type === 'info'
                                        ? { textAlign: 'left' }
                                        : { textAlign: 'center' },
                                ]}
                            >
                                {props.message}
                            </Text>
                        </View>
                        {props.children}
                        <View style={infoPanelStyles().buttonContent}>
                            {props.type === 'error' ||
                            props.type === 'success' ||
                            props.type === 'info' ? (
                                <MainButton
                                    onPress={props.onAcceptPress}
                                    title={props.acceptButtonTitle || ''}
                                />
                            ) : (
                                <View style={infoPanelStyles().contentBtn}>
                                    <View style={{ flex: 1 }}>
                                        <MainButtonIcon
                                            title={props.cancelButtonTitle || ''}
                                            onPress={props.onCancelPress}
                                            backgroundColor={'#D91A32'}
                                        />
                                    </View>
                                    <View style={{ width: 15 }} />
                                    <View style={{ flex: 1 }}>
                                        <MainButtonIcon
                                            title={props.confirmButtonTitle || ''}
                                            onPress={props.onConfirPress}
                                            backgroundColor={'#2E7480'}
                                        />
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const ICON_HEIGHT = 52;
const BORDER_HEIGHT = 7;

function infoPanelStyles(props?) {
    return StyleSheet.create({
        transparence: {
            height: (ICON_HEIGHT + BORDER_HEIGHT) / 2,
            backgroundColor: 'transparent',
        },
        infoIconContainer: {
            justifyContent: 'center',
            backgroundColor: '#FFF',
            position: 'absolute',
            alignSelf: 'center',
            width: ICON_HEIGHT + BORDER_HEIGHT,
            height: ICON_HEIGHT + BORDER_HEIGHT,
            borderRadius: 50,
            bottom: Math.ceil(props?.height) - (ICON_HEIGHT + BORDER_HEIGHT),
            zIndex: 10,


            
        },
        content: {
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: '#FFF',
            paddingHorizontal: 16,
            paddingTop: (ICON_HEIGHT + BORDER_HEIGHT) / 2,
        },
        titleContent: {
            justifyContent: 'center',
            paddingVertical: 20,
        },
        title: {
            textAlign: 'center',
            color:
                props?.type === 'success'
                    ? '#60B200'
                    : props?.type === 'warn'
                    ? '#F9A31A'
                    : props?.type === 'info'
                    ? '#F58525'
                    : '#D91A32',
        },
        messageContent: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        message: {
            textAlign: 'center',
            paddingBottom: 20,
            paddingHorizontal: 16,
            // fontFamily: 'Avenir Next Regular',
        },
        image: {
            width: ICON_HEIGHT,
            height: ICON_HEIGHT,
            alignSelf: 'center',
        },
        buttonContent: {
            justifyContent: 'center',
            alignItems: 'stretch',
            paddingBottom: 15,
        },
        contentBtn: {
            // flex: 1,
            flexDirection: 'row',
        },
    });
}

export default CustomInfoPanel;
