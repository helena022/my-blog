import React, { useState, Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { defaultColors } from '../utils/colors';
import { textInput } from './styles/textInputField';

// TODO props type

function TextInputField({ label, labelValue, inputValue, setInputValue }) {
  const [isEditing, setIsEditing] = useState(false);

  const stopEditing = () => {
    setIsEditing(false);
    setInputValue('');
  };

  return (
    <View style={textInput.textInputContainer}>
      {isEditing ? (
        <View>
          <Input
            value={inputValue}
            placeholder={label}
            placeholderTextColor={defaultColors.grey}
            containerStyle={{ paddingHorizontal: 0 }}
            inputStyle={{ fontSize: 17 }}
            onChangeText={(value) => setInputValue(value)}
          />
          <View style={textInput.btnContainer}>
            <TouchableOpacity style={textInput.btn}>
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
