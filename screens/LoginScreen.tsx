import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Block, Input, ModalPanel, Text } from '../components';
import LoginForm from '../components/forms/loginForm';
import CustomModal, { ICustomPanel } from '../components/modals/CustomModal';
import { IUser } from '../constants/types';
import { useTheme, useTranslation, useData } from '../hooks';
import useLoginEndpoint from '../services/api/useLoginEndpoint';

export default function LoginScreen() {
    // hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });

    // hooks from app
    const { handleUser, handleLoading } = useData();
    const { sizes } = useTheme();
    const { t } = useTranslation();
    const { loadLogin } = useLoginEndpoint();

    const handleSubmit = (values: any) => {
        handleLoading(true);

        loadLogin({ username: values.email, password: values.password })
            .then((user: IUser) => handleUser(user))
            .catch((error: string) => {
                setModal({
                    isVisible: true,
                    title: t('login.warning.modalTitle'),
                    message: error,
                    type: 'error',
                    confirmButtonTitle: t('login.warning.modalButton'),
                    onConfirmPress: () => setModal({ ...modal, isVisible: false }),
                });
            })
            .finally(() => handleLoading(false));
    };

    return (
        <Block justify="center">
            <Block flex={0} padding={sizes.md}>
                <Text h3>{t('login.label.title')}</Text>
                <LoginForm onSubmit={(values) => handleSubmit(values)} />
            </Block>
            <CustomModal {...modal} />
        </Block>
    );
}
