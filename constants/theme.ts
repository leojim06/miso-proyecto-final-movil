import { Dimensions, Platform } from 'react-native';
import {
    ICommonTheme,
    ThemeAssets,
    ThemeFonts,
    ThemeIcons,
    ThemeLineHeights,
    ThemeWeights,
} from './types';

const { width, height } = Dimensions.get('window');

// Naming source: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
export const WEIGHTS: ThemeWeights = {
    text: 'normal',
    h1: Platform.OS === 'ios' ? '700' : 'normal',
    h2: Platform.OS === 'ios' ? '700' : 'normal',
    h3: Platform.OS === 'ios' ? '700' : 'normal',
    h4: Platform.OS === 'ios' ? '700' : 'normal',
    h5: Platform.OS === 'ios' ? '600' : 'normal',
    p: 'normal',

    thin: Platform.OS === 'ios' ? '100' : 'normal',
    extralight: Platform.OS === 'ios' ? '200' : 'normal',
    light: Platform.OS === 'ios' ? '300' : 'normal',
    normal: Platform.OS === 'ios' ? '400' : 'normal',
    medium: Platform.OS === 'ios' ? '500' : 'normal',
    semibold: Platform.OS === 'ios' ? '600' : 'normal',
    bold: Platform.OS === 'ios' ? '700' : 'normal',
    extrabold: Platform.OS === 'ios' ? '800' : 'normal',
    black: Platform.OS === 'ios' ? '900' : 'normal',
};

export const ICONS: ThemeIcons = {
    check: require('../assets/icons/check.png'),
    close: require('../assets/icons/close.png'),
    home: require('../assets/icons/home.png'),
    search: require('../assets/icons/search.png'),
    warning: require('../assets/icons/warning.png'),
};

export const ASSETS: ThemeAssets = {
    // fonts
    OpenSansLight: require('../assets/fonts/OpenSans-Light.ttf'),
    OpenSansRegular: require('../assets/fonts/OpenSans-Regular.ttf'),
    OpenSansSemiBold: require('../assets/fonts/OpenSans-SemiBold.ttf'),
    OpenSansExtraBold: require('../assets/fonts/OpenSans-ExtraBold.ttf'),
    OpenSansBold: require('../assets/fonts/OpenSans-Bold.ttf'),

    // background/images
    landscapePlaceholder: require('../assets/images/background.png'),
    avatarPlaceholder: require('../assets/images/man.jpg'),

    // modal/icons
    success: require('../assets/icons/aprobado.png'),
    warning: require('../assets/icons/pendiente.png'),
    error: require('../assets/icons/denegado.png'),
    info: require('../assets/icons/aprobado.png'),
};

export const FONTS: ThemeFonts = {
    // based on font size
    text: 'OpenSans-Regular',
    h1: 'OpenSans-Bold',
    h2: 'OpenSans-Bold',
    h3: 'OpenSans-Bold',
    h4: 'OpenSans-Bold',
    h5: 'OpenSans-SemiBold',
    p: 'OpenSans-Regular',

    // based on fontWeight
    thin: 'OpenSans-Light',
    extralight: 'OpenSans-Light',
    light: 'OpenSans-Light',
    normal: 'OpenSans-Regular',
    medium: 'OpenSans-SemiBold',
    semibold: 'OpenSans-SemiBold',
    bold: 'OpenSans-Bold',
    extrabold: 'OpenSans-ExtraBold',
    black: 'OpenSans-ExtraBold',
};

export const LINE_HEIGHTS: ThemeLineHeights = {
    // font lineHeight
    text: 22,
    h1: 60,
    h2: 55,
    h3: 43,
    h4: 33,
    h5: 24,
    p: 22,
};

export const THEME: ICommonTheme = {
    icons: ICONS,
    assets: { ...ICONS, ...ASSETS },
    fonts: FONTS,
    weights: WEIGHTS,
    lines: LINE_HEIGHTS,
    sizes: { width, height },
};
