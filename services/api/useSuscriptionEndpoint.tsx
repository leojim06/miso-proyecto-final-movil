import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import useAxiosInstance from '../../hooks/useAxiosInstance';

export interface IManageSuscription {
    id: number;
    idDeportista: number;
    idTipoSuscripcion: number;
    idNivel: number;
    complementos: number[];
    idMedioPago: number;
}

const useSuscriptionEndpoint = () => {
    const { t } = useTranslation();
    const sportAppInstance = useAxiosInstance();

    const getManageSuscription = async (userId: string, token: string): Promise<any> => {
        try {
            const url: string = `/gestion-planes/${userId}`;
            const response: AxiosResponse<any> = await sportAppInstance.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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

    return { getManageSuscription };
};

export default useSuscriptionEndpoint;
