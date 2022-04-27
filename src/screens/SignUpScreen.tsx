import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParams } from '../navigation/AuthStack';
import { SafeAreaView, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Button, Input, Text } from '@rneui/themed';
import { auth } from '../styles/auth';

const backgroundImage = '../assets/images/auth_background.jpg';

const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParams>>();
  const goToSignIn = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <SafeAreaView style={auth.screenContainer}>
      <ImageBackground source={require(backgroundImage)} resizeMode={'stretch'} style={{ flex: 1 }}>
        <View style={auth.authContainer}>
          <View style={auth.authInputContainer}>
            <Text h2>Create A New Account</Text>
            <View>
              <Input
                leftIcon={{ type: 'material', name: 'person' }}
                placeholder="Email"
                autoComplete="email"
              />
              <Input
                leftIcon={{ type: 'material', name: 'lock' }}
                placeholder="Password"
                autoComplete="password-new"
                secureTextEntry={true}
              />
              <Input
                leftIcon={{ type: 'material', name: 'lock-outline' }}
                placeholder="Confirm Password"
                autoComplete="password-new"
                secureTextEntry={true}
              />
            </View>
            <Button title={'Sign Up'} />
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
