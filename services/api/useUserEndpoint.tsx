import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { ISportProfile } from '../../screens/ProgressEvent/SportProfileScreen';
import { timeout } from '../../utils/timeout';

const profile: ISportProfile = {
    id: '1',
    foto: '',
    nombre: 'Ernesto Perez',
    edad: 32,
    sexo: 'Masculino',
    peso: 72,
    estatura: 172,
    vo2max: 123
};

const useUserEndpoint = () => {
    const { t } = useTranslation();
    const sportAppInstance = useAxiosInstance();

    const loadSportProfile = async (userId: string, withData: boolean): Promise<any> => {
        try {
            // const url: string = `/prifile/${userId}`;
            // const response: AxiosResponse<any> = await sportAppInstance.get(url);
            // return response.data;

            await timeout(800);
            return withData ? profile : ({} as ISportProfile);
            // throw new Error('Error controlado')

        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
            }
        }
    };

    return { loadSportProfile };
};

export default useUserEndpoint;
