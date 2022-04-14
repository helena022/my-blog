import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { styles } from '../styles/shared';

const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const goToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text>Sign In Screen</Text>
      <TouchableOpacity onPress={goToSignUp}>
        <Text>Don&apos;t have an account? Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignInScreen;
