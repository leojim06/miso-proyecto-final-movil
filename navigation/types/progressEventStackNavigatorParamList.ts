import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ProgressEventStackNavigatorParamList = {
    ProgressEventScreen: undefined;
    ProgressEventDetailScreen: {
        eventId: string;
    };
    SportProfileScreen: undefined
};

export type ProgressEventScreenNavigationProp = NativeStackNavigationProp<
    ProgressEventStackNavigatorParamList,
    'ProgressEventScreen'
>;

export type SportProfileScreenNavigationProp = NativeStackNavigationProp<
    ProgressEventStackNavigatorParamList,
    'SportProfileScreen'
>;

export type ProgressEventDetailScreenRouteProp = RouteProp<
    ProgressEventStackNavigatorParamList,
    'ProgressEventDetailScreen'
>;
