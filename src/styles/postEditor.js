import { StyleSheet } from 'react-native';
import { defaultColors } from '../utils/colors';

export const postEditor = StyleSheet.create({
  editorScreenContainer: {
    flexGrow: 1,
  },
  editorContainer: {
    flex: 1,
    margin: 15,
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    backgroundColor: defaultColors.white,
  },
  titleInputContainer: {
    marginTop: 5,
    borderBottomColor: defaultColors.lightGrey,
  },
  titleInput: { fontSize: 20, fontWeight: '500', marginBottom: 5, textAlign: 'center' },
  contentInputContainer: {
    borderBottomWidth: 0,
  },
});
