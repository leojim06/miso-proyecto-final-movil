import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { IRestRoutine } from '../../screens/TrainingSession/RestRoutineScreen';
import { timeout } from '../../utils/timeout';

const restRoutines: IRestRoutine[] = [
    {
        id: '1',
        nombre: 'Tomar baño de agua fria',
        descripcion: 'Baño de agua de 12 grados centigrados',
    },
    {
        id: '2',
        nombre: 'Masaje de relajación',
        descripcion: 'Masaje de relajación sobre los musculos trabajados',
    },
];

const useRestRoutinesEndpoint = () => {
    const { t } = useTranslation();
    const sportAppInstance = useAxiosInstance();

    const loadRestRoutines = async (userId: string, withData: boolean): Promise<IRestRoutine[]> => {
        try {
            // const url: string = `/`;
            // const response: AxiosResponse<IRestRoutine[]> = await sportAppInstance.get(url);
            // return response.data;

            await timeout(800);
            return withData ? restRoutines : [];
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
            }
        }
    };

    return { loadRestRoutines };
};

export default useRestRoutinesEndpoint;
