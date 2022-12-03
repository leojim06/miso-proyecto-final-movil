import axios from 'axios';
import { useData, useTranslation } from '.';

const useAxiosInstance = () => {
    const { user } = useData();
    const { t } = useTranslation();

    const instance = axios.create({
        baseURL: 'http://35.244.246.183',
        timeout: 2000,
    });

    const requestHandler = (request: any) => {
        if (!request.url.includes('auth') && user?.accessToken) {
            request.headers.Authorization = `Bearer ${user?.accessToken}`;
        }
        return request;
    };

    // const responseHandler = (response: any) => {
    //     return response;
    // };

    // const errorHandler = (error: any) => {
    //     return error.response.status === 401 || error.respoonse.status === 403
    //         ? Promise.reject(t('app.error.unauthorized'))
    //         : Promise.reject(t('app.error.server'));
    // };

    instance.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => Promise.reject(error)
    );

    // instance.interceptors.response.use(
    //     (response) => responseHandler(response),
    //     (error) => errorHandler(error)
    // );

    return instance;
};

export default useAxiosInstance;
