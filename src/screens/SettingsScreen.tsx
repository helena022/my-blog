import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ScrollView, View, Text, ActivityIndicator, Alert } from 'react-native';
import { Input, Button, Avatar, Icon } from '@rneui/themed';
import TextInputField from '../components/TextInputField';
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

  const [usernameInput, setUsernameInput] = useState({ username: '' });

  console.log(usernameInput);

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

  const updateUsername = async () => {
    try {
      const updates = {
        id: user.id,
        username: usernameInput,
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
      console.log('done');
    }
  };

  // const updateProfilee = async () => {
  //   try {
  //     setIsSubmitting(true);
  //     const updates = {
  //       id: user.id,
  //       username,
  //       //website,
  //       updated_at: new Date(),
  //     };
  //     const { error } = await supabase.from('profiles').upsert(updates, {
  //       returning: 'minimal',
  //     });
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const renderUserInfo = ({ avatar_url, username }: { avatar_url: string; username: string }) => (
    <View style={settings.userInfoContainer}>
      <Avatar
        rounded
        size={100}
        // TODO add user avatar
        source={
          true
            ? { uri: 'https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553__340.jpg' }
            : {}
        }
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
      <ScrollView>
        <View style={settings.settingsContainer}>
          {renderUserInfo(userData)}
          {console.log(usernameInput)}
          <View style={settings.userDataContainer}>
            <TextInputField
              label="Username"
              labelValue={userData.username}
              inputValue={usernameInput}
              setInputValue={setUsernameInput}
              saveChanges={updateUsername}
            />
            {/* <TextInputField label="Website" labelValue={userData.website} />
            <TextInputField label="Bio" labelValue={userData.bio} /> */}
          </View>
        </View>
      </ScrollView>
    )
  );
};

export default SettingsScreen;
