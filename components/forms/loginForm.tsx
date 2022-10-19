import { Formik } from "formik";
import { Block, Button, Text, Input } from '../'
// import { StyleSheet, Button, View, Text, TextInput } from 'react-native';
// import { View, Text, TextInput } from '../Themed';
import { LoginFormValidationSchema } from './loginFormValidationSchema';
import { useTheme } from '../../hooks';


import i18n from '../../services/i18n';

let initialValues = {
    email: '',
    password: ''
}

export function LoginForm() {
    const {gradients, sizes, colors} = useTheme();
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginFormValidationSchema}
            onSubmit={values => {
                console.log(JSON.stringify(values));
            }}
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <Block keyboard>
                    <Block>
                        <Input
                            testID="email"
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholder={i18n.t("textLogin.label.email")}
                        />
                        {touched.email && errors.email &&
                            <Text size={sizes.text} color={colors.danger}>{errors.email}</Text>
                        }
                    </Block>
                    <Block>
                        <Input
                            testID="password"
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                            placeholder={i18n.t("textLogin.label.password")}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password &&
                            <Text size={sizes.text} color={colors.danger}>{errors.password}</Text>
                        }
                    </Block>
                    <Block>
                        <Button
                            flex={1}
                            // gradient={gradients.primary}
                            color={colors.primary}
                            marginBottom={sizes.base}                        
                            onPress={() => handleSubmit()}
                        >
                            <Text white bold transform="uppercase">Iniciar sesion</Text>
                        </Button>
                    </Block>
                </Block>
            )}
        </Formik>
    )
}

export default LoginForm;
