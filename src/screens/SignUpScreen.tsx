import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { supabase } from '../api/supabase';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { SafeAreaView, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Text, Dialog } from '@rneui/themed';
import {
  hasValue,
  isEmailValid,
  isBetween,
  isPasswordSecure,
  valuesMatch,
  isLongerThan,
} from '../utils/validations';
import { errorMessages } from '../utils/errorMessages';
import { auth } from '../styles/auth';

const backgroundImage = '../assets/images/auth_background.jpg';

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorDialogVisible, setIsErrorDialogVisible] = useState(false);
  const [dialogErrorMessage, setDialogErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [repPasswordErrorMessage, setRepPasswordErrorMessage] = useState('');

  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const goToSignIn = () => {
    navigation.navigate('SignInScreen');
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

  const handleRepPasswordChange = (input: string) => {
    if (repPasswordErrorMessage) {
      setRepPasswordErrorMessage('');
    }
    setRepeatedPassword(input);
  };

  const handleSignUp = async () => {
    isEmailInputValid();
    isPasswordInputValid();
    isRepPasswordInputValid();

    const isFormValid: boolean =
      isEmailInputValid() && isPasswordInputValid() && isRepPasswordInputValid();

    if (isFormValid) {
      try {
        setIsLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      } catch (error) {
        setIsErrorDialogVisible(true);
        setDialogErrorMessage(error.message);
      } finally {
        setIsLoading(false);
        navigation.navigate('SignInScreen');
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
    } else if (!isLongerThan(password.length, 7)) {
      setPasswordErrorMessage(errorMessages.passwordTooShort);
    } else if (!isPasswordSecure(password)) {
      setPasswordErrorMessage(errorMessages.passwordNotSecure);
    } else {
      setPasswordErrorMessage('');
      isValid = true;
    }
    return isValid;
  };

  const isRepPasswordInputValid = (): boolean => {
    let isValid = false;
    if (!hasValue(password)) {
      setRepPasswordErrorMessage(errorMessages.isRequired);
    } else if (!valuesMatch(password, repeatedPassword)) {
      setRepPasswordErrorMessage(errorMessages.passwordsDontMatch);
    } else {
      setRepPasswordErrorMessage('');
      isValid = true;
    }
    return isValid;
  };

  return (
    <SafeAreaView style={auth.screenContainer}>
      <ImageBackground source={require(backgroundImage)} resizeMode={'stretch'} style={{ flex: 1 }}>
        <View style={auth.authContainer}>
          <View style={auth.authInputContainer}>
            <Text h2>Create A New Account</Text>
            <View>
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
                autoComplete="password-new"
                secureTextEntry={true}
                errorMessage={passwordErrorMessage}
                onChangeText={(input) => handlePasswordChange(input)}
              />
              <Input
                value={repeatedPassword}
                leftIcon={{ type: 'material', name: 'lock-outline' }}
                placeholder="Confirm Password"
                autoComplete="password-new"
                secureTextEntry={true}
                errorMessage={repPasswordErrorMessage}
                onChangeText={(input) => handleRepPasswordChange(input)}
              />
            </View>
            <Button title={'Sign Up'} onPress={handleSignUp} loading={isLoading} />
            <Dialog isVisible={isErrorDialogVisible}>
              <Dialog.Title title="Error Signing Up" titleStyle={auth.dialogTitle} />
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
            <TouchableOpacity onPress={goToSignIn}>
              <Text>Already have an account? Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUpScreen;
