import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { FONTS, SIZES, COLORS } from '../constants';

const FormInput: TextInputProps = ({
  containerStyle,
  inputContainerStyle,
  placeholder,
  inputStyle,
  value,
  prependComponent,
  appendComponent,
  onChange,
  onPress,
  editable,
  secureTextEntry,
  keyboardType,
  autoComplete = 'off',
  autoCapitalize = 'none',
  maxLength,
  placeholderTextColor = COLORS.grey60,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          backgroundColor: COLORS.lightGrey,
          ...inputContainerStyle,
        }}>
        {prependComponent}
        <TextInput
          style={{
            flex: 1,
            paddingVertical: 0,
            ...FONTS.body3,
            ...inputStyle,
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          // autoComplete={}
          autoComplete={autoComplete}
          maxLength={maxLength}
          onPressIn={onPress}
          onChange={text => onChange(text)}
          editable={editable}
        />
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;
