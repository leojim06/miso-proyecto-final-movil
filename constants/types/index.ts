import i18n from 'i18n-js';
import { ImageSourcePropType } from 'react-native';
import { InfoModalProps } from '../../components/modals/InformationModal';
import { ITheme } from './theme';

export * from './components';
export * from './theme';

export interface IUser {
    // id: number | string;
    // name?: string;
    // department?: string;
    // avatar?: string;
    // stats?: { posts?: number; followers?: number; following?: number };
    // social?: { twitter?: string; dribbble?: string };
    // about?: string;
    id: string;
    accessToken: string;
}

export interface ICategory {
    id?: number;
    name?: string;
}
export interface IArticleOptions {
    id?: number;
    title?: string;
    description?: string;
    type?: 'room' | 'apartment' | 'house'; // private room | entire apartment | entire house
    sleeping?: { total?: number; type?: 'sofa' | 'bed' };
    guests?: number;
    price?: number;
    user?: IUser;
    image?: string;
}
export interface IArticle {
    id?: number;
    title?: string;
    description?: string;
    category?: ICategory;
    image?: string;
    location?: ILocation;
    rating?: number;
    user?: IUser;
    offers?: IProduct[];
    options?: IArticleOptions[];
    timestamp?: number;
    onPress?: (event?: any) => void;
}

export interface IProduct {
    id?: number;
    title?: string;
    description?: string;
    image?: string;
    timestamp?: number;
    linkLabel?: string;
    type: 'vertical' | 'horizontal';
}
export interface ILocation {
    id?: number;
    city?: string;
    country?: string;
}
export interface IUseData {
    isDark: boolean;
    handleIsDark: (isDark?: boolean) => void;
    theme: ITheme;
    setTheme: (theme?: ITheme) => void;
    user: any;
    handleUser: (data?: IUser) => void;
    isLoading: boolean;
    handleLoading: (isLoading?: boolean) => void;
    trainingSession: any:
    handleTrainingSession: (trainingSession?: any) => void;
    // hasInfoModal: InfoModalProps,
    // handleInfoModalPanel: (data?: InfoModalProps) => void;
}

export interface ITranslate {
    locale: string;
    setLocale: (locale?: string) => void;
    t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
    translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
    i18n: i18n.I18n;
}
export interface IExtra {
    id?: number;
    name?: string;
    time?: string;
    image: ImageSourcePropType;
    saved?: boolean;
    booked?: boolean;
    available?: boolean;
    onBook?: () => void;
    onSave?: () => void;
    onTimeSelect?: (id?: number) => void;
}

export interface IBasketItem {
    id?: number;
    image?: string;
    title?: string;
    description?: string;
    stock?: boolean;
    price?: number;
    qty?: number;
    qtys?: number[];
    size?: number | string;
    sizes?: number[] | string[];
}

export interface IBasket {
    subtotal?: number;
    items?: IBasketItem[];
    recommendations?: IBasketItem[];
}

export interface INotification {
    id?: number;
    subject?: string;
    message?: string;
    read?: boolean;
    business?: boolean;
    createdAt?: number | Date;
    type:
    | 'document'
    | 'documentation'
    | 'payment'
    | 'notification'
    | 'profile'
    | 'extras'
    | 'office';
}
