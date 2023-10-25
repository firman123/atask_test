import React from 'react';
import {TextInput, Text, StyleSheet} from 'react-native';

interface InputTextProps {
  onChange: () => void;
}

const InputPassword: React.FC<InputTextProps> = ({onChange}) => {
  return (
    <>
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        placeholder="Enter your password"
        onChangeText={text => onChange(text)}
        style={styles.textInput}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    paddingLeft: 8,
    marginTop: 4,
  },
});

export default InputPassword;
