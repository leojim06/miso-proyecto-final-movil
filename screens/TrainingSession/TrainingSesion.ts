export interface ITrainingSession {
    id: string;
    nombre?: string;
    descripcion?: string;
    duracion?: string;
    rutinas?: IWeekTrainingSession[];
}

export interface IWeekTrainingSession {
    semana: number;
    dias: IDayTrainingSession[];
}

export interface IDayTrainingSession {
    id: string;
    dia: number;
    ejercicio: string;
}



export interface ITrainingSessionProps extends ITrainingSession {
    activo: boolean;
    rutinas?: IWeekTrainingSessionProps[];
}

export interface IWeekTrainingSessionProps extends IWeekTrainingSession {
    activo: boolean;
    dias: IDayTrainingSessionProps[];
}

export interface IDayTrainingSessionProps extends IDayTrainingSession {
    activo: boolean;
    completo?: boolean;
}


export interface ITrainingPlanDetailProps extends ITrainingSession {
    imagen?: string;
    suscripcion?: 'Free' | 'Intermediate' | 'Pro';
    rutinas?: IWeekTrainingPlanDetailProps[];
}

export interface IWeekTrainingPlanDetailProps extends IWeekTrainingSession {
    dias: IDayTrainingPlanDetailProps[];
}

export interface IDayTrainingPlanDetailProps extends IDayTrainingSession {

}