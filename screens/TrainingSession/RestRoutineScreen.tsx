import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, FlatList } from 'react-native';
import { Block, Text } from '../../components';
import LoadingPlaceholder from '../../components/LoadingPlaceholder';
import RestRoutine from '../../components/restRoutine/RestRoutine';
import DataNotFound from '../../components/utils/DataNotFound';
import { useTheme, useTranslation } from '../../hooks';
import {
    TrainingSessionScreenNavigationProp,
} from '../../navigation/types/trainingSessionStackNavigatorParamList';
import useRestRoutinesEndpoint from '../../services/api/useRestRoutinesEndpoint';

export interface IRestRoutine {
    id: string;
    nombre: string;
    descripcion: string;
}

export default function RestRoutineScreen() {
    // hooks for screen
    const [myRestRoutines, setMyRestRoutines] = useState<IRestRoutine[]>([]);
    const [isMyRestRoutinesLoading, setIsMyRestRoutinesLoading] = useState<boolean>(false);

    // hooks from app
    const { t } = useTranslation();
    const { sizes } = useTheme();
    const { loadRestRoutines } = useRestRoutinesEndpoint();
    const navigation = useNavigation<TrainingSessionScreenNavigationProp>();

    const handleBackButtonClick = () => {
        navigation.navigate('TrainingSessionScreen');
        return true;
    };

    useEffect(() => {
        setMyRestRoutines([]);
        setIsMyRestRoutinesLoading(true);

        loadRestRoutines('10', true)
            .then((data: IRestRoutine[]) => setMyRestRoutines(data))
            .catch((error: string) => {})
            .finally(() => setIsMyRestRoutinesLoading(false));
    }, []);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }, []);

    return (
        <Block safe padding={sizes.padding}>
            {/* title */}
            <Block flex={0} align="center" paddingBottom={sizes.s}>
                <Text h3 center tertiary>
                    {t('restRoutine.label.title')}
                </Text>
            </Block>
            {/* content */}
            <Block flex={1} marginBottom={sizes.xl}>
                <FlatList
                    data={myRestRoutines}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => <RestRoutine {...item} />}
                    ListEmptyComponent={
                        isMyRestRoutinesLoading ? (
                            <LoadingPlaceholder />
                        ) : (
                            <DataNotFound title={t('restRoutine.warning.myRestRoutinesNotFound')} />
                        )
                    }
                    showsVerticalScrollIndicator={false}
                />
            </Block>
        </Block>
    );
}
