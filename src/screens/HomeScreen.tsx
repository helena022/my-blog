import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyBlogScreen')}>
        <Text>My Blog Posts</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PostEditorScreen')}
      >
        <Text>PostEditor</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;
