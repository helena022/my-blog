import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

export type AuthStackParams = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const AuthScreenStack = () => {
  return (
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
  );
};
