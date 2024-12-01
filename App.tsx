import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Alert, Button, View} from 'react-native';

import TransactionScreen from './pages/transactionPage';
import TransactionDetailsScreen from './pages/transactionDetail';
import {Transaction} from './types/transactions';
import {enableBiometricAuth, handleBiometricAuth} from './pages/biometrics';

type RootStackParamList = {
  Transaction: Transaction;
  TransactionDetails: {transactionId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // useEffect(() => {
  //   const initializeBiometrics = async () => {
  //     await enableBiometricAuth();
  //   };
  //   initializeBiometrics();
  // }, []);

  // const handleLogin = async () => {
  //   const isAuthenticated = await handleBiometricAuth();
  //   if (isAuthenticated) {
  //     Alert.alert('Authentication Successful', 'Welcome!');
  //   } else {
  //     Alert.alert('Authentication Failed', 'Try again.');
  //   }
  // };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Transaction" component={TransactionScreen} />
        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetailsScreen}
        />
      </Stack.Navigator>

      {/* <View style={{padding: 20}}>
        <Button title="Authenticate" onPress={handleLogin} />
      </View> */}
    </NavigationContainer>
  );
}
