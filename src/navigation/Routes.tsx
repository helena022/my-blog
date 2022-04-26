import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { supabase } from '../api/supabase';
import DrawerNavigation from './DrawerNavigation';
import { AuthScreenStack } from './AuthStack';

function Routes() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      {!session ? <AuthScreenStack /> : <DrawerNavigation />}
    </NavigationContainer>
  );
}

export default Routes;
