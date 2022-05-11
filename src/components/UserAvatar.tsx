import React from 'react';
import { useEffect, useState } from 'react';
import { defaultColors } from '../utils/colors';
import * as ImagePicker from 'react-native-image-picker';
import { supabase } from '../api/supabase';
import { View, TouchableOpacity, Text, ActivityIndicator, Alert } from 'react-native';
import { Icon, Avatar } from '@rneui/themed';
import { settings } from '../styles/settings';

export default function UserAvatar({ url, updateAvatar }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [pickerResponse, setPickerResponse] = useState(null);

  console.log('url: ', url);

  useEffect(() => {
    if (url) downloadAvatar(url);
  }, [url]);

  const downloadAvatar = async (path) => {
    console.log('downloading');
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path);
      if (error) {
        throw error;
      }
      console.log(data);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  };

  const editAvatar = async () => {
    await choosePhoto();
    //console.log(pickerResponse);
    await uploadAvatar();
  };

  const choosePhoto = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    await ImagePicker.launchImageLibrary(options, setPickerResponse);
  };

  const uploadAvatar = async () => {
    if (!pickerResponse) {
      throw new Error('You must select image to upload.');
    }
    try {
      setUploading(true);
      const file = pickerResponse?.assets[0];
      const fileExt = file.fileName.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }
      //updateAvatar(filePath);
    } catch (error) {
      alert(error);
    } finally {
      setUploading(false);
    }
  };

  const renderAvatar = () => (
    <View style={settings.avatarContainer}>
      {url ? (
        <Avatar
          rounded
          size={130}
          icon={{ type: 'material', name: 'person' }}
          source={{ uri: avatarUrl }}
          containerStyle={{ backgroundColor: 'grey' }}
        >
          {editButton()}
        </Avatar>
      ) : (
        <Avatar
          rounded
          size={130}
          icon={{ type: 'material', name: 'person' }}
          containerStyle={{ backgroundColor: 'grey' }}
        >
          {editButton()}
        </Avatar>
      )}
    </View>
  );

  const editButton = () => (
    <Avatar.Accessory
      style={{ backgroundColor: defaultColors.primary }}
      size={28}
      iconStyle={{ fontSize: 21 }}
      onPress={editAvatar}
    />
  );

  const renderUploadIndicator = () => (
    <View
      style={{
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="small" color={defaultColors.primary} />
      <Text style={{ marginLeft: 7, marginTop: 3, color: defaultColors.primary }}>
        Uploading...
      </Text>
    </View>
  );

  return (
    <View>
      {renderAvatar()}
      {uploading && renderUploadIndicator()}
    </View>
  );
}
