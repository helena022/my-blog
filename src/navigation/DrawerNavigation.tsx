import * as React from 'react';
import { DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import MyBlogScreen from '../screens/MyBlogScreen';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
      />
    </DrawerContentScrollView>
  );
}

export type DrawerParams = {
  HomeScreen: undefined;
  MyBlogScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParams>();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      // drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="MyBlogScreen" component={MyBlogScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
