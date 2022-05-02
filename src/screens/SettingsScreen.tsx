import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const SettingsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <Text>Settings</Text>
  );
};

export default SettingsScreen;
