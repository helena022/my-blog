import { StyleSheet } from 'react-native';
import { defaultColors } from '../utils/colors';

export const drawer = StyleSheet.create({
  drawerContainer: {
    padding: 10,
  },
  userInfoContainer: {
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lightGrey,
    flexDirection: 'row',
  },
  userInfo: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  screenListContainer: {
    borderWidth: 1,
  },
});
