import { Formik } from "formik";
import { StyleSheet, Button, View, Text, TextInput } from 'react-native';
// import { View, Text, TextInput } from '../Themed';
import { LoginFormValidationSchema } from './loginFormValidationSchema';
import { useTheme } from '../../hooks';


import i18n from '../../services/i18n';

let initialValues = {
    email: '',
    password: ''
}

export function LoginForm() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginFormValidationSchema}
            onSubmit={values => {
                console.log(JSON.stringify(values));
            }}
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <View style={styles.formContainer}>
                    <View style={styles.containerInput}>
                        <TextInput
                            testID="email"
                            value={values.email}
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholder={i18n.t("textLogin.label.email")}
                        />
                        {touched.email && errors.email &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                        }
                    </View>
                    <View>
                        <TextInput
                            testID="password"
                            value={values.password}
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                            placeholder={i18n.t("textLogin.label.password")}
                            secureTextEntry={true}
                        />
                        {touched.password && errors.password &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                        }
                    </View>
                    <View>
                        <Button
                            color="#3740FE"
                            title="Login"
                            // disabled={!isValid}
                            onPress={() => handleSubmit()}
                        />
                    </View>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        // backgroundColor: "transparent",
        // flex: 1,
        // flexDirection: "column",
    },
    containerInput: {
        // backgroundColor: "transparent",
        // width: "100%",
        // height: 50,
    },
    input: {
        // backgroundColor: "transparent",
        // height: 50,
        // width: "100%",
        // fontSize: 16,
    },
});

export default LoginForm;
