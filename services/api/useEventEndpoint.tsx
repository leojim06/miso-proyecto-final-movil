import axios, { AxiosResponse } from 'axios';
import { API_URL } from '@env';
import { useTranslation } from "../../hooks";
import { timeout } from "../../utils/timeout";
import { IEventProps } from '../../components/events/Event';

const events: IEventProps[] = [
    {
        id: 1,
        date: new Date(),
        name: "Name",
        description: "Description"
    },
    {
        id: 2,
        date: new Date(),
        name: "Name",
        description: "Description"
    },
    {
        id: 3,
        date: new Date(),
        name: "Name",
        description: "Description"
    },
];

const eventsNotFound: IEventProps[] = [];

const useEventEndpoint = () => {
    const { t } = useTranslation();

    const loadMySuggestedEvents = async (user_id: string, withData: boolean): Promise<IEventProps[]> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/my-plans/${user_id}`);
            // return response.data;
            await timeout(800)
            return withData ? events : eventsNotFound;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const loadEventDetail = async (event_id: string, withData: boolean): Promise<IEventProps[]> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/events/${event_id}`);
            // return response.data;
            await timeout(800)
            return withData ? events : eventsNotFound;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return {loadMySuggestedEvents,loadEventDetail}
}

export default useEventEndpoint;