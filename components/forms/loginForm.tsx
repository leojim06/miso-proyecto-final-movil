import { Formik } from "formik";
import { Alert, View, StyleSheet, TextInput, Text, Button } from 'react-native';
import { LoginFormValidationSchema } from "./loginFormValidationSchema";

let initialValues = {
    email: '',
    password: ''
}

export function LoginForm() {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={LoginFormValidationSchema}
            onSubmit={values => Alert.alert(JSON.stringify(values))}
        >
            {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                <View style={styles.formContainer}>
                    <View style={styles.containerInput}>
                        <TextInput
                            value={values.email}
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            placeholder="Email"
                        />
                        {touched.email && errors.email &&
                            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
                        }
                    </View>
                    <TextInput
                        value={values.password}
                        style={styles.inputStyle}
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                        placeholder="Password"
                        secureTextEntry={true}
                    />
                    {touched.password && errors.password &&
                        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.password}</Text>
                    }
                    <Button
                        color="#3740FE"
                        title="Login"
                        disabled={!isValid}
                    />
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: "transparent",
        flex: 1,
        flexDirection: "column",
    },
    containerInput: {
        backgroundColor: "transparent",
        width: "100%",
        height: 50,
    },
    input: {
        backgroundColor: "transparent",
        height: 50,
        width: "100%",
        fontSize: 16,
    },
});

export default LoginForm;
