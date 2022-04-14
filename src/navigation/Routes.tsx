import * as React from 'react';
import DrawerNavigation from './DrawerNavigation';
import { AuthScreenStack } from './AuthStack';

function Routes() {
  // return <DrawerNavigation />;
  return <AuthScreenStack />;
}

export default Routes;
