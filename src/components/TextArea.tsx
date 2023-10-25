import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

interface TextAreaProps {
  title: string;
  onChangeText: () => void;
  value: string;
}

const Textarea: React.FC<TextAreaProps> = ({title, onChangeText, value}) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.textarea}
          multiline={true}
          numberOfLines={4} // Atur sesuai kebutuhan
          placeholder="Write your note in here"
          onChangeText={onChangeText}
          textAlignVertical="top"
          value={value}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
  },
  container: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  textarea: {
    height: 100, // Atur sesuai kebutuhan
  },
});

export default Textarea;
