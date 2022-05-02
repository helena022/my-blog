import * as React from 'react';
import { supabase } from '../api/supabase';
import { Text, ToastAndroid, View, SafeAreaView } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar, Button } from '@rneui/themed';
import HomeScreen from '../screens/HomeScreen';
import MyBlogScreen from '../screens/MyBlogScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { drawer } from '../styles/drawer';

// TODO props interface for drawer

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const user = supabase.auth.user();

  const Logout = async () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      // TODO toast for ios
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View>
        <Button title="Sign Out" type="clear" onPress={Logout} />
      </View>
    </SafeAreaView>
  );
}

export type DrawerParams = {
  HomeScreen: undefined;
  MyBlogScreen: undefined;
  SettingsScreen: undefined;
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
      <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
