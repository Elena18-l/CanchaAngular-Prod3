import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { db } from '../config/firebase-setup';
import { doc, getDoc } from 'firebase/firestore';
import { Player } from '../type/player';

const PlayerMedia = () => {
    const route = useRoute();
    const { playerId } = route.params as { playerId: string };
  
    const [player, setPlayer] = useState<Player | null>(null);
  
    useEffect(() => {
      const fetchPlayer = async () => {
        const playerDoc = await getDoc(doc(db, 'players', playerId));
        if (playerDoc.exists()) {
          setPlayer(playerDoc.data() as Player);
        }
      };
      fetchPlayer();
    }, [playerId]);
  
    if (!player) return <Text>Cargando multimedia...</Text>;
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Galería de {player.name}</Text>
        <FlatList
          data={player.gallery}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />
      </View>
    );
  };  

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  image: { width: '100%', height: 200, marginBottom: 10, borderRadius: 10 },
});

export default PlayerMedia;
