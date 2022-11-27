import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { TextButton } from '../../components';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  constants,
  images,
} from '../../constants';
import IconNavRight from '../BankList/IconArrowRight';
import ModalBankSelect from './ModalBankSelect';
import { itemBank } from '../BankList/BankListScreen';
import Loading from './Loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const isNumber = text => {
  const regExp = /^\d+$/;
  return regExp.test(text);
};

const regexNonNumeric = /[^0-9]+/g;
const regexNonStartWith0 = /^0+/;
const thousands = '.';

const BankTransferScreen = ({ navigation, route }) => {
  console.log('route.params: ', route.params);

  const [dataBank, setDataBank] = useState([]);
  const [bankSelected, setBankSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bankName, setBankName] = useState('');
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isShowBankSelect, setIsShowBankSelect] = useState(false);

  // useEffect(() => {
  //   console.log('route.params: ', route.params);
  //   if (route.params.bankBin) {
  //     try {
  //       setIsLoading(true);
  //       fetch('https://api.vietqr.io/v2/lookup', {
  //         method: 'POST',
  //         headers: {
  //           'x-client-id': constants.xClientId,
  //           'x-api-key': constants.xApiKey,
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           bin: route.params.bankBin,
  //           accountNumber: route.params.bankNumber,
  //         }),
  //       })
  //         .then(res => res.json())
  //         .then(response => {
  //           console.log('response: ', response);
  //           setAccountNumber(route.params.bankNumber);
  //           setAccountName(response.data.accountName);
  //           if (route.params.amount) {
  //             setAmount(route.params.amount);
  //           }

  //           if (route.params.purpose) {
  //             setNote(route.params.purpose);
  //           }

  //           setIsLoading(false);
  //         })
  //         .catch(error => {
  //           setIsLoading(false);
  //           console.log('error: ', error);
  //         });
  //       // console.log('response: ', response);
  //       // const jsonData = await response.json();
  //       // console.log('json.movies: ', jsonData.data);

  //       // setData(json.movies);
  //     } catch (error) {
  //       console.log('error: ', error);
  //       setIsLoading(false);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const getBankList = async () => {
      try {
        setIsLoading(true);
        const responseBanks = await fetch('https://api.vietqr.io/v2/banks', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        // console.log('response: ', response);
        const jsonData = await responseBanks.json();
        // console.log('json.movies: ', jsonData.data);
        setDataBank(jsonData.data);
        if (route.params.bankBin) {
          try {
            setIsLoading(true);
            fetch('https://api.vietqr.io/v2/lookup', {
              method: 'POST',
              headers: {
                'x-client-id': constants.xClientId,
                'x-api-key': constants.xApiKey,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                bin: route.params.bankBin,
                accountNumber: route.params.bankNumber,
              }),
            })
              .then(res => res.json())
              .then(response => {
                console.log('response: ', response);
                setAccountNumber(route.params.bankNumber);
                setAccountName(response.data.accountName);
                if (route.params.amount) {
                  onChangeTextAmount(route.params.amount);
                }

                if (route.params.purpose) {
                  setNote(route.params.purpose);
                }

                const selectBank = jsonData.data.find(
                  bank => bank.bin === route.params.bankBin,
                );

                console.log('selectBank: ', selectBank);
                if (selectBank) {
                  // setBankSelected(selectBank);
                  // setBankName(selectBank.name);
                  onSelectBank(selectBank);
                }

                setIsLoading(false);
              })
              .catch(error => {
                setIsLoading(false);
                console.log('error: ', error);
              });
            // console.log('response: ', response);
            // const jsonData = await response.json();
            // console.log('json.movies: ', jsonData.data);

            // setData(json.movies);
          } catch (error) {
            console.log('error: ', error);
            setIsLoading(false);
          }
        }
        setIsLoading(false);
        // setData(json.movies);
      } catch (error) {
        console.log('error: ', error);
        setIsLoading(false);
      }
    };

    getBankList();
  }, []);

  const onCancel = () => {
    navigation.goBack();
  };

  const onChangeTextBankName = (text: string) => {
    setBankName(text);
  };

  const onChangeTextAccountNumber = (text: string) => {
    setAccountNumber(text);
  };

  const showModalBankList = () => {
    // console.log('showModalBankList');
    setIsShowBankSelect(true);
  };

  const closeModalBankList = () => {
    // console.log('closeModalBankList');
    setIsShowBankSelect(false);
  };

  const onSelectBank = (bankSelect: itemBank) => {
    console.log('bankSelect: ', bankSelect);
    setBankSelected(bankSelect);
    setBankName(bankSelect.name);
  };

  const onChangeTextAmount = (value: string) => {
    try {
      let text = value;
      // Replace non-numeric characters
      // text = text.replace(regexNonNumeric, '').split(thousands).join('');
      // text = text.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      // text = text.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      // text = text.toLocaleString('it-IT', {
      //   style: 'currency',
      //   currency: 'VND',
      // });

      // text = new Intl.NumberFormat('vi-VN', {
      //   style: 'currency',
      //   currency: 'VND',
      // }).format(value);

      text = text.replace(/\D/g, '');
      text = text.replace(/(\d)(\d{3})$/, '$1.$2');
      text = text.replace(/(?=(\d{3})+(\D))\B/g, '.');

      // text = text.replace(/\B(?=(\d{3})+(?!\D))/g, '.');

      console.log('text 0 ', text);
      // fix paste text
      if (text.length > 18) {
        text = text.slice(0, 18);
      }

      // prevent user input/paste value start with 0
      // let validNumber = parseFloat(text);

      // if (isNumber(validNumber) && validNumber > 0) {
      //   text = text.replace(regexNonStartWith0, '');
      // } else {
      //   text = '';
      // }

      setAmount(text);
    } catch (err) {
      console.log('err onChangeAmount', err);
    }
  };

  const onChangeTextNote = (text: string) => {
    setNote(text);
  };

  const onChangeTextAccountName = (text: string) => {
    setAccountName(text);
  };

  const getInfoBank = async () => {
    console.log('getInfoBank');
    try {
      setIsLoading(true);
      const response = await fetch('https://api.vietqr.io/v2/lookup', {
        method: 'POST',
        headers: {
          'x-client-id': constants.xClientId,
          'x-api-key': constants.xApiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bin: bankSelected.bin,
          accountNumber: accountNumber,
        }),
      });
      // console.log('response: ', response);
      const jsonData = await response.json();
      // console.log('json.movies: ', jsonData.data);
      setAccountName(jsonData.data.accountName);
      setIsLoading(false);
      // setData(json.movies);
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(false);
    }
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

        <Text style={styles.title}>Tạo chuyển tiền</Text>
        <TouchableOpacity onPress={onCancel} activeOpacity={0.8}>
          <Text style={styles.txtCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={-300}
        contentContainerStyle={{
          flexGrow: 1,
          // justifyContent: 'center',
          paddingBottom: SIZES.padding * 2,
        }}>
        <View style={styles.wrapperTitleInput}>
          <Text style={styles.titleInput}>Tên Ngân hàng chuyển đến</Text>
        </View>
        <TouchableOpacity
          onPress={showModalBankList}
          style={styles.wrapperItemBank}
          activeOpacity={0.9}>
          <TextInput
            placeholder="Tên Ngân hàng"
            value={bankName}
            editable={false}
            // maxLength={23}
            onFocus={showModalBankList}
            onChangeText={onChangeTextBankName}
            style={{
              flex: 1,
              fontSize: 16,
              color: COLORS.support5,
              marginLeft: 10,
            }}
          />
          <IconNavRight
            color={'black'}
            style={{ transform: [{ rotate: '90deg' }], marginRight: 10 }}
          />
        </TouchableOpacity>

        <View style={styles.wrapperTitleInput}>
          <Text style={styles.titleInput}>Số tài khoản chuyển đến</Text>
        </View>
        <View style={styles.wrapperItemBank}>
          <TextInput
            placeholder="Số tài khoản"
            editable={!!bankName}
            value={accountNumber}
            keyboardType="number-pad"
            onBlur={getInfoBank}
            onChangeText={onChangeTextAccountNumber}
            style={{
              flex: 1,
              fontSize: 16,
              color: 'black',
              marginLeft: 10,
            }}
          />
          <Image
            style={styles.iconEdit}
            source={images.IconEdit}
            resizeMode="stretch"
          />
        </View>

        {accountName && (
          <View>
            <View style={styles.wrapperTitleInput}>
              <Text style={styles.titleInput}>Họ tên người nhận</Text>
            </View>
            <View style={styles.wrapperItemBank}>
              <TextInput
                placeholder="Nguyễn Văn A"
                editable={!!bankName}
                value={accountName}
                // keyboardType="number-pad"
                onChangeText={onChangeTextAccountName}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: 'black',
                  marginLeft: 10,
                }}
              />
            </View>
          </View>
        )}
        {accountName && (
          <View>
            <View style={styles.wrapperTitleInput}>
              <Text style={styles.titleInput}>Số tiền</Text>
            </View>
            <View style={styles.wrapperItemBank}>
              <TextInput
                placeholder="0"
                editable={!!bankName}
                value={amount}
                maxLength={23}
                keyboardType="number-pad"
                onChangeText={onChangeTextAmount}
                autoCorrect={false}
                autoCapitalize="none"
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: 'black',
                  marginLeft: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: COLORS.dark80,
                  margin: 10,
                }}>
                VNĐ
              </Text>
            </View>
            <View style={styles.wrapperTitleInput}>
              <Text style={styles.titleInput}>Nội dung</Text>
            </View>
            <View style={styles.wrapperItemBank}>
              <TextInput
                placeholder="nội dung chuyển tiền"
                // editable={!!bankName}
                value={note}
                // keyboardType="number-pad"
                onChangeText={onChangeTextNote}
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: 'black',
                  marginLeft: 10,
                }}
              />
            </View>
          </View>
        )}
        {accountName && (
          <TouchableOpacity
            disabled={amount.length < 4}
            activeOpacity={0.8}
            style={styles.btn}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Chuyển tiền
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>

      <ModalBankSelect
        isShow={isShowBankSelect}
        dataBank={dataBank}
        onClose={closeModalBankList}
        onPressBank={onSelectBank}
      />
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
  wrapperTitleInput: {
    borderLeftWidth: 3,
    height: 26,
    marginTop: 20,
    justifyContent: 'center',
    borderLeftColor: COLORS.support5,
  },
  titleInput: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  wrapperItemBank: {
    flexDirection: 'row',
    // paddingVertical: 20,
    height: 80,
    shadowColor: '#333',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 8,
    // borderBottomWidth: 0,
    position: 'relative',
    marginHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 20,
  },
  iconEdit: {
    height: 16,
    width: 16,
    marginRight: 15,
  },
  btn: {
    height: 60,
    borderRadius: 6,
    backgroundColor: COLORS.support5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default BankTransferScreen;
