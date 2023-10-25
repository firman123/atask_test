import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

interface ItemProps {
  text: string;
  onPress: () => void;
}

const Item: React.FC<ItemProps> = ({text, onPress}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={{color: 'gray'}}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    border: '1px',
  },
  button: {
    width: '100%',
    height: 'auto',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    padding: 16,
    marginBottom: 8,
  },
});

export default Item;
