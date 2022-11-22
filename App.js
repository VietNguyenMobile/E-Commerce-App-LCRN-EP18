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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
