import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useProfileContext } from '../contexts/ProfileContext';
import { ScrollView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Input, Button, Avatar, Icon } from '@rneui/themed';
import { alphanumericCharsOnly, hasValue, isBetween, isURLValid } from '../utils/validations';
import { errorMessages } from '../utils/errorMessages';
import TextInputField from '../components/TextInputField';
import { defaultColors } from '../utils/colors';
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
  const { profileData, fetchProfile } = useProfileContext();

  const [inputErrors, setInputErrors] = useState({
    username: '',
    website: '',
    bio: '',
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [websiteInput, setWebsiteInput] = useState('');
  const [bioInput, setBioInput] = useState('');

  const updateUsername = async () => {
    const isUsernameValid = validateUsername();
    if (!isUsernameValid) return;
    try {
      setIsLoading(true);
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
      setIsLoading(false);
      setUsernameInput('');
      fetchProfile();
    }
  };

  const updateWebsiteURL = async () => {
    const isWebsiteURLValid = validateWebsiteURL();
    if (!isWebsiteURLValid) return;
    try {
      setIsLoading(true);
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
      setIsLoading(false);
      setWebsiteInput('');
      fetchProfile();
    }
  };

  const updateBio = async () => {
    const isBioValid = validateBio();
    if (!isBioValid) return;
    try {
      setIsLoading(true);
      const updates = {
        id: user.id,
        bio: bioInput,
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
      setIsLoading(false);
      setBioInput('');
      fetchProfile();
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

  const validateBio = () => {
    let isValid = false;
    if (!hasValue(bioInput)) {
      setInputErrors({ ...inputErrors, bio: errorMessages.isRequired });
    } else {
      setInputErrors({ ...inputErrors, bio: '' });
      isValid = true;
    }
    return isValid;
  };

  const clearErrors = (fieldName: string): void => {
    setInputErrors({ ...inputErrors, [fieldName]: '' });
  };

  const renderUserInfo = () => (
    <View style={settings.userInfoContainer}>
      <TouchableOpacity onPress={() => {}} style={settings.editContainer}>
        <Text style={settings.edit}>Edit</Text>
        <Icon name="edit" size={16} color={defaultColors.primary} />
      </TouchableOpacity>
      {profileData && profileData.avatar_url ? (
        <Avatar
          rounded
          size={120}
          icon={{ type: 'material', name: 'person' }}
          source={{ uri: profileData.avatar_url }}
          containerStyle={{ backgroundColor: 'grey' }}
        />
      ) : (
        <Avatar
          rounded
          size={120}
          icon={{ type: 'material', name: 'person' }}
          containerStyle={{ backgroundColor: 'grey' }}
        />
      )}

      <View style={settings.usernameContainer}>
        <Text style={settings.usernameText}>{profileData ? profileData.username : '-'}</Text>
        <Text style={settings.emailText}>{user?.email}</Text>
      </View>
    </View>
  );

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScrollView>
      <View style={settings.settingsContainer}>
        {renderUserInfo()}
        <View>
          <TextInputField
            fieldName="username"
            label="Username"
            placeholder="Set A New Username"
            labelValue={profileData ? profileData.username : '-'}
            multiline={false}
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
            labelValue={profileData ? profileData.website : '-'}
            multiline={false}
            inputValue={websiteInput}
            setInputValue={setWebsiteInput}
            saveChanges={updateWebsiteURL}
            error={inputErrors.website}
            clearErrors={clearErrors}
          />
          <TextInputField
            fieldName="bio"
            label="Bio"
            placeholder="Set A New Bio"
            labelValue={profileData ? profileData.bio : '-'}
            multiline={true}
            inputValue={bioInput}
            setInputValue={setBioInput}
            saveChanges={updateBio}
            error={inputErrors.bio}
            clearErrors={clearErrors}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
