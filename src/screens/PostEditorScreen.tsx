import React, { Fragment, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from '@rneui/themed';
import FullScreenSpinner from '../components/FullScreenSpinner';
import { postEditor } from '../styles/postEditor';

interface Post {
  title: string;
  content: string;
}

const PostEditorScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [post, setPost] = useState<Post>({ title: '', content: '' });

  const handleTitleChange = (input: string) => {
    setPost({ ...post, title: input });
  };

  const handleContentChange = (input: string) => {
    setPost({ ...post, content: input });
  };

  return (
    <ScrollView contentContainerStyle={postEditor.editorScreenContainer}>
      {isLoading && <FullScreenSpinner />}
      <View style={postEditor.editorContainer}>
        <Input
          value={post.title}
          multiline={true}
          placeholder="Post Title"
          onChangeText={(input) => handleTitleChange(input)}
          inputStyle={postEditor.titleInput}
          inputContainerStyle={postEditor.titleInputContainer}
          shake={() => {}}
        />
        <Input
          value={post.content}
          multiline={true}
          inputContainerStyle={postEditor.contentInputContainer}
          placeholder="Body"
          onChangeText={(input) => handleContentChange(input)}
          shake={() => {}}
        />
      </View>
    </ScrollView>
  );
};

export default PostEditorScreen;
