import React, { useState } from 'react';
import { supabase } from '../api/supabase';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Icon } from '@rneui/themed';
import { defaultColors } from '../utils/colors';
import { hasValue } from '../utils/validations';
import { errorMessages } from '../utils/errorMessages';
import { useAuth } from '../contexts/AuthContext';
import FullScreenSpinner from '../components/FullScreenSpinner';
import { postEditor } from '../styles/postEditor';

interface Post {
  title: string;
  content: string;
}

const PostEditorScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);
  const [post, setPost] = useState<Post>({ title: '', content: '' });

  const [titleErrorMsg, setTitleErrorMsg] = useState<string>('');
  const [contentErrorMsg, setContentErrorMsg] = useState<string>('');

  const handleTitleChange = (input: string) => {
    setPost({ ...post, title: input });
    setTitleErrorMsg('');
  };

  const handleContentChange = (input: string) => {
    setPost({ ...post, content: input });
    setContentErrorMsg('');
  };

  React.useLayoutEffect(() => {
    const validateTitle = () => {
      let isValid = false;
      if (!hasValue(post.title)) {
        setTitleErrorMsg(errorMessages.isRequired);
      } else {
        setTitleErrorMsg('');
        isValid = true;
      }
      return isValid;
    };

    const validateContent = () => {
      let isValid = false;
      if (!hasValue(post.content)) {
        setContentErrorMsg(errorMessages.isRequired);
      } else {
        setContentErrorMsg('');
        isValid = true;
      }
      return isValid;
    };

    const createPost = async () => {
      const isTitleValid = validateTitle();
      const isContentValid = validateContent();
      const isFormValid = isTitleValid && isContentValid;
      if (!isFormValid) return;
      try {
        setIsLoading(true);
        const newPost = { user_id: user.id, title: post.title, content: post.content };
        const { error } = await supabase.from('posts').insert([newPost]).single();
        if (error) {
          throw error;
        }
      } catch (error) {
        alert('Something went wrong. \nPlease try again.');
      } finally {
        setPost({ title: '', content: '' });
        setIsLoading(false);
        navigation.navigate('MyBlogScreen');
      }
    };

    navigation.setOptions({
      headerRight: () => (
        <View style={postEditor.headerIconsContainer}>
          <TouchableOpacity style={postEditor.saveBtnContainer} onPress={createPost}>
            <Icon name="save" color={defaultColors.primary} size={18} />
            <Text style={postEditor.saveText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('additional options')}>
            <Icon name="keyboard-control" color={defaultColors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, post, user]);

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
          errorMessage={titleErrorMsg}
        />
        <Input
          value={post.content}
          multiline={true}
          inputContainerStyle={postEditor.contentInputContainer}
          placeholder="Body"
          onChangeText={(input) => handleContentChange(input)}
          shake={() => {}}
          errorMessage={contentErrorMsg}
        />
      </View>
    </ScrollView>
  );
};

export default PostEditorScreen;
