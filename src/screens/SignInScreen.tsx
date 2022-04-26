import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { ImageBackground, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Button, Text, Input } from '@rneui/themed';
import { auth } from '../styles/auth';

const backgroundImage = '../assets/images/auth_background.jpg';

const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const goToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  return (
    <SafeAreaView style={auth.screenContainer}>
      <ImageBackground source={require(backgroundImage)} resizeMode={'stretch'} style={{ flex: 1 }}>
        <View style={auth.authContainer}>
          <View style={auth.authInputContainer}>
            <Text h1>&#8212; My Blog &#8212;</Text>
            <Input
              leftIcon={{ type: 'material', name: 'person' }}
              placeholder="Email"
              autoComplete="email"
            />
            <Input
              leftIcon={{ type: 'material', name: 'lock' }}
              placeholder="Password"
              autoComplete="password"
              secureTextEntry={true}
            />
            <Button title={'Sign In'} />
            <TouchableOpacity style={auth.passwordResetLinkContainer}>
              <Text style={auth.passwordResetLink}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <View style={auth.authNavContainer}>
            <TouchableOpacity onPress={goToSignUp}>
              <Text>Don&apos;t have an account? Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignInScreen;
