import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';

const useLoginEndpoint = () => {
    const { t } = useTranslation();
    const url = "http://35.244.150.255/autenticador/auth";

    const loadLogin = async ({ username, password }) => {
        try {
            const response: AxiosResponse<any> = await axios.post(url, { username, password });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                throw (t('login.error.unauthorized'))
            } else {
                throw (t('login.error.server'))
            }
        }
    }

    return { loadLogin }
}

export default useLoginEndpoint
