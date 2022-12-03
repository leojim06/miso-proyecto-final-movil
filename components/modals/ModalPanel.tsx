import React from 'react';
import { Image, KeyboardAvoidingView, Modal, Platform, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks';
// import {Image} from '../components';

const ModalPanel = (props) => {
    const { colors, sizes, assets } = useTheme();

    return (
        <Modal
            transparent={true}
            animationType={'fade'}
            visible={props.visible}
            onRequestClose={() => {}}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={Platform.select({
                    ios: 'padding',
                    android: undefined,
                })}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        backgroundColor: '#00000040',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}
                    >
                        {props.payLoan ? (
                            <View></View>
                        ) : (
                            <TouchableOpacity
                                onPress={() => props.closeModal()}
                                style={{
                                    width: 30,
                                    height: 30,
                                    margin: 10,
                                    borderRadius: 50,
                                    backgroundColor: colors.tertiary,
                                    justifyContent: 'center',
                                }}
                            >
                                <Image
                                    source={assets.close}
                                    style={[
                                        {
                                            width: 20,
                                            height: 20,
                                            margin: 5,
                                            resizeMode: 'contain',
                                        },
                                    ]}
                                />
                                {/* <Image source={assets.close} color={colors.white} /> */}
                            </TouchableOpacity>
                        )}
                    </View>
                    <View
                        style={{
                            backgroundColor: colors.card,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 16,
                            paddingBottom: 15,
                            maxHeight: sizes.height - 100,
                        }}
                    >
                        {props.children}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default React.memo(ModalPanel);
