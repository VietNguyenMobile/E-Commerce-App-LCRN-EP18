import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
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
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextButton } from '../../components';
import IconNavRight from './IconArrowRight';
import IconSearch from './IconSearch';
import DismissKeyBoard from './DismissKeyBoard';
import { COLORS } from '../../constants';

export interface itemBank {
  id: Number;
  name: String;
  code: String;
  bin: String;
  shortName: String;
  logo: String;
  transferSupported: Number;
  lookupSupported: number;
}

const BankListScreen = ({ navigation }) => {
  const [dataBank, setDataBank] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('1111');
    const getBankList = async () => {
      try {
        console.log('aaa');
        const response = await fetch('https://api.vietqr.io/v2/banks', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        // console.log('response: ', response);
        const jsonData = await response.json();
        // console.log('json.movies: ', jsonData.data);
        setDataBank(jsonData.data);
        setIsLoading(false);
        // setData(json.movies);
      } catch (error) {
        console.log('error: ', error);
        setIsLoading(false);
      }
    };

    getBankList();
  }, []);

  const _renderItem = ({ item }: { item: itemBank }) => {
    console.log('item" ', item);
    console.log('item.logo: ', item.logo);
    return (
      <View style={styles.item}>
        {/* <Image
          style={{ height: 100, width: 100 }}
          resizeMode="contain"
          // resizeMode="center"
          source={{ uri: item.logo }}
        /> */}
        <FastImage
          style={{ width: 100, height: 100 }}
          source={{
            uri: item.logo,
            // headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
            {item.shortName}
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#333',
              marginTop: 10,
              width: '80%',
            }}>
            {item.name}
          </Text>
        </View>

        <IconNavRight />
      </View>
    );
  };

  const onChangeSearch = useCallback(
    value => {
      setSearchInput(value);
    },
    [searchInput],
  );

  const onRenderEmptyList = useMemo(
    () => (
      <View style={styles.emptyView}>
        <Text>Không tìm thấy</Text>
      </View>
    ),
    [],
  );

  const renderList = useMemo(() => {
    if (isLoading) {
      return (
        <View style={styles.footerListView}>
          <ActivityIndicator color={'rgba(123, 96, 238, 1)'} size="large" />
        </View>
      );
    }

    const dataFilter = dataBank.filter(bank => {
      return bank.shortName.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (dataFilter.length <= 0) {
      return onRenderEmptyList;
    }
    console.log('dataBank: ', dataBank);
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <DismissKeyBoard>
          <FlatList
            keyboardDismissMode="on-drag"
            data={dataFilter}
            initialNumToRender={dataFilter.length}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 1, backgroundColor: '#333' }} />;
            }}
          />
        </DismissKeyBoard>
      </KeyboardAvoidingView>
    );
  }, [searchInput, dataBank, isLoading]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: COLORS.support5,
          textAlign: 'center',
          margin: 10,
        }}>
        Danh sách ngân hàng
      </Text>
      <View style={styles.searchInput}>
        <IconSearch />
        <TextInput
          style={styles.searchInputText}
          value={searchInput}
          onChangeText={onChangeSearch}
          placeholder={'Tìm tên ngân hàng nhận'}
          placeholderTextColor={'#AAA'}
          autoCorrect={false}
        />
      </View>
      {renderList}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 100,
    // width: '100%',
    // justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // flex: 1,
    paddingRight: 10,
  },
  searchInput: {
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerListView: {
    width: '100%',
    paddingTop: 10,
  },
});

export default BankListScreen;
