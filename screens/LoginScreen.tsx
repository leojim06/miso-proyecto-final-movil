import React, { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { Block, Text } from '../components';
import LoginForm from '../components/forms/loginForm';
import CustomModal, { ICustomPanel } from '../components/modals/CustomModal';
import { IUser } from '../constants/types';
import { useTheme, useTranslation, useData } from '../hooks';
import useCatalogEndpoint from '../services/api/useCatalogEndpoint';
import useLoginEndpoint from '../services/api/useLoginEndpoint';
import { timeout } from '../utils/timeout';
import usePushNotification from '../services/notification/usePushNotification';

export default function LoginScreen() {
    // hooks for screen
    const [modal, setModal] = useState<ICustomPanel>({
        isVisible: false,
        type: 'success',
        title: '',
        message: '',
    });
    const [expoPushToken, setExpoPushToken] = useState<string | undefined>(undefined);
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    // hooks from app
    const { handleUser, handleLoading, suscriptionCatalog, trainingLevelCatalog } = useData();
    const { sizes } = useTheme();
    const { t } = useTranslation();
    const { loadLogin } = useLoginEndpoint();
    const { loadSuscriptions, loadTrainingLevels } = useCatalogEndpoint();
    const { registerForPushNotificationsAsync } = usePushNotification();

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
        if (!suscriptionCatalog || !trainingLevelCatalog) {
            await Promise.all([loadSuscriptions(), loadTrainingLevels()]);
        }
    };

    useEffect(() => {
        registerForPushNotificationsAsync()
            .then((token: string | undefined) => setExpoPushToken(token))
            .catch((error: string) => console.error('Notification error: ', error));

        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                console.log('Notification: ', notification);
                setNotification(notification);
            }
        );

        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log('Response notification: ', response);
            }
        );

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

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
