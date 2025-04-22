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
import { View, Text,Pressable, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-setup'; // ✅ Así debe ser ahora
import { Player } from '../type/player'
import { useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import PentagonChart from '../components/PentagonChart';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerDetail'>;

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
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('PlayerMedia', { playerId });
  };

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
    <ScrollView contentContainerStyle={styles.container}>

      <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handlePress}>
            <Text style={styles.text}>Ver Media</Text>
          </Pressable>

      <Image source={{ uri: player.portrait }} style={styles.image} />
      <Text style={styles.name}>{player.name}</Text>
      <Text style={styles.position}>{player.position}</Text>
      <View style={styles.infoRow}>
  <Text style={styles.label}>Número:</Text>
  <Text style={styles.value}>{player.shirtNumber ?? 'N/A'}</Text>
</View>
<View style={styles.infoRow}>
  <Text style={styles.label}>Promedio:</Text>
  <Text style={styles.value}>{player.average ?? 'N/A'}</Text>
</View>
<View style={styles.infoRow}>
  <Text style={styles.label}>Altura:</Text>
  <Text style={styles.value}>{player.stature ? `${player.stature} cm` : 'N/A'}</Text>
</View>

      <View style={styles.chartContainer}>
        <PentagonChart skills={player.skills} />
      </View>

      <Text style={styles.sectionTitle}>Biografía</Text>
      <Text style={styles.bio}>{player.bio}</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  bio: {
    fontSize: 16,
    color: '#444',
    textAlign: 'justify',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    marginRight: 8,
  },
  pressed: {
    opacity: 0.8,
  },
});
export default PlayerDetail;
