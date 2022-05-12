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
import { defaultColors } from '../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../contexts/AuthContext';
import { useProfileContext } from '../contexts/ProfileContext';
import HomeScreen from '../screens/HomeScreen';
import MyBlogScreen from '../screens/MyBlogScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PostEditorScreen from '../screens/PostEditorScreen';
import { drawer } from '../styles/drawer';

// TODO props interface for drawer

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { profileData } = useProfileContext();

  const Logout = async () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      alert(error);
    } finally {
      // TODO toast for ios
      ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={drawer.userInfoContainer}>
          {profileData && profileData.avatar_url ? (
            <Avatar
              rounded
              size={64}
              icon={{ type: 'material', name: 'person' }}
              source={{ uri: profileData.avatar_url }}
              containerStyle={{ backgroundColor: 'grey' }}
            />
          ) : (
            <Avatar
              rounded
              size={64}
              icon={{ type: 'material', name: 'person' }}
              containerStyle={{ backgroundColor: 'grey' }}
            />
          )}

          <View style={drawer.userInfo}>
            <Text style={drawer.userInfoText}>{profileData ? profileData.username : '-'}</Text>
            <Text>{user?.email}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={drawer.signOutBtnContainer}>
        <Button
          title="Sign Out"
          type="clear"
          icon={{ name: 'logout', type: 'material', size: 20, color: defaultColors.primary }}
          titleStyle={drawer.signOutBtn}
          onPress={Logout}
        />
      </View>
    </View>
  );
}

export type DrawerParams = {
  HomeScreen: undefined;
  MyBlogScreen: undefined;
  PostEditorScreen: undefined;
  SettingsScreen: undefined;
};

const Drawer = createDrawerNavigator<DrawerParams>();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerTintColor: defaultColors.primary,
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
          headerTitleStyle: {
            color: defaultColors.primary,
          },
          drawerIcon: ({ color }) => <Icon name="home" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="MyBlogScreen"
        component={MyBlogScreen}
        options={{
          title: 'My Blog',
          headerTitleStyle: {
            color: defaultColors.primary,
          },
          drawerIcon: ({ color }) => <Icon name="book" size={21} color={color} />,
        }}
      />
      <Drawer.Screen
        name="PostEditorScreen"
        component={PostEditorScreen}
        options={{
          title: 'Post Editor',
          headerTitleStyle: {
            color: defaultColors.primary,
          },
          drawerIcon: ({ color }) => <Icon name="edit" size={21} color={color} />,
        }}
      />
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerTitleStyle: {
            color: defaultColors.primary,
          },
          drawerIcon: ({ color }) => <Icon name="settings" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
