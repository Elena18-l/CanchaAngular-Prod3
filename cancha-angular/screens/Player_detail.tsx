/*import PentagonChart from './PentagonChart';

const stats = {
  fisico: 8,
  tecnica: 7,
  fuerzaMental: 9,
  resistencia: 6,
  habilidadEspecial: 7,
};

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#111' }}>
      <PentagonChart skills={stats} />
    </View>
  );
}*/
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-setup'; // ✅ Así debe ser ahora
import { Player } from '../type/player'
import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
type PlayerDetailProps = {
  id: string;
  name: string;
  age: number;
  foto: string;
  portrait: string;
  team: string;
  stature?: number;
  average?: number;
  shirtNumber?: number;
  position: string;
  gallery: string[];
  bio: string;
  skills:Skills;
  video: string[];
}
type Skills = {
  fisico:number
  tecnica:number
  fuerzaMental:number
  resistencia:number
  habilidadEspecial:number
};

const PlayerDetail = () => {
  const route = useRoute();
  const { playerId } = route.params as { playerId: string };

  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlayer = async () => {
    try {
      const playerDoc = await getDoc(doc(db, 'players', playerId));
      if (playerDoc.exists()) {
        setPlayer(playerDoc.data() as Player);
      }
    } catch (error) {
      console.error('Error loading player:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPlayer();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!player) {
    return <Text>Jugador no encontrado</Text>;
  }

  return (
    <View>
      <Image source={{ uri: player.portrait }} style={{ width: 100, height: 100 }} />
      <Text>{player.name}</Text>
      <Text>{player.position}</Text>
      {/* Aquí podrías meter PentagonChart con player.skills */}
    </View>
  );
};
export default PlayerDetail;
