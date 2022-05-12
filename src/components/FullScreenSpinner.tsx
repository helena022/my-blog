import React from 'react';
import { ActivityIndicator } from 'react-native';
import { defaultColors } from '../utils/colors';

const FullScreenSpinner = () => (
  <ActivityIndicator
    size="large"
    color={defaultColors.primary}
    style={{
      position: 'absolute',
      zIndex: 10,
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      backgroundColor: 'rgba(0,0,0,.1)',
    }}
  />
);

export default FullScreenSpinner;
