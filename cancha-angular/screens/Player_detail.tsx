import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-setup'; // ✅ Así debe ser ahora
import { Player } from '../type/player'
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDoc } from 'firebase/firestore';
import PentagonChart from '../components/PentagonChart';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Banner from '../components/banner';
import { BlurView } from 'expo-blur';
// import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
  // Usando FontAwesome, pero puedes elegir otro conjunt



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
  skills: Skills;
  video: string[];
}
type Skills = {
  fisico: number
  tecnica: number
  fuerzaMental: number
  resistencia: number
  habilidadEspecial: number
};

const PlayerDetail = () => {
  const route = useRoute();
  const { playerId } = route.params as { playerId: string };
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    console.log('Boton activado');
    console.log('Navegando a PlayerMedia con ID:', playerId);
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
        <View style={{ flex: 1 }}>
      <Banner playerId={playerId} />
      <ScrollView contentContainerStyle={styles.container}>   
          {/* Botón para ver media */}
          <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={() => handlePress()}>
          <Text style={styles.text}>Ver Media </Text>
          <MaterialIcons name="perm-media" size={20} color="#fff" paddingRight={5}/>
        </Pressable>

      
      {/* Contenedor con todos los elementos: */}
      <View style={styles.stackContainer}>
        {/* 🖼️ Imagen encima */}
        <Image source={{ uri: player.foto }} style={styles.fullimage} />
        
        {/* 👇 Los textos con los datos debajo de la imagen */}
        <View style={styles.infoUnderImage}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Posición:</Text>      
            <Text style={styles.value}>{player.position ?? 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Número:</Text>
            <Text style={styles.value}>{player.shirtNumber ?? 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Edad:</Text>
            <Text style={styles.value}>{player.age ?? 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Promedio:</Text>
            <Text style={styles.value}>{player.average ?? 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Altura:</Text>
            <Text style={styles.value}>{player.stature ? `${player.stature} cm` : 'N/A'}</Text>
          </View>
        </View>
  
        {/* ✨ Bio con efecto glass encima de la imagen */}
        <BlurView intensity={40} tint="light" style={styles.bioGlass}>
          <Text style={styles.sectionTitle}>Biografía</Text>
          <Text style={styles.bio}>{player.bio}</Text>
        </BlurView>
      </View>
  
  
  
      {/* Gráfico de habilidades */}
      <View style={styles.chartContainer}>
        <PentagonChart skills={player.skills} />        
      </View>
    </ScrollView>
    </View>
  );
  
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: '80%',
    height: 300,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  stackContainer: {
    position: 'relative',
    width: 360,
    height: 650,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  
  infoUnderImage: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    
    
  },
  
  fullimage: {
    
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1,  // La imagen está encima de los textos
    width: '95%',
    height: '100%',
    resizeMode: 'contain',
    
  },
  
  bioGlass: {
    position: 'absolute',
    zIndex: 2,  // Bio encima de la imagen y los textos
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
   
  },
  
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  
  position: {
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
  },
  
  bio: {
    fontSize: 14,
    color: '#111',
    textAlign: 'justify',
  },
  
  image: {
    width: 600,
    height: 600,
    borderRadius: 70,
    marginBottom: 16,
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
 
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 4,
  },
  label: {
    
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexBasis: '50%',
    textAlign: 'left',
    maxWidth: 100,
  },
  
  value: {
    fontWeight: 'bold',
    backgroundColor: 'white',
    fontSize: 16,
    paddingVertical: 2,
    paddingHorizontal: 10,
    flexGrow: 1,
    textAlign: 'right',
    overflow: 'hidden',
  
    // 🔽 AÑADIDOS para mostrar el borde
    borderWidth: 1,
    borderColor: '#000',
  
  },
  button: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FF9809', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    
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
