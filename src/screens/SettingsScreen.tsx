import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { useAuth } from '../contexts/AuthContext';
import { ScrollView, View, Text, ActivityIndicator, Alert } from 'react-native';
import { Input, Button, Avatar, Icon } from '@rneui/themed';
import { alphanumericCharsOnly, hasValue, isBetween, isURLValid } from '../utils/validations';
import { errorMessages } from '../utils/errorMessages';
import TextInputField from '../components/TextInputField';
import { settings } from '../styles/settings';

interface UserData {
  username: string;
  avatar_url: string;
  website: string;
  bio: string;
}

const SettingsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { session, user } = useAuth();
  const [userData, setUserData] = useState(null);

  const [inputErrors, setInputErrors] = useState({
    username: '',
    website: '',
    bio: '',
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [websiteInput, setWebsiteInput] = useState('');

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
      }
    } catch (error) {
      // TODO error handling
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsername = async () => {
    validateUsername();
    const isUsernameValid = validateUsername();
    if (!isUsernameValid) return;
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
      setUsernameInput('');
      getProfile();
    }
  };

  const updateWebsiteURL = async () => {
    validateWebsiteURL();
    const isWebsiteURLValid = validateWebsiteURL();
    if (!isWebsiteURLValid) return;
    try {
      const updates = {
        id: user.id,
        website: websiteInput,
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
      setWebsiteInput('');
      getProfile();
    }
  };

  const validateWebsiteURL = () => {
    let isValid = false;
    if (!hasValue(websiteInput)) {
      setInputErrors({ ...inputErrors, website: errorMessages.isRequired });
    } else if (!isURLValid(websiteInput)) {
      setInputErrors({ ...inputErrors, website: errorMessages.URLNotValid });
    } else {
      setInputErrors({ ...inputErrors, website: '' });
      isValid = true;
    }
    return isValid;
  };

  const validateUsername = () => {
    let isValid = false;
    if (!hasValue(usernameInput)) {
      setInputErrors({ ...inputErrors, username: errorMessages.isRequired });
    } else if (!alphanumericCharsOnly(usernameInput)) {
      setInputErrors({ ...inputErrors, username: errorMessages.alphanumericCharsOnly });
    } else if (!isBetween(usernameInput.length, 3, 16)) {
      setInputErrors({ ...inputErrors, username: errorMessages.usernameCharLimit });
    } else {
      setInputErrors({ ...inputErrors, username: '' });
      isValid = true;
    }
    return isValid;
  };

  const clearErrors = (fieldName: string): void => {
    if (fieldName === 'username') {
      setInputErrors({ ...inputErrors, username: '' });
    }
    if (fieldName === 'website') {
      setInputErrors({ ...inputErrors, website: '' });
    }
  };

  const renderUserInfo = ({ avatar_url, username }: { avatar_url: string; username: string }) => (
    <View style={settings.userInfoContainer}>
      <Avatar
        rounded
        size={120}
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
      <ScrollView>
        <View style={settings.settingsContainer}>
          {renderUserInfo(userData)}
          <View style={settings.userDataContainer}>
            <TextInputField
              fieldName="username"
              label="Username"
              placeholder="Set A New Username"
              labelValue={userData.username}
              inputValue={usernameInput}
              setInputValue={setUsernameInput}
              saveChanges={updateUsername}
              error={inputErrors.username}
              clearErrors={clearErrors}
            />
            <TextInputField
              fieldName="website"
              label="Website"
              placeholder="Set A New Website URL"
              labelValue={userData.website}
              inputValue={websiteInput}
              setInputValue={setWebsiteInput}
              saveChanges={updateWebsiteURL}
              error={inputErrors.website}
              clearErrors={clearErrors}
            />
            {/* <TextInputField label="Bio" labelValue={userData.bio} /> */}
          </View>
        </View>
      </ScrollView>
    )
  );
};

export default SettingsScreen;
