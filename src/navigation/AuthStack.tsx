import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { authTheme } from '../styles/themes/authTheme';
import { ThemeProvider } from '@rneui/themed';

export type AuthStackParams = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const AuthScreenStack = () => {
  return (
    <ThemeProvider theme={authTheme}>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="SignInScreen"
          options={{ headerShown: false }}
          component={SignInScreen}
        />
        <AuthStack.Screen
          name="SignUpScreen"
          options={{ headerShown: false }}
          component={SignUpScreen}
        />
      </AuthStack.Navigator>
    </ThemeProvider>
  );
};
