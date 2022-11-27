import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({ isLoading }) => {
  return (
    (isLoading && (
      <View style={styles.overlayContainer}>
        <ActivityIndicator size="large" color={'#055CDE'} />
      </View>
    )) ||
    null
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
});

export default Loading;
