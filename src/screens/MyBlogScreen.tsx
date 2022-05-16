import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import FullScreenSpinner from '../components/FullScreenSpinner';
import Blog from '../components/Blog';
import { myBlog } from '../styles/myBlog';

const MyBlogScreen = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authorId, setAuthorId] = useState<null | number>(null);
  return (
    <View style={myBlog.screenContainer}>
      {isLoading && <FullScreenSpinner />}
      <View style={myBlog.blogContainer}>
        <Blog authorId={user.id} />
      </View>
    </View>
  );
};

export default MyBlogScreen;
