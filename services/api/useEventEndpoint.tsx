import axios from 'axios';
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

const eventsProgress: IEventProps[] = [
    {
        id: '1',
        date: new Date(),
        name: 'Name',
        description: 'Description',
    },
    // {
    //     id: '2',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '3',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '4',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '5',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '6',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '7',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '8',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '9',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '10',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // },
    // {
    //     id: '11',
    //     date: new Date(),
    //     name: 'Name',
    //     description: 'Description',
    // }
];

const eventsNotFound: IEventProps[] = [];

const eventDetail: IEventDetailProps = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?fit=crop&w=450&q=80',
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

const eventProgressDetail: IEventDetailProps = {
    id: '1',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?fit=crop&w=450&q=80',
    location: 'Colombia',
    time: {
        start: Date.now(),
        end: Date.now(),
    },
    name: 'Paseo en el parque',
    description: 'Disfruta de la naturaleza con este evento en el parque',
    food: 'No aplica',
    host: 'No aplica',
    calorias: 245,
    tiempo: 25,
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

    const loadMyEventProgress = async (
        userId: string,
        withData: boolean
    ): Promise<IEventProps[]> => {
        try {
            await timeout(600);
            return withData ? eventsProgress : eventsNotFound;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    const loadMyEventProgressDetail = async (
        eventId: string,
        withData: boolean
    ): Promise<IEventProps> => {
        try {
            await timeout(600);
            return withData ? eventProgressDetail : ({} as IEventProps);
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('login.error.unauthorized');
            } else {
                throw t('login.error.server');
            }
        }
    };

    return {
        loadMySuggestedEvents,
        loadEventDetail,
        loadMyEventProgress,
        loadMyEventProgressDetail,
    };
};

export default useEventEndpoint;
