import { loginEs } from './es/login.es';
import { applicationEs } from './es/application.es';
import { plansEs } from './es/plans.es';
import { eventsEs } from './es/events.es';
import { applicationPtBR } from './ptBR/application.pt-BR';
import { trainingEs } from './es/training.es';
import { progressEs } from './es/progress.es';
import { sportProfileEs } from './es/sportProfile.es';
import { restRoutineEs } from './es/restRoutine.es';
import { profileEs } from './es/profile.es';
import { profilePtBR } from './ptBR/profile.pt-BR';
import { loginPtBR } from './ptBR/login.pt-BR';
import { plansPtBR } from './ptBR/plans.pt-BR';
import { eventsPtBR } from './ptBR/events.pt-BR';
import { progressPtBR } from './ptBR/progress.pt-BR';
import { restRoutinePtBR } from './ptBR/restRoutine.pt-BR';
import { trainingPtBR } from './ptBR/training.pt-BR';
import { sportProfilePtBR } from './ptBR/sportProfile.pt-BR';

export default {
    es: {
        app: applicationEs,
        login: loginEs,
        plans: plansEs,
        events: eventsEs,
        training: trainingEs,
        progress: progressEs,
        sportProfile: sportProfileEs,
        restRoutine: restRoutineEs,
        profile: profileEs,
    },
    "pt-BR": {
        app: applicationPtBR,
        login: loginPtBR,
        plans: plansPtBR,
        events: eventsPtBR,
        training: trainingPtBR,
        progress: progressPtBR,
        sportProfile: sportProfilePtBR,
        restRoutine: restRoutinePtBR,
        profile: profilePtBR,
    },
};
