import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import DrawerNavigation from './DrawerNavigation';
import { AuthScreenStack } from './AuthStack';
import { ProfileProvider } from '../contexts/ProfileContext';

function Routes() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {!user ? (
        <AuthScreenStack />
      ) : (
        <ProfileProvider>
          <DrawerNavigation />
        </ProfileProvider>
      )}
    </NavigationContainer>
  );
}

export default Routes;
