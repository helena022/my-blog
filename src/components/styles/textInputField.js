import { StyleSheet } from 'react-native';
import { defaultColors } from '../../utils/colors';

export const textInput = StyleSheet.create({
  textInputContainer: {
    //marginVertical: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: defaultColors.lightestGrey,
  },
  userDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelContainer: { flexDirection: 'row', flexWrap: 'wrap', maxWidth: '80%' },
  label: { fontWeight: 'bold', fontSize: 17, marginRight: 5 },
  labelValue: { fontSize: 17, lineHeight: 21 },
  editContainerSingleLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editContainerMultiline: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  edit: { marginRight: 5, color: defaultColors.primary },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  save: { fontSize: 15, color: defaultColors.primary, textTransform: 'uppercase' },
  cancel: { fontSize: 15, color: defaultColors.danger, textTransform: 'uppercase' },
  errorMessage: {
    color: defaultColors.danger,
    fontSize: 13,
    marginBottom: 5,
  },
});
