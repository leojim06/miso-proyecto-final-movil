import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { Block, Text } from '../components';
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
    <Block safe>
      <Block
        flex={1}
        padding={sizes.md}
        color={colors.card}
        justify={'center'}
      // align={'center'}
      >
        <Text h3>Bienvenido a SportApp</Text>
        <LoginForm />
      </Block>
    </Block>
  );
}
