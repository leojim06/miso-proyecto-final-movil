import { loginEs } from './login.es';
import {applicationEs} from './application.es';
import { plansEs } from './plans.es';

export default {
    es: {
        app: applicationEs,
        login: loginEs,
        plans: plansEs
    },
};
