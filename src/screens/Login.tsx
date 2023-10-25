import {SafeAreaView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import Buttons from '../components/Buttons';
import InputPassword from '../components/InputPassword';

function Login({navigation}) {
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (password) {
      try {
        await AsyncStorage.setItem('key_login', password);
        navigation.navigate('ListNote');
      } catch (error) {}
    } else {
      Alert.alert('', 'Password is required', [
        {text: 'OK', onPress: () => console.log('')},
      ]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={styles.boxPassword}>
        <InputPassword onChange={value => setPassword(value)} />
        <Buttons title="Login" onPress={handleLogin} style={{marginTop: 20}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  boxPassword: {
    flexDirection: 'column',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    margin: 16,
  },
});

export default Login;
