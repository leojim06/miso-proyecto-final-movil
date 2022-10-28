import React, { useState } from 'react';
import { Block, ModalPanel, Text } from '../components';
import LoginForm from '../components/forms/loginForm';
import { useTheme, useTranslation, useData } from '../hooks';
import useLoginEndpoint from '../services/api/useLoginEndpoint';

export default function LoginScreen() {
    const [showModal, setModal] = useState(false);
    const [error, setError] = useState();
    const { handleUser, handleLoading, handleInfoModalPanel } = useData();
    const { colors, sizes } = useTheme();
    const { t } = useTranslation();
    const { loadLogin } = useLoginEndpoint();

    const handleSubmit = (values: any) => {
        handleLoading(true);

        loadLogin({username: values.email,password: values.password,})
            .then((user) => handleUser(user))
            .catch((error) => handleInfoModalPanel({
                isVisible:true,
                text: error,
                onCloseModal: () =>{}
            }))
            .finally(() => handleLoading(false))

        // try {
        //     const response = await loadLogin({
        //         username: values.email,
        //         password: values.password,
        //     });
        //     handleUser(response);
        // } catch (error) {
        //     handleInfoModalPanel({
        //         isVisible=true,
        //         text: error,
        //         onCloseModal: 
        //     })
        // } finally {
        //     handleLoading(false);
        // }
    };

    return (
        <Block safe>
            <Block flex={1} padding={sizes.md} color={colors.card} keyboard>
                <Text h3>{t('login.label.title')}</Text>
                <LoginForm onSubmit={(values) => handleSubmit(values)} />
            </Block>
            {/* <ModalPanel visible={showModal} closeModal={() => setModal(false)}>
                <Text h5>{error}</Text>
            </ModalPanel> */}
        </Block>
    );
}
