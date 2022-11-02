import * as origininalI18n from 'i18n-js';
const mocked = origininalI18n as jest.Mocked<typeof origininalI18n>;
export const I18n = mocked.I18n;

beforeEach(() => {
    I18n.mockClear();
});

const i18nMocked = jest.mock('i18n-js', () => {
    return {
        I18n
    };
});

export default i18nMocked;