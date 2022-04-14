import React from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { styles } from '../styles/shared';

const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const goToSignIn = () => {
    navigation.navigate('SignInScreen');
  };
  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text>Sign Up Screen</Text>
      <TouchableOpacity onPress={goToSignIn}>
        <Text>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUpScreen;
