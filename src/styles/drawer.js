import { StyleSheet } from 'react-native';
import { defaultColors } from '../utils/colors';

export const drawer = StyleSheet.create({
  userInfoContainer: {
    paddingLeft: 10,
    paddingVertical: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lightGrey,
  },
  userInfo: {
    marginLeft: 10,
    marginTop: 10,
  },
  userInfoText: {
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  signOutBtnContainer: {
    marginVertical: 30,
  },
  signOutBtn: {
    color: defaultColors.primary,
  },
});
