import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageStyle, Modal, StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks';
import Button from '../Button';
import Text from '../Text';

export type ICustomPanel = {
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: any;
    title: string;
    message: string;
    confirmButtonTitle?: string;
    cancelButtonTitle?: string;
    onConfirmPress?: () => void;
    onCancelPress?: () => void;
};

const CustomModal = (props: ICustomPanel) => {
    // hooks from app
    const { assets, sizes } = useTheme();
    // hooks for component
    const [modalHeight, setModalHeight] = useState<number>(0);

    const logos = {
        success: assets.success,
        warning: assets.warning,
        error: assets.error,
        info: assets.info,
    };

    const onLayout = useCallback(({ nativeEvent: { layout } }) => {
        setModalHeight(layout.height);
    }, []);

    useEffect(() => {}, [modalHeight]);

    const modalContainer: StyleProp<ViewStyle> = {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#00000040',
    };

    const transparent: StyleProp<ViewStyle> = {
        backgroundColor: 'transparent',
        height: (sizes.panelIconHeight + sizes.panelIconBorder) / 2,
    };

    const modalContent: StyleProp<ViewStyle> = {
        backgroundColor: 'white',
        paddingTop: (sizes.panelIconHeight + sizes.panelIconBorder) / 2,
        paddingHorizontal: sizes.padding,
        borderTopRightRadius: sizes.cardRadius,
        borderTopLeftRadius: sizes.cardRadius,
    };

    const iconContainer: StyleProp<ViewStyle> = {
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center',
        width: sizes.panelIconHeight + sizes.panelIconBorder,
        height: sizes.panelIconHeight + sizes.panelIconBorder,
        borderRadius: 50,
        bottom: Math.ceil(modalHeight) - (sizes.panelIconHeight + sizes.panelIconBorder),
        zIndex: 1,
    };

    const icon: StyleProp<ImageStyle> = {
        height: sizes.panelIconHeight,
        width: sizes.panelIconHeight,
        borderRadius: 50,
    };

    const titleContent: StyleProp<ViewStyle> = {
        paddingBottom: sizes.padding,
    };

    const messageContent: StyleProp<ViewStyle> = {
        paddingBottom: sizes.padding,
    };

    const buttonContainer: StyleProp<ViewStyle> = {
        alignItems: 'stretch',
        paddingBottom: sizes.padding,
    };

    const row: StyleProp<ViewStyle> = { flexDirection: 'row' };

    const buttonContent: StyleProp<ViewStyle> = { flex: 1, marginHorizontal: sizes.margin };

    return (
        <Modal transparent={true} animationType={'fade'} visible={props.isVisible}>
            {/* Modal container */}
            <View style={modalContainer}>
                <View onLayout={onLayout}>
                    {/* Modal content */}
                    {/*     - transparent section header */}
                    <View style={transparent}></View>
                    {/*     - icon section header */}
                    <View style={iconContainer}>
                        <Image source={logos[props.type]} style={icon} />
                    </View>
                    {/*     - content title, messsage and buttons */}
                    <View style={modalContent}>
                        <View style={titleContent}>
                            <Text h4 center>
                                {props.title}
                            </Text>
                        </View>
                        <View style={messageContent}>
                            <Text p>{props.message}</Text>
                        </View>
                        <View style={buttonContainer}>
                            {props.type === 'warning' ? (
                                <View style={row}>
                                    <View style={buttonContent}>
                                        <Button success onPress={props.onConfirmPress}>
                                            <Text bold white transform="uppercase">
                                                {props.confirmButtonTitle}
                                            </Text>
                                        </Button>
                                    </View>
                                    <View style={buttonContent}>
                                        <Button danger onPress={props.onCancelPress}>
                                            <Text bold white transform="uppercase">
                                                {props.cancelButtonTitle}
                                            </Text>
                                        </Button>
                                    </View>
                                </View>
                            ) : (
                                <Button primary onPress={props.onConfirmPress}>
                                    <Text bold white transform="uppercase">
                                        {props.confirmButtonTitle}
                                    </Text>
                                </Button>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;
