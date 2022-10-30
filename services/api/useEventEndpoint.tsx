import axios, { AxiosResponse } from 'axios';
import { API_URL } from '@env';
import { useTranslation } from '../../hooks';
import { timeout } from '../../utils/timeout';
import { IEventProps } from '../../components/events/Event';
import { IEventDetailProps } from '../../screens/Events/EventDetailScreen';

const events: IEventProps[] = [
    {
        id: '1',
        date: new Date(),
        name: 'Name',
        description: 'Description',
    },
    {
        id: '2',
        date: new Date(),
        name: 'Name',
        description: 'Description',
    },
    {
        id: '3',
        date: new Date(),
        name: 'Name',
        description: 'Description',
    },
];

const eventsNotFound: IEventProps[] = [];

const eventDetail: IEventDetailProps = {
    id: '1',
    image: 'https://via.placeholder.com/150/0000FF/808080 ?Text=Digital.com',
    location: 'Colombia',
    time: {
        start: Date.now(),
        end: Date.now(),
    },
    name: 'Paseo en el parque',
    description: 'Disfruta de la naturaleza con este evento en el parque',
    food: 'No aplica',
    host: 'No aplica',
};

const useEventEndpoint = () => {
    const { t } = useTranslation();

    const loadMySuggestedEvents = async (
        user_id: string,
        withData: boolean
    ): Promise<IEventProps[]> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/my-plans/${user_id}`);
            // return response.data;
            await timeout(800);
            return withData ? events : eventsNotFound;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const loadEventDetail = async (
        event_id: string,
        withData: boolean
    ): Promise<IEventDetailProps> => {
        try {
            // const response: AxiosResponse<IMyPlans> = await axios.get(`${API_URL}/events/${event_id}`);
            // return response.data;
            await timeout(800);
            return withData ? eventDetail : ({} as IEventDetailProps);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return { loadMySuggestedEvents, loadEventDetail };
};

export default useEventEndpoint;
