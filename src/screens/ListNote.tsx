import {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  FlatList,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import Item from '../components/Item';
import Buttons from '../components/Buttons';
import {useNavigation} from '@react-navigation/native';
import {ListNoteState} from '../../utils/recoilState';
import EncryptedStorage from 'react-native-encrypted-storage';

import {processDecrypt} from '../../utils/encriptions';

function ListNote({navigation}) {
  const data = useRecoilValue(ListNoteState);
  const [listNote, setListNote] = useState([]);

  useEffect(() => {
    processDecrypt(data).then((result: any) => {
      setListNote(result);
    });
  }, [data]);

  const handleItem = item => {
    const parameterData = {
      detail: item,
    };
    navigation.navigate('AddNote', {parameterData});
  };

  const handleAddNote = () => {
    navigation.navigate('AddNote');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>List Note</Text>

        <FlatList
          data={listNote}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Item text={item.text} onPress={() => handleItem(item)} />
          )}
          style={styles.listNote}
        />
      </View>

      <Buttons
        title="Add Note"
        onPress={handleAddNote}
        style={styles.buttonAddNote}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop: StatusBar.currentHeight || 0,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 16,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    flex: 1,
  },

  listNote: {
    height: 'auto',
  },
  buttonAddNote: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 32,
  },
});

export default ListNote;
