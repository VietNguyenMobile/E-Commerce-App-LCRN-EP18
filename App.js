import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {
  Welcome,
  Walkthrough,
  HomeScreen,
  ScanProductScreen,
} from './src/screens';
import 'react-native-reanimated';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'HomeScreen'}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Walkthrough" component={Walkthrough} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ScanProductScreen" component={ScanProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
