import { StyleSheet } from 'react-native';
import { defaultColors } from '../../utils/colors';

export const blogPostCard = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: defaultColors.lightGrey,
  },
  titleContainer: {
    minHeight: 50,
    paddingTop: 15,
    backgroundColor: defaultColors.primary,
  },
  title: {
    color: defaultColors.white,
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
  },
  contentContainer: {
    margin: 20,
  },
  content: {
    marginBottom: 10,
  },
  moreContainer: {
    alignSelf: 'flex-end',
  },
  more: {
    color: defaultColors.primary,
    fontWeight: '500',
  },
});
