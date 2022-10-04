import React from 'react';
import {View, Text} from 'react-native';
import {TextButton} from '../../components';

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextButton
        label="Scan"
        onPress={() => navigation.navigate('ScanProductScreen')}
      />
    </View>
  );
};

export default HomeScreen;
