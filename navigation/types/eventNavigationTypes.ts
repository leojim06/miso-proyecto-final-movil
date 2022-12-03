import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type EventStackNavigatorParamList = {
    EventsScreen: undefined;
    EventDetailScreen: {
        eventId: number;
    };
};

export type EventsScreenNavigationProp = NativeStackNavigationProp<
    EventStackNavigatorParamList,
    'EventDetailScreen'
>;

export type EventDetailScreenRouteProp = RouteProp<
    EventStackNavigatorParamList,
    'EventDetailScreen'
>;
