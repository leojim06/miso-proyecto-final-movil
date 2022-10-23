import { StatusBar } from 'expo-status-bar';
import { DataProvider } from './hooks/useData';
import Navigation from './navigation';

export default function App() {
    return (
        <DataProvider>
            <Navigation />
            <StatusBar />
        </DataProvider>
    );
}
