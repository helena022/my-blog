import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // common
  screenContainer: { flex: 1 },

  // authentication stack
  authContainer: { flex: 1, alignItems: 'center', justifyContent: 'space-between' },
  authInputContainer: {
    flex: 1,
    padding: 30,
    margin: 10,
    justifyContent: 'center',
  },
  authNavContainer: { padding: 30 },
});
