/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/screens/App';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import {it} from '@jest/globals';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

jest.mock('react-native-biometrics', () => {
  return {
    isSensorAvailable: jest.fn().mockResolvedValue({
      available: true,
      biometryType: 'FaceID',
    }),
    isSensorAvailableFaceId: jest.fn().mockResolvedValue({
      available: true,
    }),
    createKeys: jest.fn().mockResolvedValue({
      publicKey: 'mockedPublicKey',
    }),
    createSignature: jest.fn().mockResolvedValue({
      success: true,
      signature: 'mockedSignature',
    }),
  };
});

describe('App Component', () => {
  it('should handleSignIn correctly', async () => {
    const {getByText} = render(<App />);
    const signInButton = getByText('Sign In');

    jest.spyOn(ReactNativeBiometrics, 'isSensorAvailable').mockResolvedValue({
      available: true,
      biometryType: 'FaceID',
    });

    fireEvent.press(signInButton);
  });

  it('should handleFaceId correctly', async () => {
    const {getByText} = render(<App />);
    const faceIdButton = getByText('Face Id');

    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue('mockedUserId');

    jest
      .spyOn(ReactNativeBiometrics, 'isSensorAvailableFaceId')
      .mockResolvedValue({
        available: true,
      });

    jest.spyOn(ReactNativeBiometrics, 'createSignature').mockResolvedValue({
      success: true,
      signature: 'mockedSignature',
    });

    fireEvent.press(faceIdButton);
  });
});
