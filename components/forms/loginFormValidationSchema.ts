import * as yup from 'yup'

import i18n from '../../services/i18n';

const EMAIL_FORMAT_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const LoginFormValidationSchema = yup.object().shape({
    email: yup.string()
        .matches(
            EMAIL_FORMAT_REGEX, 
            i18n.t("textLogin.validation.invalidEmail"))
        .required(i18n.t("textLogin.validation.requiredEmail")),
    password: yup.string()
        .min(6, i18n.t("textLogin.validation.minLenghtPassword"))
        .required(i18n.t("textLogin.validation.requiredPassword"))
});
