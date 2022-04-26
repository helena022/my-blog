import { StyleSheet } from 'react-native';
import { defaultColors } from '../utils/colors';

export const auth = StyleSheet.create({
  screenContainer: { flex: 1 },

  // authentication stack
  authContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authInputContainer: {
    width: '100%',
    flex: 1,
    padding: 30,
    margin: 10,
    justifyContent: 'center',
  },
  authNavContainer: { padding: 30 },
  passwordResetLinkContainer: {
    paddingTop: 10,
  },
  passwordResetLink: {
    color: defaultColors.primary,
    textAlign: 'center',
  },
});
