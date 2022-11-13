import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ProgressEventStackNavigatorParamList = {
    ProgressEventScreen: undefined;
    ProgressEventDetailScreen: {
        eventId: string;
    }
};

export type ProgressEventScreenNavigationProp = NativeStackNavigationProp<
    ProgressEventStackNavigatorParamList,
    'ProgressEventScreen'
>;

export type ProgressEventDetailScreenRouteProp = RouteProp<
    ProgressEventStackNavigatorParamList,
    'ProgressEventDetailScreen'
>;
