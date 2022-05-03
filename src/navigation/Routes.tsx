import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import DrawerNavigation from './DrawerNavigation';
import { AuthScreenStack } from './AuthStack';

function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>{!user ? <AuthScreenStack /> : <DrawerNavigation />}</NavigationContainer>
  );
}

export default Routes;
