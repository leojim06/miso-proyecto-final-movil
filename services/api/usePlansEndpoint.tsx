import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { API_URL } from '@env';
import { ITrainigPlans } from '../../components/plans/TrainigPlan';
import { timeout } from '../../utils/timeout';
import { ITrainingPlanDetailProps } from '../../screens/Plans/PlanDetailScreen';
import { ITrainingSessionDetailProps } from '../../screens/TrainingSession/TrainingDetailScreen';

export interface IMyPlans {}

const plans: ITrainigPlans[] = [
    {
        id: '1',
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Beginner',
        duration: 10,
    },
    {
        id: '2',
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Intermediate',
        duration: 10,
    },
    {
        id: '3',
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Advanced',
        duration: 10,
    },
];

const plansNotFound: ITrainigPlans[] = [];

const planDetail: ITrainingPlanDetailProps = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?fit=crop&w=450&q=80',
    // image: undefined,
    suscription: 'Free',
    name: 'Plan para comenzar a caminar',
    description:
        'Es importante que, para mantener un balance en el trabajo que se hace durante la caminata, se complemente con alguna serie sencilla de ejercicios de fortalecimiento abdominal, de esta forma la postura logrará mejorías y la columna se verá beneficiada.',
    duration: '6 semanas',
    routine: [
        {
            week: 1,
            days: [
                { id: '1', day: 1, exercise: '30’ con paso lento' },
                { id: '2', day: 2, exercise: '25’ con paso moderado' },
                { id: '3', day: 3, exercise: '30’ con paso lento' },
            ],
        },
        {
            week: 2,
            days: [
                { id: '4', day: 1, exercise: '30’ con paso moderado' },
                { id: '5', day: 2, exercise: '35’ con paso lento' },
                { id: '6', day: 3, exercise: '30’ con paso moderado' },
            ],
        },
        {
            week: 3,
            days: [
                { id: '7', day: 1, exercise: '30’ con paso moderado' },
                { id: '8', day: 2, exercise: '35’ con paso lento' },
                { id: '9', day: 3, exercise: '30’ con paso moderado' },
            ],
        },
        {
            week: 4,
            days: [
                { id: '10', day: 1, exercise: '35’ con paso acelerado' },
                { id: '11', day: 2, exercise: '40’ con paso moderado' },
                { id: '12', day: 3, exercise: '35’ con paso acelerado' },
            ],
        },
        {
            week: 5,
            days: [
                { id: '13', day: 1, exercise: '40’ con paso acelerado' },
                { id: '14', day: 2, exercise: '45’ con paso moderado' },
                { id: '15', day: 3, exercise: '40’ con paso acelerado' },
            ],
        },
        {
            week: 6,
            days: [
                { id: '16', day: 1, exercise: '45’ con paso moderado' },
                { id: '17', day: 2, exercise: '45’ con paso acelerado' },
                { id: '18', day: 3, exercise: '45’ con paso moderado' },
            ],
        },
    ],
};

const trainingSessionDetail: ITrainingSessionDetailProps = {
    id: '1',
    name: 'Entrenamiento general',
    description:
        'Este entrenamiento para el cuerpo entero de 7 minutos es ideal para principiantes.  Los movimientos activan todos los grupos musculares alternando ejercicios de alta y baja intensidad.',
    duration: '7 - 10 min',
    level: 'Beginner',
    week: 1,
    day: 1
};

const usePlansEndpoint = () => {
    const { t } = useTranslation();

    const loadMyPlans = async (user_id: string, withData: boolean): Promise<ITrainigPlans[]> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/my-plans/${user_id}`);
            // return response.data;
            await timeout(800);
            return withData ? plans : plansNotFound;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const loadMySuggestedPlans = async (
        user_id: string,
        withData: boolean
    ): Promise<ITrainigPlans[]> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/my-plans/${user_id}`);
            // return response.data;
            await timeout(1500);
            return withData ? plans : plansNotFound;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const loadPlanDetail = async (
        event_id: string,
        withData: boolean
    ): Promise<ITrainingPlanDetailProps> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/events/${event_id}`);
            // return response.data;
            await timeout(800);
            return withData ? planDetail : ({} as ITrainingPlanDetailProps);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const loadTrainingDetail = async (
        trainingId: string,
        withData: boolean
    ): Promise<ITrainingSessionDetailProps> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/events/${event_id}`);
            // return response.data;
            await timeout(800);
            return withData ? trainingSessionDetail : ({} as ITrainingSessionDetailProps);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return { loadMyPlans, loadMySuggestedPlans, loadPlanDetail, loadTrainingDetail };
};

export default usePlansEndpoint;
