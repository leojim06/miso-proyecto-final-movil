import { THEME as commonTheme } from './theme';


export const COLORS = {
    // default text color
    text: '#252F40',

    // base colors
    /** UI color for #primary */
    primary: '#CB0C9F',
    /** UI color for #secondary */
    secondary: '#627594', // '#8392AB',
    /** UI color for #tertiary */
    tertiary: '#E8AE4C',

    // gray variations
    /** UI color for #gray */
    gray: '#A7A8AE',

    // colors variations
    /** UI color for #danger */
    danger: '#EA0606',
    /** UI color for #warning */
    warning: '#FFC107',
    /** UI color for #success */
    success: '#82D616',
    /** UI color for #info */
    info: '#17C1E8',

    /** UI color for shadowColor */
    shadow: '#000000',
    overlay: 'rgba(0,0,0,0.3)',

    /** UI color for input borderColor on focus */
    focus: '#E293D3',
    input: '#252F40',

    /** social colors */
    facebook: '#3B5998',
    twitter: '#55ACEE',
    dribbble: '#EA4C89',

    /** icon tint color */
    icon: '#8392AB',

    /** blur tint color */
    blurTint: 'light',

    /** product link color */
    link: '#CB0C9F',

}

export const SIZES = {
    // global sizes
    base: 8,
    text: 14,
    radius: 4,
    padding: 20,

    // font sizes
    h1: 44,
    h2: 40,
    h3: 32,
    h4: 24,
    h5: 18,
    p: 16,

    // button sizes
    buttonBorder: 1,
    buttonRadius: 8,
    socialSize: 64,
    socialRadius: 16,
    socialIconSize: 26,

    // button shadow
    shadowOffsetWidth: 0,
    shadowOffsetHeight: 7,
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,

    // input sizes
    inputHeight: 46,
    inputBorder: 1,
    inputRadius: 8,
    inputPadding: 12,

    // image sizes
    imageRadius: 14,
    avatarSize: 32,
    avatarRadius: 8,

    // product link size
    linkSize: 12,

    /** font size multiplier: for maxFontSizeMultiplier prop */
    multiplier: 2,
}

export const SPACING = {
    /** xs: 4px */
    xs: SIZES.base * 0.5,
    /** s: 8px */
    s: SIZES.base * 1,
    /** sm: 16px */
    sm: SIZES.base * 2,
    /** m: 24px */
    m: SIZES.base * 3,
    /** md: 32px */
    md: SIZES.base * 4,
    /** l: 40px */
    l: SIZES.base * 5,
    /** xl: 48px */
    xl: SIZES.base * 6,
    /** xxl: 56px */
    xxl: SIZES.base * 7,
}

export const THEME = {
    ...commonTheme,
    colors: COLORS,
    sizes: { ...SIZES, ...commonTheme.sizes, ...SPACING },
}
