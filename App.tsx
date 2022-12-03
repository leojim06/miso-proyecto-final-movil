import { StatusBar } from 'expo-status-bar';
import { DataProvider } from './hooks/useData';
import Navigation from './navigation';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    return (
        <DataProvider>
            <Navigation />
            <StatusBar />
        </DataProvider>
    );
}
