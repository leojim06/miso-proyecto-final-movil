import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { ITrainingPlan } from '../../components/plans/TrainigPlan';
import { timeout } from '../../utils/timeout';
import { ITrainingSessionDetailProps } from '../../screens/TrainingSession/TrainingDetailScreen';
import useAxiosInstance from '../../hooks/useAxiosInstance';

export interface IMyPlans {}

const trainingSessionDetail: ITrainingSessionDetailProps = {
    id: '1',
    name: 'Entrenamiento general',
    description:
        'Este entrenamiento para el cuerpo entero de 7 minutos es ideal para principiantes.  Los movimientos activan todos los grupos musculares alternando ejercicios de alta y baja intensidad.',
    duration: '7 - 10 min',
    level: 'Beginner',
    week: 1,
    day: 1,
};

const usePlansEndpoint = () => {
    const { t } = useTranslation();
    const sportAppInstance = useAxiosInstance();

    const loadMyPlans = async (userId: string): Promise<ITrainingPlan[]> => {
        try {
            const url: string = `/planes-entrenamiento/deportista/${userId}/registrados`;
            const response: AxiosResponse<ITrainingPlan[]> = await sportAppInstance.get(url);
            return response.data;
        } catch (error: unknown) {
            if (
                axios.isAxiosError(error) &&
                (error.response?.status === 401 || error.response?.status === 403)
            ) {
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
            }
        }
    };

    const loadMySuggestedPlans = async (userId: string): Promise<ITrainingPlan[]> => {
        try {
            const url: string = `/planes-entrenamiento/deportista/${userId}/sugeridos`;
            const response: AxiosResponse<ITrainingPlan[]> = await sportAppInstance.get(url);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const loadPlanDetail = async (planId: string): Promise<ITrainingPlan> => {
        try {
            const url: string = `/planes-entrenamiento/${planId}`;
            const response: AxiosResponse<ITrainingPlan> = await sportAppInstance.get(url);
            return response.data;
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
        day: number,
        withData: boolean
    ): Promise<ITrainingSessionDetailProps> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/events/${event_id}`);
            // return response.data;
            await timeout(800);
            return withData
                ? { ...trainingSessionDetail, id: trainingId, day: day  }
                : ({} as ITrainingSessionDetailProps);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const subscribeMyPlan = async (userId: string, planId?: string): Promise<boolean> => {
        try {
            const url: string = `/planes-entrenamiento/${planId}/deportistas/${userId}`;
            const response: AxiosResponse<any> = await sportAppInstance.post(url);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return {
        loadMyPlans,
        loadMySuggestedPlans,
        loadPlanDetail,
        loadTrainingDetail,
        subscribeMyPlan,
    };
};

export default usePlansEndpoint;
