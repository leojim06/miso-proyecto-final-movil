import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ITrainingSessionDetailProps } from '../../screens/TrainingSession/TrainingDetailScreen';
import { IDayTrainigSession } from '../../screens/TrainingSession/TrainingSesionScreen';

export type TrainingSessionStackNavigatorParamList = {
    TrainingSessionScreen: undefined;
    TrainingDetailScreen: {
        trainingId: string
    };
    TrainingWatcher: {
        session: ITrainingSessionDetailProps
    };
};

export type TrainingSessionScreenNavigationProp = NativeStackNavigationProp<
    TrainingSessionStackNavigatorParamList,
    'TrainingSessionScreen'
>;

export type TrainingDetailScreenRouteProop = RouteProp<
    TrainingSessionStackNavigatorParamList,
    'TrainingDetailScreen'
>;

export type TrainingWatcherScreenRouteProp = RouteProp<
    TrainingSessionStackNavigatorParamList,
    'TrainingWatcher'
>;
