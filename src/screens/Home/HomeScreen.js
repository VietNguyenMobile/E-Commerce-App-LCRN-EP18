import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextButton } from '../../components';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextButton
        label="Scan"
        onPress={() => navigation.navigate('ScanProductScreen')}
      />
      <TextButton
        label="Danh sách ngân hàng"
        onPress={() => navigation.navigate('BankList')}
        contentContainerStyle={{ marginTop: 40 }}
      />
      <TextButton
        label="Chuyển Tiền"
        onPress={() => navigation.navigate('BankTransfer')}
        contentContainerStyle={{ marginTop: 40 }}
      />
      {/* <TextButton
        label="Xác nhận chuyển tiền"
        onPress={() => navigation.navigate('ConfirmBankTransfer')}
        contentContainerStyle={{ marginTop: 40 }}
      />
      <TextButton
        label="Xác thực OTP"
        onPress={() => navigation.navigate('OTPVerification')}
        contentContainerStyle={{ marginTop: 40 }}
      />
      <TextButton
        label="Kết quả giao dịch"
        onPress={() => navigation.navigate('ResultBankTransfer')}
        contentContainerStyle={{ marginTop: 40 }}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
