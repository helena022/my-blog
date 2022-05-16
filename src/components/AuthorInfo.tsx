import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Icon } from '@rneui/themed';
import { defaultColors } from '../utils/colors';
import { authorInfo } from './styles/authorInfo';

interface AuthorInfoProps {
  avatarUrl: string;
  username: string;
  website: string;
  bio: string;
}

const AuthorInfo = ({ avatarUrl, username, website, bio }: AuthorInfoProps) => {
  const renderAvatar = () =>
    avatarUrl ? (
      <Avatar
        rounded
        size={70}
        icon={{ type: 'material', name: 'person' }}
        source={{ uri: avatarUrl }}
        containerStyle={{ backgroundColor: 'grey' }}
      />
    ) : (
      <Avatar
        rounded
        size={70}
        icon={{ type: 'material', name: 'person' }}
        containerStyle={{ backgroundColor: 'grey' }}
      />
    );

  return (
    <View style={authorInfo.authorInfoContainer}>
      <View style={authorInfo.infoContainer}>
        {renderAvatar()}
        <View style={authorInfo.detailsContainer}>
          <Text style={authorInfo.username}>{username}</Text>
          <View style={authorInfo.emailContainer}>
            <Icon
              name="link"
              type="material"
              size={19}
              color={defaultColors.grey}
              iconStyle={{ marginRight: 3 }}
            />
            <Text style={authorInfo.detail}>{website}</Text>
          </View>
        </View>
      </View>
      <Text style={authorInfo.bio}>{bio}</Text>
    </View>
  );
};

export default AuthorInfo;
