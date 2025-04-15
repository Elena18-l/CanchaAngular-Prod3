import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../firebaseConfig'; // ajusta el path
import { collection, getDocs } from 'firebase/firestore';

interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  photo: string;
}

export default function Players() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  // Cargar jugadores desde Firebase
  useEffect(() => {
    const fetchPlayers = async () => {
      const snapshot = await getDocs(collection(db, 'players'));
      const playersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Player[];
      setPlayers(playersList);
    };

    fetchPlayers();
  }, []);

  return (
    <ScrollView style={{ padding: 16 }}>
      {/* Intro al equipo */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Image
          source={require('../assets/shohoku_logo.png')} // ajusta la ruta
          style={{ width: 150, height: 150, marginBottom: 12 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          Shohoku es el equipo protagonista de Slam Dunk. ¡Conócelos!
        </Text>
      </View>

      {/* Lista de jugadores */}
      {players.map(player => (
        <TouchableOpacity
          key={player.id}
          onPress={() => setSelectedPlayer(player)}
          style={{
            padding: 12,
            backgroundColor: '#eee',
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16 }}>{player.number} - {player.name}</Text>
        </TouchableOpacity>
      ))}

      {/* Detalles del jugador seleccionado */}
      {selectedPlayer && (
        <View
          style={{
            marginTop: 24,
            padding: 16,
            backgroundColor: '#ddd',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {selectedPlayer.name}
          </Text>
          <Text>Número: {selectedPlayer.number}</Text>
          <Text>Posición: {selectedPlayer.position}</Text>
          <Image
            source={{ uri: selectedPlayer.photo }}
            style={{ width: '100%', height: 200, marginTop: 12 }}
            resizeMode="cover"
          />
        </View>
      )}
    </ScrollView>
  );
}
