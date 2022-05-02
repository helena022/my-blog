import { createTheme } from '@rneui/themed';
import { defaultColors } from '../../utils/colors';

export const authTheme = createTheme({
  Text: {
    style: {
      color: defaultColors.lightestGrey,
      letterSpacing: 0.5,
    },
    h1Style: {
      color: defaultColors.white,
      fontSize: 52,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 40,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 3,
    },
    h2Style: {
      color: defaultColors.white,
      fontSize: 42,
      fontWeight: '500',
      textAlign: 'center',
      marginBottom: 20,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 2,
    },
  },
  Input: {
    inputStyle: {
      color: defaultColors.lightestGrey,
      marginLeft: 5,
    },
    placeholderTextColor: defaultColors.lightGrey,
    inputContainerStyle: {
      borderBottomWidth: 2,
    },
    leftIcon: {
      iconStyle: {
        color: defaultColors.lightestGrey,
      },
    },
    errorStyle: {
      color: defaultColors.danger,
      fontSize: 13,
    },
  },
  Button: {
    buttonStyle: {
      alignSelf: 'center',
      marginTop: 10,
      width: '95%',
      backgroundColor: defaultColors.primary,
      borderRadius: 2,
    },
    titleStyle: {
      fontWeight: '500',
      fontSize: 19,
      textTransform: 'uppercase',
      letterSpacing: 0.8,
    },
  },
});
