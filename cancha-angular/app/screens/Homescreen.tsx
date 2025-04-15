import React, { useState } from 'react';
import { View, TextInput, Modal, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Players from '../../components/Players';
import PlayerResults from '../../components/PlayerResults';
import Footer from '../../components/Footer';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <Header onReset={() => setSearchText('')} />
      
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar jugador..."
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      <Players onSelectPlayer={() => {}} />

      <Modal visible={searchText.length > 0} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <PlayerResults searchText={searchText} />
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBar: {
    margin: 16,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%'
  }
});
