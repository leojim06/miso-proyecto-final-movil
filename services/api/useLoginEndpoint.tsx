import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { SPORT_APP_URL } from '@env';
import { IUser } from '../../constants/types';

type loginRequest = {
    username: string;
    password: string;
};

const URL = "http://35.244.246.183";

const useLoginEndpoint = () => {
    const { t } = useTranslation();
    const url = `${URL}/autenticador/auth`;

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
