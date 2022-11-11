import React, { useState } from 'react';
import { Block, Text } from '../components';
import LoginForm from '../components/forms/loginForm';
import CustomModal, { ICustomPanel } from '../components/modals/CustomModal';
import { IUser } from '../constants/types';
import { useTheme, useTranslation, useData } from '../hooks';
import useCatalogEndpoint from '../services/api/useCatalogEndpoint';
import useLoginEndpoint from '../services/api/useLoginEndpoint';
import { timeout } from '../utils/timeout';

export default function LoginScreen() {
    // hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });

    // hooks from app
    const { handleUser, handleLoading, suscriptionCatalog, trainingLevelCatalog } = useData();
    const { sizes } = useTheme();
    const { t } = useTranslation();
    const { loadLogin } = useLoginEndpoint();
    const { loadSuscriptions, loadTrainingLevels } = useCatalogEndpoint();

    const handleSubmit = (values: any) => {
        handleLoading(true);

        loadLogin({ username: values.email, password: values.password })
            .then((user: IUser) => {
                handleUser(user);
                handleCatalogs().then(() => timeout(600));
            })
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

    const handleCatalogs = async () => {
        console.group('Catalogos');
        console.info(JSON.stringify(suscriptionCatalog, null, 3));
        console.info(JSON.stringify(trainingLevelCatalog, null, 3));
        if (!suscriptionCatalog || !trainingLevelCatalog) {
            console.warn('recuperando data de catalogos')
            await Promise.all([loadSuscriptions(), loadTrainingLevels()]);
        }
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
