import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-setup';
import { PlayerShort } from '../type/player';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { ImageBackground } from 'react-native';
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
   <ImageBackground source={{ uri: item.portrait }} style={styles.avatar} imageStyle={{ borderRadius: 10 }}>
      <View style={{ padding: 10 }}>
        <Text style={styles.name}>{item.shirtNumber} - {item.name}</Text>
        <Text style={styles.position}>{item.position}</Text>
      </View>
    </ImageBackground>
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
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    padding: 6,
    backgroundColor: '#C02A2D',
  },
  avatar: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    justifyContent: 'flex-end',
    
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  position: {
    fontSize: 14,
    color: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TeamScreen;
