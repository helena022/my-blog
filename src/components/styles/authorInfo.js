import { StyleSheet } from 'react-native';
import { defaultColors } from '../../utils/colors';

export const authorInfo = StyleSheet.create({
  authorInfoContainer: {
    paddingBottom: 20,
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: defaultColors.lightGrey,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailsContainer: {
    marginLeft: 15,
    alignSelf: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: defaultColors.primary,
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: defaultColors.darkGrey,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bio: {
    color: defaultColors.darkGrey,
    textAlign: 'center',
  },
});
