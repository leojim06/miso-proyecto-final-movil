import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { API_URL } from '@env';
import { TrainingPlanProps } from '../../components/plans/TrainigPlan';

type loginRequest = {};

export interface IMyPlans {}

const plans: TrainingPlanProps[] = [
    {
        id: 1,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Beginner',
        duration: 10,
    },
    {
        id: 2,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Intermediate',
        duration: 10,
    },
    {
        id: 3,
        name: 'Name',
        description: 'Lorem ipsum',
        level: 'Advanced',
        duration: 10,
    },
];

const plansNotFound: TrainingPlanProps[] = [];

const useMyPlansEndpoint = () => {
    const { t } = useTranslation();

    const loadMyPlans = async (user_id: string, withData: boolean) => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/my-plans/${user_id}`);
            // return response.data;
            return withData ? plans : plansNotFound;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return { loadMyPlans };
};

export default useMyPlansEndpoint;
