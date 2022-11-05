export interface ITrainingSession {
    id: string;
    name?: string;
    description?: string;
    duration?: string;
    routine?: IWeekTrainingSession[];
}

export interface IWeekTrainingSession {
    week: number;
    days: IDayTrainingSession[];
}

export interface IDayTrainingSession {
    id: string;
    day: number;
    exercise: string;
}



export interface ITrainingSessionProps extends ITrainingSession {
    active: boolean;
    routine?: IWeekTrainingSessionProps[];
}

export interface IWeekTrainingSessionProps extends IWeekTrainingSession {
    active: boolean;
    days: IDayTrainingSessionProps[];
}

export interface IDayTrainingSessionProps extends IDayTrainingSession {
    active: boolean;
    complete?: boolean;
}


export interface ITrainingPlanDetailProps extends ITrainingSession {
    image?: string;
    suscription?: 'Free' | 'Intermediate' | 'Pro';
    routine?: IWeekTrainingPlanDetailProps[];
}

export interface IWeekTrainingPlanDetailProps extends IWeekTrainingSession {
    days: IDayTrainingPlanDetailProps[];
}

export interface IDayTrainingPlanDetailProps extends IDayTrainingSession {

}