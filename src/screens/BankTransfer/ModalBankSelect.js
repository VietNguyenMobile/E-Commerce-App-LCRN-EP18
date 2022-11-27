import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState, useCallback, useMemo } from 'react';
import { itemBank } from '../BankList/BankListScreen';
import IconSearch from '../BankList/IconSearch';
import DismissKeyBoard from '../BankList/DismissKeyBoard';
import { COLORS, images } from '../../constants';

interface ModalBankSelectType {
  isShow: Boolean;
  dataBank: Array[itemBank];
  onClose: () => {};
  onPressBank: (item: itemBank) => {};
}

const ModalBankSelect: React.FunctionComponent<ModalBankSelectType> = ({
  isShow,
  dataBank,
  onClose,
  onPressBank,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const onChangeSearch = useCallback(
    value => {
      setSearchInput(value);
    },
    [searchInput],
  );

  const _renderItem = ({ item }: { item: itemBank }) => {
    // console.log('item" ', item);
    return (
      <TouchableOpacity
        onPress={() => {
          onPressBank(item);
          onClose();
        }}>
        <View style={styles.item}>
          <Image
            style={{ height: 100, width: 100 }}
            resizeMode="contain"
            // resizeMode="center"
            source={{ uri: item.logo }}
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
        </View>
      </TouchableOpacity>
    );
  };

  const onRenderEmptyList = useMemo(
    () => (
      <View style={styles.emptyView}>
        <Text>Không tìm thấy</Text>
      </View>
    ),
    [],
  );

  const renderList = useMemo(() => {
    // console.log('dataBank 11111: ', dataBank);
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
  }, [searchInput, dataBank]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isShow}
      // style={{ justifyContent: 'center', alignItems: 'center' }}
      onRequestClose={() => {
        // setModalVisible(!ModalVisible);
      }}>
      <TouchableWithoutFeedback
        // onPress={onClose}
        style={
          {
            // flex: 1,
            // backgroundColor: 'red',
            // justifyContent: 'center',
            // alignItems: 'center',
          }
        }>
        <View style={styles.modalView}>
          <View style={styles.wrapperTitle}>
            <View />
            <Text
              style={{
                fontSize: 20,
                color: 'rgba(123, 96, 238, 1)',
                textAlign: 'center',
                margin: 10,
              }}>
              Danh sách ngân hàng
            </Text>
            <TouchableWithoutFeedback onPress={onClose}>
              <Image source={images.IconClose} style={styles.iconClose} />
            </TouchableWithoutFeedback>
          </View>

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
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '80%',
    width: '90%',
    backgroundColor: 'white',
    // alignSelf: 'center',
  },
  wrapperTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: 5,
    backgroundColor: COLORS.support1_08,
    // backgroundColor: 'red',
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingTop: 5,
    padding: 15,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1,
  },
  iconClose: {
    height: 26,
    width: 26,
  },
});

export default ModalBankSelect;
