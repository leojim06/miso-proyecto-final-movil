import { loginEs } from './es/login.es';
import { applicationEs } from './es/application.es';
import { plansEs } from './es/plans.es';
import { eventsEs } from './es/events.es';
import { applicationPtBR } from './ptBR/application.pt-BR';
import { trainingEs } from './es/training.es';
import { progressEs } from './es/progress.es';
import { restRoutineEs } from './es/restRoutine.es';

export default {
    es: {
        app: applicationEs,
        login: loginEs,
        plans: plansEs,
        events: eventsEs,
        training: trainingEs,
        progress: progressEs,
        restRoutine: restRoutineEs,
    },
    "pt-BR": {
        app: applicationPtBR,
    },
};
