import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { COLORS, SIZES, icons } from '../../constants';
import IconNavRight from '../BankList/IconArrowRight';
import Loading from './Loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const mockData = {
  amount: '200,000,000',
  accountName: 'Nguyen Quoc Viet',
  accountNumber: '8007041110402',
  bankName: 'Bản Việt',
  note: 'Chuyen tien choi',
};

const ConfirmBankTransferScreen = ({ navigation, route }) => {
  console.log('route.params: ', route.params);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTransfer, setDataTransfer] = useState(null);

  useEffect(() => {
    if (route.params?.transferInfoData) {
      setDataTransfer(route.params?.transferInfoData);
    }
  }, []);

  // useEffect(() => {

  //   funcA();
  // }, []);

  const funcCheckBiometric = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const result = await rnBiometrics.isSensorAvailable();
      console.log('result: ', result);

      if (result.available) {
        const resultSignature = await rnBiometrics.createSignature({
          promptMessage: 'Xác thực chuyển tiền',
          payload: 'dwadad2e2e2qeq',
        });

        console.log('resultSignature: ', resultSignature);
        if (resultSignature.success) {
          navigation.navigate('OTPVerification', {
            transferInfoData: route.params?.transferInfoData,
            // transferInfoData: mockData,
          });
        }
      }

      // const key = await rnBiometrics.createKeys();
      // const { publicKey } = key;
      // console.log('key: ', key);
      // const resultSignature = await rnBiometrics.createSignature({
      //   promptMessage: 'Sign in',
      //   payload: 'dwadwadawcaw',
      // });
      // console.log(resultSignature);
      // const resultSignature = await rnBiometrics.createSignature({
      //   promptMessage: 'Sign in',
      //   payload: 'dwadwadawcaw',
      // });
      // console.log(resultSignature);
    } catch (e) {
      console.log(e);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <IconNavRight
            color={'black'}
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>

        <Text style={styles.title}>Xác nhận chuyển tiền</Text>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <Text style={styles.txtCancel}>Huỷ</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: SIZES.padding * 2,
        }}>
        <View style={styles.wrapperAvailableAmount}>
          <Text>
            <Text style={styles.txtTitleAmount}>Số tiền có sẵn: </Text>
            <Text style={styles.txtAvailableAmount}>24,999,823,322</Text>
          </Text>
        </View>

        <View style={styles.wrapperInfo}>
          <View style={[styles.itemInfo, styles.itemInfoAmount]}>
            <Text style={styles.txtTitleAmountData}>Số tiền</Text>
            <Text style={styles.txtAmountData}>{dataTransfer?.amount}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>Chuyển đến</Text>
            <Text style={styles.txtData}>{dataTransfer?.accountName}</Text>
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>Số tài khoản</Text>
            <Text style={styles.txtData}>{dataTransfer?.accountNumber}</Text>
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>Ngân hàng</Text>
            <Text style={styles.txtData}>{dataTransfer?.bankName}</Text>
          </View>

          <View style={styles.itemInfo}>
            <Text style={styles.txtTitleData}>Nội dung</Text>
            <Text style={styles.txtData}>{dataTransfer?.note}</Text>
          </View>
        </View>

        <View
          style={{
            height: 60,
            // width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderWidth: 1,
            backgroundColor: 'white',
            borderRadius: 8,
            marginHorizontal: 20,
            borderColor: COLORS.support5_08,
          }}>
          <Text style={[styles.txtTitleAmount, { color: COLORS.dark80 }]}>
            Chuyển tiền nhanh
          </Text>
          <Image
            style={{ width: 120, height: 50, borderRadius: 8, top: -4 }}
            source={icons.logoNapas247}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn}
          onPress={funcCheckBiometric}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <Loading isLoading={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  txtCancel: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
  txtTitleAmountData: {
    fontSize: 26,
    color: COLORS.support5,
  },
  txtAmountData: {
    fontSize: 20,
    color: COLORS.dark80,
    fontWeight: 'bold',
  },
  txtTitleData: {
    fontSize: 20,
    color: COLORS.support5,
  },
  txtData: {
    fontSize: 16,
    color: COLORS.dark80,
    fontWeight: 'bold',
  },
  wrapperInfo: {
    borderRadius: 8,
    margin: 20,
    shadowColor: COLORS.support5,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
  },
  itemInfoAmount: {
    height: 100,
    backgroundColor: COLORS.support5_08,
  },
  itemInfo: {
    height: 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.support5_08,
    borderBottomWidth: 2,
  },
  btn: {
    height: 60,
    borderRadius: 6,
    backgroundColor: COLORS.support5,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  wrapperAvailableAmount: {
    height: 60,
    width: '100%',
    backgroundColor: COLORS.support5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleAmount: {
    fontSize: 16,
    color: 'white',
  },
  txtAvailableAmount: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
});

export default ConfirmBankTransferScreen;
