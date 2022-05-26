import { StyleSheet } from 'react-native';
import { defaultColors } from '../utils/colors';

export const myBlog = StyleSheet.create({
  screenContainer: {
    flexGrow: 1,
  },
  blogContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: defaultColors.white,
  },
});
