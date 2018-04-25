import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const IconButton = ({ onPress, iconSource, overRideStyles }) => {
  return (
    <TouchableOpacity style={[styles.buttonStyle, overRideStyles]} onPress={onPress}>
      <Image source={iconSource} />
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    height: 28,
    width: 28,
    justifyContent: 'center'
  }
};

export { IconButton };
