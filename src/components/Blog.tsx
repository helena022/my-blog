import React, { useEffect, useState } from 'react';
import { supabase } from '../api/supabase';
import { View, Text } from 'react-native';
import AuthorInfo from './AuthorInfo';

interface BlogProps {
  authorId: string;
}

const Blog = ({ authorId }: BlogProps) => {
  const [info, setInfo] = useState<null | object>(null);
  const [posts, setPosts] = useState<null | object>(null);

  useEffect(() => {
    void fetchAuthorInfo();
    void fetchPosts();
  }, []);

  const fetchAuthorInfo = async () => {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, avatar_url, website, bio')
        .eq('id', authorId)
        .single();
      if (error && status !== 400) {
        throw error;
      }
      if (data) {
        setInfo(data);
      }
    } catch (error) {
      // TODO error handling
      alert(error.message);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error, status } = await supabase.from('posts').select().eq('user_id', authorId);
      if (error && status !== 400) {
        throw error;
      }
      if (data) {
        setPosts(data);
        console.log(posts);
      }
    } catch (error) {
      // TODO error handling
      alert(error.message);
    }
  };

  // TODO user doesn't have public profile yet error message
  return (
    info && (
      <View>
        <AuthorInfo
          avatarUrl={info?.avatar_url}
          username={info?.username}
          website={info?.website}
          bio={info.bio}
        />
      </View>
    )
  );
};

export default Blog;
