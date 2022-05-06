import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { defaultColors } from '../utils/colors';
import { textInput } from './styles/textInputField';

interface TextInputFieldProps {
  fieldName: string;
  label: string;
  placeholder: string;
  labelValue: string;
  inputValue: string;
  setInputValue(input: string): void;
  error: string;
  clearErrors(fieldName: string): void;
  saveChanges(): void;
}

function TextInputField({
  fieldName,
  label,
  placeholder,
  labelValue,
  inputValue,
  setInputValue,
  error,
  clearErrors,
  saveChanges,
}: TextInputFieldProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (input: string) => {
    clearErrors(fieldName);
    setInputValue(input);
  };

  const stopEditing = () => {
    setIsEditing(false);
    setInputValue('');
  };

  const save = () => {
    setIsEditing(false);
    saveChanges();
  };

  return (
    <View style={textInput.textInputContainer}>
      {isEditing ? (
        <View>
          <Input
            value={inputValue}
            placeholder={placeholder}
            placeholderTextColor={defaultColors.grey}
            containerStyle={{ paddingHorizontal: 0 }}
            inputStyle={{ fontSize: 17 }}
            onChangeText={(value) => handleInputChange(value)}
            errorMessage={error}
            errorStyle={textInput.errorMessage}
          />
          <View style={textInput.btnContainer}>
            <TouchableOpacity onPress={save} style={textInput.btn}>
              <Icon
                name="check-circle"
                size={20}
                color={defaultColors.primary}
                containerStyle={{ marginRight: 5 }}
              />
              <Text style={textInput.save}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={stopEditing} style={textInput.btn}>
              <Icon
                name="cancel"
                size={20}
                color={defaultColors.danger}
                containerStyle={{ marginRight: 5 }}
              />
              <Text style={textInput.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={textInput.userDataContainer}>
          <View style={textInput.labelContainer}>
            <Text style={textInput.label}>{label}:</Text>
            <Text style={textInput.labelValue}>{labelValue ?? '-'}</Text>
          </View>
          <TouchableOpacity onPress={() => setIsEditing(true)} style={textInput.editContainer}>
            <Text style={textInput.edit}>Edit</Text>
            <Icon name="edit" size={16} color={defaultColors.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default TextInputField;
