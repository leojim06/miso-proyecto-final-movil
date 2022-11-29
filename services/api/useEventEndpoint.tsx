import axios, { AxiosResponse } from 'axios';
import { useTranslation } from '../../hooks';
import { timeout } from '../../utils/timeout';
import { IEventProps } from '../../components/events/Event';
import { IEventDetailProps } from '../../screens/Events/EventDetailScreen';
import useAxiosInstance from '../../hooks/useAxiosInstance';

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
    const sportAppInstance = useAxiosInstance();

    const loadMySuggestedEvents = async (): Promise<IEventProps[]> => {
        try {
            const url: string = `/evento/sugerencias`;
            const response: AxiosResponse<IEventProps[]> = await sportAppInstance.get(url);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
            }
        }
    };

    const loadEventDetail = async (eventId: number): Promise<IEventDetailProps> => {
        try {
            const url: string = `/evento/${eventId}`;
            const response: AxiosResponse<IEventDetailProps> = await sportAppInstance.get(url);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
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
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
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
                throw t('app.error.unauthorized');
            } else {
                throw t('app.error.server');
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
