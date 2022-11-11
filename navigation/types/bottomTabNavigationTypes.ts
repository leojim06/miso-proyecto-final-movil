import { EventStackNavigatorParamList } from './eventNavigationTypes';
import { PlanStackNavigatorParamList } from './planNavigationTypes';
import { TrainingSessionStackNavigatorParamList } from './trainingSessionStackNavigatorParamList';

export type BottomTabNavigatorParamList = {
    Events: EventStackNavigatorParamList;
    Progress: undefined;
    Plans: PlanStackNavigatorParamList;
    Training: TrainingSessionStackNavigatorParamList;
    Profile: undefined;
};
