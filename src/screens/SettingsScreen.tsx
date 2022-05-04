import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { useAuth } from '../contexts/AuthContext';
import { View, Text, ActivityIndicator } from 'react-native';
import { Input, Button, Avatar } from '@rneui/themed';
import { settings } from '../styles/settings';

interface UserData {
  username: string;
  avatar_url: string;
  website: string;
  bio: string;
}

const SettingsScreen = () => {
  const { session, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const [username, setUsername] = useState('');

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setIsLoading(true);
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url, website, bio')
        .eq('id', user.id)
        .single();
      if (error && status !== 400) {
        throw error;
      }
      if (data) {
        setUserData(data);
        console.log('data: ', data);
      }
    } catch (error) {
      // TODO error handling
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setIsSubmitting(true);
      const updates = {
        id: user.id,
        username,
        //website,
        updated_at: new Date(),
      };
      const { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderUserInfo = ({ avatar_url, username }: { avatar_url: string; username: string }) => (
    <View style={settings.userInfoContainer}>
      <Avatar
        rounded
        size={100}
        // TODO add user avatar
        source={avatar_url ? { uri: avatar_url } : {}}
        icon={{ type: 'material', name: 'person' }}
        containerStyle={{ backgroundColor: 'grey' }}
      />
      <View style={settings.usernameContainer}>
        <Text style={settings.usernameText}>{username}</Text>
        <Text style={settings.emailText}>{user?.email}</Text>
      </View>
    </View>
  );

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    userData && (
      <View style={settings.settingsContainer}>
        {renderUserInfo(userData)}
        {/* <Input
        value={username}
        //leftIcon={{ type: 'material', name: 'lock-outline' }}
        placeholder="Username"
        autoComplete="password"
        onChangeText={(input) => setUsername(input)}
      /> */}
        {/* <Button title={'Save'} onPress={updateProfile} loading={isSubmitting} /> */}
      </View>
    )
  );
};

export default SettingsScreen;
