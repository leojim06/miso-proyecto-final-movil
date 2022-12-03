import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { useTranslation } from '../../hooks';

const usePushNotification = () => {
    const { t } = useTranslation();

    const registerForPushNotificationsAsync = async (): Promise<string | undefined> => {
        let token: string | undefined = undefined;

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatue } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatue;
            if (existingStatue !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert(t('app.notifications.notPermissions'));
                return token;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.info(token);
            // setear token en algun lugar de la app
        } else {
            alert(t('app.notifications.notPhysicalDevice'));
        }

        return token;
    };

    return { registerForPushNotificationsAsync };
};

export default usePushNotification;
