import React, { useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet } from 'react-native';
import { TextButton } from '../../components';

const BankListScreen = ({ navigation }) => {
  useEffect(() => {
    console.log('1111');
    // axios
    //   .get('https://api.vietqr.io/v2/banks', {
    //     headers: {
    //       'x-client-id': 'c3e792c8-d916-4659-84e3-f633061710cd',
    //       'x-api-key': '44be5543-e624-4c42-9cbc-acec33846446',
    //     },
    //   })
    //   .then(res => {
    //     console.log('res: ', res);
    //   })
    //   .catch(err => {
    //     console.log('err: ', err);
    //   });
    const getMovies = async () => {
      console.log('getMovies');
      try {
        console.log('aaa');
        const response = await fetch('https://reactnative.dev/movies.json');
        console.log('response: ', response);
        const json = await response.json();
        console.log('json.movies: ', json.movies);
        // setData(json.movies);
      } catch (error) {
        console.log('error: ', error);
      }
    };

    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Text>BankList</Text>
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

export default BankListScreen;
