import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PlanStackNavigatorParamList = {
    PlansScreen: undefined;
    PlanDetailScreen: {
        planId: string;
        isInMyPlans: boolean;
    };
};

export type PlansScreenNavigationProp = NativeStackNavigationProp<
    PlanStackNavigatorParamList,
    'PlanDetailScreen'
>;

export type PlanDetailScreenRouteProp = RouteProp<PlanStackNavigatorParamList, 'PlanDetailScreen'>;
