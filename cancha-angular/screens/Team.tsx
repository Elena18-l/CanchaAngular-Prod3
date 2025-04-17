import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-setup'; // ✅ Así debe ser ahora

type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  avatarUrl: string;
};

const TeamScreen = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlayers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'players'));
      const playersData: Player[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        playersData.push({
          id: doc.id,
          name: data.name,
          number: data.number,
          position: data.position,
          avatarUrl: data.avatarUrl,
        });
      });

      setPlayers(playersData);
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const renderItem = ({ item }: { item: Player }) => (
    <TouchableOpacity style={styles.card} onPress={() => console.log('Ver detalle de:', item.name)}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.number} - {item.name}</Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#c00" />
      </View>
    );
  }

  return (
    <FlatList
      data={players}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    color: '#666',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TeamScreen;

const getPlayers = async () => {
  const querySnapshot = await getDocs(collection(db, 'players'));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
};
