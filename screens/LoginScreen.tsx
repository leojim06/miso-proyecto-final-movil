import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator, Text } from 'react-native';
import Container from '../components/Container';
import LoginForm from '../components/forms/loginForm';
import { useTheme } from '../hooks';



export default function LoginScreen() {
  const { colors, sizes } = useTheme();

  // useEffect(() => {

  // }, [])

  // const getContent = () => {
  //   return <ActivityIndicator size="large" />
  // }

  return (
    <Container
      margin={sizes.md}
      color={colors.background}
    >
      <Container
        padding={sizes.padding}
        shadow={true}
        color={colors.card}
        center
      >
        <Text style={styles.title}>Bienvenido a SportApp</Text>
        <LoginForm />
      </Container>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
