import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { API_URL } from '@env';
import { ITrainigPlans } from '../../components/plans/TrainigPlan';
import { timeout } from '../../utils/timeout';
import { ITrainigPlanDetailProps } from '../../screens/Plans/PlanDetailScreen';

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

const planDetail: ITrainigPlanDetailProps = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?fit=crop&w=450&q=80',
    // image: undefined,
    suscription: 'Free',
    name: 'Plan para comenzar a caminar',
    description:
        'Es importante que, para mantener un balance en el trabajo que se hace durante la caminata, se complemente con alguna serie sencilla de ejercicios de fortalecimiento abdominal, de esta forma la postura logrará mejorías y la columna se verá beneficiada.',
    duration: '6 semanas',
    routine: [
        { day: 1, exercise: '30’ con paso lento' },
        { day: 2, exercise: '25’ con paso moderado' },
        { day: 3, exercise: '30’ con paso lento' },
        { day: 4, exercise: '30’ con paso moderado' },
        { day: 5, exercise: '35’ con paso lento' },
        { day: 6, exercise: '30’ con paso moderado' },
        { day: 7, exercise: '30’ con paso moderado' },
        { day: 8, exercise: '35’ con paso lento' },
        { day: 9, exercise: '30’ con paso moderado' },
        { day: 10, exercise: '35’ con paso acelerado' },
        { day: 11, exercise: '40’ con paso moderado' },
        { day: 12, exercise: '35’ con paso acelerado' },
        { day: 13, exercise: '40’ con paso acelerado' },
        { day: 14, exercise: '45’ con paso moderado' },
        { day: 15, exercise: '40’ con paso acelerado' },
        { day: 16, exercise: '45’ con paso moderado' },
        { day: 17, exercise: '45’ con paso acelerado' },
        { day: 18, exercise: '45’ con paso moderado' },
    ],
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
    ): Promise<ITrainigPlanDetailProps> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/events/${event_id}`);
            // return response.data;
            await timeout(800);
            return withData ? planDetail : ({} as ITrainigPlanDetailProps);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return { loadMyPlans, loadMySuggestedPlans, loadPlanDetail };
};

export default usePlansEndpoint;
