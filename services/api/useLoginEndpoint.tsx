import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { API_URL } from '@env';
import { IUser } from '../../constants/types';
import useAxiosInstance from '../../hooks/useAxiosInstance';

type loginRequest = {
    username: string;
    password: string;
};

const useLoginEndpoint = () => {
    const { t } = useTranslation();
    const url = `${API_URL}/autenticador/auth`;
    const sportAppInstance = useAxiosInstance();

    const loadLogin = async ({ username, password }: loginRequest) => {
        try {
            const url: string = '/autenticador/auth';
            const response: AxiosResponse<IUser> = await sportAppInstance.post(url, {
                username,
                password,
            });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
            }
        }
    };

    return { loadLogin };
};

export default useLoginEndpoint;
