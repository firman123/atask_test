/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import Buttons from '../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App({navigation}): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleSignIn = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (
        available &&
        (biometryType === BiometryTypes.FaceID ||
          biometryType === BiometryTypes.TouchID ||
          biometryType === BiometryTypes.Biometrics)
      ) {
        Alert.alert(
          'Face ID',
          'Would you like to enable Face ID authentication for the next time?',
          [
            {
              text: 'Yes please',
              onPress: async () => {
                const {publicKey} = await rnBiometrics.createKeys();
                await AsyncStorage.setItem('key_login', publicKey);
              },
            },
            {text: 'Cancel', style: 'cancel'},
          ],
        );
      }
    } catch (error) {}
  };

  const handleFaceId = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {available} = await rnBiometrics.isSensorAvailable();

      if (!available) {
        Alert.alert('Oops!', 'Face ID is not available on this device.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]);
        return;
      }

      const userId = await AsyncStorage.getItem('key_login');

      if (!userId) {
        Alert.alert(
          'Oops!',
          'You have to sign in using your credentials first to enable Face ID.',
        );
        return;
      }

      const timestamp = Math.round(new Date().getTime() / 1000).toString();
      const payload = `${userId}_${timestamp}`;

      const {success, signature} = await rnBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload,
      });

      if (!success) {
        Alert.alert(
          'Oops!',
          'Something went wrong during Face ID authentication. Do you want to use a password for login?',
          [
            {text: 'OK', onPress: () => navigation.navigate('ListNote')},
            {text: 'Cancel', style: 'cancel'},
          ],
        );
        return;
      }

      console.log('signature ', signature);

      Alert.alert('Success!', 'You are successfully authenticated!', [
        {text: 'OK', onPress: () => navigation.navigate('ListNote')},
      ]);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <View style={styles.container}>
        <View style={styles.coverButton}>
          <Buttons title="Sign In" onPress={handleSignIn} />
          <Buttons title="Face Id" onPress={handleFaceId} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  coverButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 1,
    padding: 16,
  },
  boxPassword: {
    flexDirection: 'column',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    margin: 16,
  },
});

export default App;
