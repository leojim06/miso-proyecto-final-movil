import { EventStackNavigatorParamList } from "./eventNavigationTypes";
import { PlanStackNavigatorParamList } from "./planNavigationTypes";

export type BottomTabNavigatorParamList = {
    Events: EventStackNavigatorParamList;
    Progress: undefined;
    Plans: PlanStackNavigatorParamList;
    Training: undefined;
    Profile: undefined;
};
