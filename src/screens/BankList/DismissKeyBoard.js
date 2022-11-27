import React, { useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const DismissKeyBoard: React.FunctionComponent = ({ children }) => {
  const handleDismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={handleDismissKeyboard}
      onPressIn={handleDismissKeyboard}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyBoard;
