import { Alert, Platform } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

export const enableBiometricAuth = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (!available) {
      return false;
    }

    if (Platform.OS === 'ios') {
      switch (biometryType) {
        case BiometryTypes.FaceID:
          Alert.alert('FaceID', 'Would you like to enable FaceID authentication?', [
            {
              text: 'Yes',
              onPress: () => Alert.alert('Success', 'FaceID enabled successfully!'),
            },
            { text: 'Cancel', style: 'cancel' },
          ]);
          break;
        case BiometryTypes.TouchID:
          Alert.alert('TouchID', 'Would you like to enable TouchID authentication?', [
            {
              text: 'Yes',
              onPress: () => Alert.alert('Success', 'TouchID enabled successfully!'),
            },
            { text: 'Cancel', style: 'cancel' },
          ]);
          break;
        default:
          Alert.alert('Unsupported', 'Unknown biometric type.');
      }
    } else if (Platform.OS === 'android') {
      if (biometryType === BiometryTypes.Biometrics) {
        Alert.alert('Biometrics', 'Would you like to enable biometric authentication?', [
          {
            text: 'Yes',
            onPress: () => Alert.alert('Success', 'Biometric authentication enabled successfully!'),
          },
          { text: 'Cancel', style: 'cancel' },
        ]);
      } else {
        Alert.alert('Unsupported', 'Unknown biometric type.');
      }
    }
  } catch (error) {
    console.error('[enableBiometricAuth] Error:', error);
    Alert.alert('Error', 'An error occurred while enabling biometric authentication.');
  }
};

export const handleBiometricAuth = async () => {
  const rnBiometrics = new ReactNativeBiometrics();

  try {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Authenticate to continue',
      cancelButtonText: 'Cancel',
    });

    if (success) {
      Alert.alert('Success', 'Biometric authentication successful!');
      return true;
    } else {
      Alert.alert('Authentication Failed', 'Biometric authentication failed or was canceled.');
      return false;
    }
  } catch (error) {
    Alert.alert('Error', 'An error occurred during biometric authentication.');
    return false;
  }
};
