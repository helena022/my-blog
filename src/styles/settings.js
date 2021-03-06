import { StyleSheet } from 'react-native';
import { defaultColors } from '../utils/colors';

export const settings = StyleSheet.create({
  // User Info Style
  settingsContainer: {
    margin: 15,
    borderRadius: 10,
    padding: 20,
    backgroundColor: defaultColors.white,
  },
  userInfoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lightGrey,
  },
  usernameContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 21,
  },
  emailText: {
    color: defaultColors.grey,
    fontSize: 15,
  },
  editContainer: {
    marginTop: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  edit: {
    color: defaultColors.primary,
    marginRight: 5,
  },
  avatarContainer: {
    alignSelf: 'center',
  },
});
