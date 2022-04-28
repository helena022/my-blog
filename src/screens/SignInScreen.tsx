import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { hasValue, isEmailValid } from '../utils/validations';
import { ImageBackground, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Button, Text, Input } from '@rneui/themed';
import { auth } from '../styles/auth';

const backgroundImage = '../assets/images/auth_background.jpg';

const errors = {
  isRequired: 'This field is required',
  invalidEmail: 'Email must be valid',
};

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const goToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleEmailChange = (input: string) => {
    if (emailErrorMessage) {
      setEmailErrorMessage('');
    }
    setEmail(input);
  };

  const handlePasswordChange = (input: string) => {
    if (passwordErrorMessage) {
      setPasswordErrorMessage('');
    }
    setPassword(input);
  };

  const handleSignIn = () => {
    isEmailInputValid();
    isPasswordInputValid();

    const isFormValid: boolean = isEmailInputValid() && isPasswordInputValid();
    if (isFormValid) {
      console.log('valid sign in');
    } else {
      console.log('invalid sign in');
    }
  };

  const isEmailInputValid = (): boolean => {
    let isValid = false;
    if (!hasValue(email)) {
      setEmailErrorMessage(errors.isRequired);
    } else if (!isEmailValid(email)) {
      setEmailErrorMessage(errors.invalidEmail);
    } else {
      setEmailErrorMessage('');
      isValid = true;
    }
    return isValid;
  };

  const isPasswordInputValid = (): boolean => {
    let isValid = false;
    if (!hasValue(password)) {
      setPasswordErrorMessage(errors.isRequired);
    } else {
      setPasswordErrorMessage('');
      isValid = true;
    }
    return isValid;
  };

  return (
    <SafeAreaView style={auth.screenContainer}>
      <ImageBackground source={require(backgroundImage)} resizeMode={'stretch'} style={{ flex: 1 }}>
        <View style={auth.authContainer}>
          <View style={auth.authInputContainer}>
            <Text h1>&#8212; My Blog &#8212;</Text>
            <Input
              value={email}
              leftIcon={{ type: 'material', name: 'person-outline' }}
              placeholder="Email"
              autoComplete="email"
              errorMessage={emailErrorMessage}
              onChangeText={(input) => handleEmailChange(input)}
            />
            <Input
              value={password}
              leftIcon={{ type: 'material', name: 'lock-outline' }}
              placeholder="Password"
              autoComplete="password"
              secureTextEntry={true}
              errorMessage={passwordErrorMessage}
              onChangeText={(input) => handlePasswordChange(input)}
            />
            <Button title={'Sign In'} onPress={handleSignIn} />
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
