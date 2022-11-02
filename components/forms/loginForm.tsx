import { Formik } from 'formik';
import * as yup from 'yup';
import { Block, Button, Text, Input } from '../';
import { emailRegExp } from '../../constants/regex';
import { useTheme, useTranslation } from '../../hooks';

type LoginFormProps = {
    onSubmit(values: any): void;
};

let initialValues = {
    email: '',
    password: '',
};

const LoginForm = (props: LoginFormProps) => {
    const { sizes, colors } = useTheme();
    const { t } = useTranslation();

    const LoginFormValidationSchema = yup.object().shape({
        email: yup
            .string()
            .matches(emailRegExp, t('login.validation.invalidEmail'))
            .required(t('login.validation.requiredEmail')),
        password: yup
            .string()
            .min(6, t('login.validation.minLenghtPassword'))
            .required(t('login.validation.requiredPassword')),
    });

    return (
        <Block flex={0} keyboard>
            <Formik
                initialValues={initialValues}
                validationSchema={LoginFormValidationSchema}
                onSubmit={(values) => props.onSubmit(values)}
            >
                {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
                    <Block flex={0}>
                        {/* email */}
                        <Block paddingBottom={sizes.sm}>
                            <Input
                                testID="email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={() => setFieldTouched('email')}
                                placeholder={t('login.label.email')}
                            />
                            {touched.email && errors.email && (
                                <Text size={sizes.text} color={colors.danger}>
                                    {errors.email}
                                </Text>
                            )}
                        </Block>
                        {/* password */}
                        <Block paddingBottom={sizes.sm}>
                            <Input
                                testID="password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                placeholder={t('login.label.password')}
                                secureTextEntry={true}
                            />
                            {touched.password && errors.password && (
                                <Text size={sizes.text} color={colors.danger}>
                                    {errors.password}
                                </Text>
                            )}
                        </Block>
                        {/* btn submit */}
                        <Block>
                            <Button
                                color={colors.primary}
                                marginBottom={sizes.base}
                                onPress={() => handleSubmit()}
                            >
                                <Text white bold transform="uppercase">
                                    {t('login.btn.title')}
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                )}
            </Formik>
        </Block>
    );
};

export default LoginForm;
