import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import {
//   WelcomeScreen,
//   Walkthrough,
//   HomeScreen,
//   ScanProductScreen,
//   AuthMain,
//   BankListScreen,
// } from './src/screens';
import 'react-native-reanimated';

import WelcomeScreen from './src/screens/Walkthrough/Welcome';
import Walkthrough from './src/screens/Walkthrough/Walkthrough';
import HomeScreen from './src/screens/Home/HomeScreen';
import ScanProductScreen from './src/screens/ScanProduct/ScanProductScreen';
import AuthMain from './src/screens/Authentication/AuthMain';
import BankListScreen from './src/screens/BankList/BankListScreen';
import BankTransferScreen from './src/screens/BankTransfer/BankTransferScreen';
import ConfirmBankTransferScreen from './src/screens/BankTransfer/ConfirmBankTransferScreen';
import OTPVerificationScreen from './src/screens/BankTransfer/OTPVerificationScreen';
import ResultBankTransferScreen from './src/screens/BankTransfer/ResultBankTransferScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'AuthMain'}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Walkthrough" component={Walkthrough} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ScanProductScreen" component={ScanProductScreen} />
        <Stack.Screen name="AuthMain" component={AuthMain} />
        <Stack.Screen name="BankList" component={BankListScreen} />
        <Stack.Screen name="BankTransfer" component={BankTransferScreen} />
        <Stack.Screen
          name="ConfirmBankTransfer"
          component={ConfirmBankTransferScreen}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerificationScreen}
        />
        <Stack.Screen
          name="ResultBankTransfer"
          component={ResultBankTransferScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
