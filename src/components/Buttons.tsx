import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

const Buttons: React.FC<ButtonProps> = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.textButton}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 16,
  },
});

export default Buttons;
