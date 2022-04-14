import * as React from 'react';
import { Text, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import MyBlogScreen from '../screens/MyBlogScreen';

// TODO props interface for drawer

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const LogoutUser = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    // TODO logout
  };
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text style={{ color: 'black' }}>User Info</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
      />
      <DrawerItem label="LOG OUT" onPress={LogoutUser} />
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="MyBlogScreen" component={MyBlogScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
