import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import styles from '../assets/style/styles';
import CustomModal, { ICustomPanel } from '../components/modals/CustomModal';
import { useData, useTheme } from '../hooks';

export default function BasicScreen() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const modalInfo: ICustomPanel = {
        type: 'success',
        isVisible: isVisible,
        setIsVisible: setIsVisible,
        title: 'Titulo del modal',
        message: 'Mensaje informativo del modal, el cual puede tener varios renglones',
        confirmButtonTitle: 'Aceptar',
        cancelButtonTitle: 'Cancelar',
        onConfirmPress: () => {
            setIsVisible(!setIsVisible);
        },
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hola mundo</Text>
            <Button
                title="Abrir modal"
                onPress={() => {
                    setIsVisible(!isVisible);
                }}
            />
            <CustomModal
                type={'warning'}
                isVisible={isVisible}
                title={'Titulo del modal'}
                message={'Mensaje informativo del modal, el cual puede tener varios renglones'}
                confirmButtonTitle={'Aceptar'}
                cancelButtonTitle={'Cancelar'}
                onConfirmPress={() => setIsVisible(false)}
            />
        </View>
    );
}
