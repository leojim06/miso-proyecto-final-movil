import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Block, Input, ModalPanel, Text } from '../components';
import LoginForm from '../components/forms/loginForm';
import { IUser } from '../constants/types';
import { useTheme, useTranslation, useData } from '../hooks';
import useLoginEndpoint from '../services/api/useLoginEndpoint';

export default function LoginScreen() {
    const [showModal, setModal] = useState(false);
    const [error, setError] = useState<string>();
    const { handleUser, handleLoading } = useData();
    const { colors, sizes } = useTheme();
    const { t } = useTranslation();
    const { loadLogin } = useLoginEndpoint();

    const handleSubmit = (values: any) => {
        handleLoading(true);

        loadLogin({ username: values.email, password: values.password })
            .then((user: IUser) => handleUser(user))
            .catch((error: string) => {
                setError(error);
                setModal(true);
            })
            .finally(() => handleLoading(false));
    };

    return (
        <Block justify='center'>
            <Block flex={0} padding={sizes.md}>
                <Text h3>{t('login.label.title')}</Text>
                <LoginForm onSubmit={(values) => handleSubmit(values)} />
            </Block>
            <ModalPanel visible={showModal} closeModal={() => setModal(false)}>
                <Text h5>{error}</Text>
            </ModalPanel>
        </Block>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'dodgerblue',
    },
});
