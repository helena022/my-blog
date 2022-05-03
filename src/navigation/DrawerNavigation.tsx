import * as React from 'react';
import { supabase } from '../api/supabase';
import { Text, ToastAndroid, View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Avatar, Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import MyBlogScreen from '../screens/MyBlogScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { defaultColors } from '../utils/colors';
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
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={drawer.userInfoContainer}>
          <Avatar
            rounded
            size={64}
            icon={{ type: 'material', name: 'person' }}
            containerStyle={{ backgroundColor: 'grey' }}
          />
          <View style={drawer.userInfo}>
            {/* TODO fetch username from supabase */}
            <Text style={drawer.userInfoText}>USERNAME</Text>
            <Text>{user?.email}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={drawer.signOutBtnContainer}>
        <Button title="Sign Out" type="clear" titleStyle={drawer.signOutBtn} onPress={Logout} />
      </View>
    </View>
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
      screenOptions={{
        drawerActiveBackgroundColor: defaultColors.lightestGrey,
        drawerActiveTintColor: defaultColors.primary,
        drawerLabelStyle: {
          marginLeft: -20,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <Icon name="home" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MyBlogScreen"
        component={MyBlogScreen}
        options={{
          title: 'My Blog',
          drawerIcon: ({ color }) => <Icon name="book" size={21} color={color} />,
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => <Icon name="settings" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
