import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

import LoginForm from '../components/forms/loginForm';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {

  // useEffect(() => {
    
  // }, [])

  // const getContent = () => {
  //   return <ActivityIndicator size="large" />
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a SportApp</Text>
      <LoginForm />
    </View>
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
