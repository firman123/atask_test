import {SafeAreaView, Text, StyleSheet, StatusBar} from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Textarea from '../components/TextArea';
import Buttons from '../components/Buttons';
import {ListNoteState} from '../../utils/recoilState';
import {useState} from 'react';
import {encryptText} from '../../utils/encriptions';

function AddNote({route, navigation}) {
  const parameterData = route?.params?.parameterData?.detail || '';
  const [note, setNote] = useState(parameterData?.text);
  const [noteList, setNoteList] = useRecoilState(ListNoteState);

  const submitNote = async () => {
    const keyPassword = await AsyncStorage.getItem('key_login');
    const value = await encryptText({text: note, key: keyPassword});

    if (parameterData) {
      const mapping = noteList.map(data => {
        if (data.id === parameterData.id) {
          return {
            ...data,
            text: '',
            cipher: value?.cipher,
            iv: value?.iv,
            key: value?.key,
          };
        }
        return data;
      });

      setNoteList(mapping);
    } else {
      setNoteList(oldList => [
        ...oldList,
        {
          id: oldList.length,
          cipher: value?.cipher,
          iv: value?.iv,
          key: value?.key,
        },
      ]);
    }

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {parameterData ? 'Edit Note' : 'Add Note'}
      </Text>
      <Textarea
        value={note}
        title={parameterData ? 'Edit Note' : 'Input Note'}
        onChangeText={value => setNote(value)}
      />

      <Buttons
        title="Submit"
        style={{marginTop: 12}}
        onPress={() => submitNote()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 8,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight || 0,
    padding: 16,
  },
});

export default AddNote;
