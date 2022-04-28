import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { SafeAreaView, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Text, Dialog } from '@rneui/themed';
import { supabase } from '../api/supabase';
import {
  hasValue,
  isEmailValid,
  isBetween,
  isPasswordSecure,
  valuesMatch,
} from '../utils/validations';
import { auth } from '../styles/auth';

const backgroundImage = '../assets/images/auth_background.jpg';

const errors = {
  isRequired: 'This field is required',
  invalidEmail: 'Email must be valid',
  passwordTooShort: 'Password must contain at least 8 characters',
  passwordNotSecure:
    'Password must contain at least 1 lowercase character, 1 uppercase character, 1 number and 1 special character (!@#$%^&*)',
  passwordsDontMatch: 'Passwords must match',
};

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorDialogVisible, setIsErrorDialogVisible] = useState(true);
  const [dialogErrorMessage, setDialogErrorMessage] = useState('');
  console.log(dialogErrorMessage);

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

    const isFormValid = true;
    // TODO remove hardcoded value
    //isEmailInputValid() && isPasswordInputValid() && isRepPasswordInputValid();
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
      }
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
    } else if (!isBetween(password.length, 1, 8)) {
      setPasswordErrorMessage(errors.passwordTooShort);
    } else if (!isPasswordSecure(password)) {
      setPasswordErrorMessage(errors.passwordNotSecure);
    } else {
      setPasswordErrorMessage('');
      isValid = true;
    }
    return isValid;
  };

  const isRepPasswordInputValid = (): boolean => {
    let isValid = false;
    if (!hasValue(password)) {
      setRepPasswordErrorMessage(errors.isRequired);
    } else if (!valuesMatch(password, repeatedPassword)) {
      setRepPasswordErrorMessage(errors.passwordsDontMatch);
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
              <Dialog.Title title="Error" titleStyle={auth.dialogTitle} />
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
