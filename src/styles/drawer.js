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
  headerIconsContainer: {
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  saveBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  saveText: {
    textTransform: 'uppercase',
    color: defaultColors.primary,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
});
