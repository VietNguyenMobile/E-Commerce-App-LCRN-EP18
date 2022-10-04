import React from 'react';
import {TouchableOpacity, Text, Image} from 'react-native';
import {FONTS, COLORS} from '../constants';

const IconButton = ({
  contentContainerStyle,
  disabled,
  label,
  labelStyle,
  onPress,
  icon,
  iconStyle = {
    width: 25,
    height: 25,
  },
  tintColor = '#000',
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: COLORS.primary,
        ...contentContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      {/* <Text style={{color: COLORS.secondary, ...FONTS.h3, ...labelStyle}}>
        {label}
      </Text> */}
      <Image style={{...iconStyle, tintColor: tintColor}} source={icon} />
    </TouchableOpacity>
  );
};

export default IconButton;
