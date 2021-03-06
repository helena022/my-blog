import { StyleSheet } from 'react-native';
import { defaultColors } from '../utils/colors';

export const postEditor = StyleSheet.create({
  editorScreenContainer: {
    flexGrow: 1,
    backgroundColor: defaultColors.white,
  },
  editorContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 30,
  },
  titleInputContainer: {
    marginTop: 5,
    borderBottomColor: defaultColors.lightGrey,
  },
  titleInput: { fontSize: 20, fontWeight: '500', marginBottom: 5, textAlign: 'center' },
  contentInputContainer: {
    borderBottomWidth: 0,
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
