import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { FONTS, COLORS } from '../constants';

const IconButton = ({
  containerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  icon,
  iconStyle,
  tintColor = '#000',
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.primary,
        ...containerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      {/* <Text style={{color: COLORS.secondary, ...FONTS.h3, ...labelStyle}}>
        {label}
      </Text> */}
      <Image
        style={{ width: 30, height: 30, tintColor: COLORS.white, ...iconStyle }}
        source={icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default IconButton;
