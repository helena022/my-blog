import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
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
      <View style={styles.authContainer}>
        <View style={styles.authInputContainer}>
          <Text>Sign Up Screen</Text>
          <Text>Sign Up Inputs & Button</Text>
        </View>
        <View style={styles.authNavContainer}>
          <TouchableOpacity onPress={goToSignIn}>
            <Text>Already have an account? Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
