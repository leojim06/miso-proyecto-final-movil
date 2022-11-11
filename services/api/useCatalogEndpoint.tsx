import { AxiosResponse } from 'axios';
import { useData } from '../../hooks';
import useAxiosInstance from '../../hooks/useAxiosInstance';

export interface ISuscription {
    id?: number;
    descripcion?: string;
}

export interface ITrainingLevel {
    id?: number;
    descripcion?: string;
}

const suscriptions: ISuscription[] = [
    {
        id: 1,
        descripcion: 'Principiante',
    },
    {
        id: 2,
        descripcion: 'Intermedio',
    },
    {
        id: 3,
        descripcion: 'Avanzado',
    },
];

const trainingLevels: ITrainingLevel[] = [
    {
        id: 1,
        descripcion: 'Plan Gratuito',
    },
    {
        id: 2,
        descripcion: 'Plan Intermedio',
    },
    {
        id: 3,
        descripcion: 'Plan Premium',
    },
];

const useCatalogEndpoint = () => {
    const sportAppInstance = useAxiosInstance();
    const { handleSuscriptionCatalog, handleTrainingLevelCatalog } = useData();

    const loadSuscriptions = async (): Promise<void> => {
        try {
            const url: string = `/suscripciones/`;
            const response: AxiosResponse<ISuscription[]> = await sportAppInstance.get(url);
            handleSuscriptionCatalog(response.data);
        } catch (error: unknown) {
            handleSuscriptionCatalog(suscriptions);
        }
    };

    const loadTrainingLevels = async (): Promise<void> => {
        try {
            const url: string = `/niveles-plan/`;
            const response: AxiosResponse<ITrainingLevel[]> = await sportAppInstance.get(url);
            handleTrainingLevelCatalog(response.data);
        } catch (error) {
            handleTrainingLevelCatalog(trainingLevels);
        }
    };

    return { loadSuscriptions, loadTrainingLevels };
};

export default useCatalogEndpoint;
