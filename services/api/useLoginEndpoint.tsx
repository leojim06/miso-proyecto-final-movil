import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { API_URL } from '@env';
import { IUser } from '../../constants/types';

type loginRequest = {
    username: string;
    password: string;
};

const useLoginEndpoint = () => {
    const { t } = useTranslation();
    const url = `${API_URL}/autenticador/auth`;

    const loadLogin = async ({ username, password }: loginRequest) => {
        try {
            const response: AxiosResponse<IUser> = await axios.post(url, {
                username,
                password,
            });
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return { loadLogin };
};

export default useLoginEndpoint;
