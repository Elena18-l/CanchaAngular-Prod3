import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-setup';
import { PlayerShort } from '../type/player';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Team'>;

const TeamScreen = () => {
  const [players, setPlayers] = useState<PlayerShort[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'players'));
        const playersData: PlayerShort[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Fetched player:', data);  // Agrega este log
          playersData.push({
            id: doc.id,
            name: data.name,
            shirtNumber: data.shirtNumber,
            position: data.position,
            portrait: data.portrait,
          });
        });
  
        console.log('Players data:', playersData);  // Verifica si se llenó correctamente
        setPlayers(playersData);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlayers();
  }, []); // Solo se ejecuta una vez cuando se monta el componente
   // Solo se ejecuta una vez cuando se monta el componente

  const PlayerCard = ({ item }: { item: PlayerShort }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('PlayerDetail', { playerId: item.id })}
    >
      <Image source={{ uri: item.portrait }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{item.shirtNumber} - {item.name}</Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
    </Pressable>
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
      renderItem={({ item }) => <PlayerCard item={item} />}
      keyExtractor={(player) => player.id}
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
