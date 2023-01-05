import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
} from 'react-native';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  constants,
  images,
} from '../../constants';
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

const OTPVerificationScreen = ({ navigation, route }) => {
  console.log('route.params: ', route.params);

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otpInput, setOtpInput] = useState({ 1: '', 2: '', 3: '', 4: '' });
  const [iOtp, setIOtp] = useState('3699');
  const [isLoading, setIsLoading] = useState(false);

  const onCancel = () => {
    navigation.goBack();
  };

  const goToResultTransfer = () => {
    Keyboard.dismiss();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (route.params?.transferInfoData) {
        navigation.navigate('ResultBankTransfer', {
          transferInfoData: route.params?.transferInfoData,
        });
      }
    }, 2000);
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

        <Text style={styles.title}>Xác thực OTP</Text>
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
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Image
            style={{ height: 150, width: 150, borderRadius: 10 }}
            source={images.VerifyShield}
          />
          <Text style={{ fontSize: 16, color: COLORS.primary, marginTop: 10 }}>
            {'iOPT của bạn là: '}
            <Text style={{ fontWeight: 'bold' }}>{iOtp}</Text>
          </Text>
        </View>

        <Text
          style={{
            fontSize: 16,
            color: COLORS.primary,
            marginVertical: 10,
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {'Mời bạn nhập mã iOTP ở trên'}
        </Text>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={text => {
                setOtpInput({ ...otpInput, 1: text });
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={text => {
                setOtpInput({ ...otpInput, 2: text });
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={text => {
                setOtpInput({ ...otpInput, 3: text });
                text
                  ? fourthInput.current.focus()
                  : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={text => {
                setOtpInput({ ...otpInput, 4: text });
                !text && thirdInput.current.focus();
              }}
            />
          </View>
        </View>

        <Text
          style={{
            fontSize: 14,
            color: COLORS.primary,
            marginVertical: 10,
            textAlign: 'center',
            marginBottom: 20,
          }}>
          {'Không chia sẻ mã OTP cho bất kỳ ai'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToResultTransfer}
          style={[
            styles.btn,
            {
              backgroundColor: otpInput[4]
                ? COLORS.support5
                : COLORS.support5_08,
            },
          ]}>
          <Text
            style={{
              color: otpInput[4] ? 'white' : COLORS.support5,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Xác thực
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
  btn: {
    height: 60,
    borderRadius: 6,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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

  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 6,
    borderColor: COLORS.support5,
    borderWidth: 2,
  },
  otpText: {
    fontSize: 25,
    color: COLORS.support5,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});

export default OTPVerificationScreen;
