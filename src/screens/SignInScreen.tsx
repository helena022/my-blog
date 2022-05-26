import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { supabase } from '../api/supabase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { hasValue, isEmailValid } from '../utils/validations';
import { errorMessages } from '../utils/errorMessages';
import { ImageBackground, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { Button, Text, Input, Dialog } from '@rneui/themed';
import { auth } from '../styles/auth';

const backgroundImage = '../assets/images/auth_background.jpg';

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorDialogVisible, setIsErrorDialogVisible] = useState(false);
  const [dialogErrorMessage, setDialogErrorMessage] = useState('');

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

  const handleSignIn = async () => {
    isEmailInputValid();
    isPasswordInputValid();

    const isFormValid: boolean = isEmailInputValid() && isPasswordInputValid();

    if (isFormValid) {
      try {
        setIsLoading(true);
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) throw error;
      } catch (error) {
        setPassword('');
        setIsErrorDialogVisible(true);
        setDialogErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isEmailInputValid = (): boolean => {
    let isValid = false;
    if (!hasValue(email)) {
      setEmailErrorMessage(errorMessages.isRequired);
    } else if (!isEmailValid(email)) {
      setEmailErrorMessage(errorMessages.invalidEmail);
    } else {
      setEmailErrorMessage('');
      isValid = true;
    }
    return isValid;
  };

  const isPasswordInputValid = (): boolean => {
    let isValid = false;
    if (!hasValue(password)) {
      setPasswordErrorMessage(errorMessages.isRequired);
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
            <Button title={'Sign In'} onPress={handleSignIn} loading={isLoading} />
            <TouchableOpacity style={auth.passwordResetLinkContainer}>
              <Text style={auth.passwordResetLink}>Forgot password?</Text>
            </TouchableOpacity>
            <Dialog isVisible={isErrorDialogVisible}>
              <Dialog.Title title="Error Signing In" titleStyle={auth.dialogTitle} />
              <Text style={auth.dialogText}>{dialogErrorMessage}</Text>
              <Dialog.Actions>
                <Dialog.Button
                  title="Ok"
                  titleStyle={auth.dialogButton}
                  onPress={() => setIsErrorDialogVisible(false)}
                />
              </Dialog.Actions>
            </Dialog>
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
