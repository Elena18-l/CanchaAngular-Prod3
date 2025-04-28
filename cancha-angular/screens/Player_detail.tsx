import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, Pressable, Modal } from 'react-native';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase-setup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Banner from '../components/banner';
import PentagonChart from '../components/PentagonChart';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { Player } from '../type/player';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerDetail'>;

const PlayerDetail = () => {
  const route = useRoute();
  const { playerId } = route.params as { playerId: string };
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);

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
    <View style={{ flex: 1 }}>
      <Banner playerId={playerId} />

      <ScrollView contentContainerStyle={styles.container}>

        
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={handlePress}>
          <Text style={styles.text}>Ver Media </Text>
          <MaterialIcons name="perm-media" size={20} color="#fff" style={{ marginLeft: 5 }} />
        </Pressable>

        <View style={styles.stackContainer}>
          {/* Imagen grande */}
          <View style={styles.imageWrapper}>
            <Image source={{ uri: player.foto }} style={styles.fullimage} />

            {/* Para abrir modal al tocar imagen */}
            <Pressable style={StyleSheet.absoluteFill} onPress={() => setModalVisible(true)} />
          </View>

          {/* Bio encima */}
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

      {/* Modal de imagen grande */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <MaterialIcons name="close" size={30} color="#fff" />
          </Pressable>
          <Image source={{ uri: player.foto }} style={styles.fullscreenImage} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  stackContainer: {
    width: '100%',
    height: 650,
    position: 'relative',
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'visible',
  },
  imageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  fullimage: {
    width: '95%',
    height: 400,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  infoUnderImage: {
    marginTop: 420,
    width: '100%',
    padding: 10,
    backgroundColor: 'transparent',
    zIndex: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
    flexBasis: '50%',
  },
  value: {
    fontSize: 16,
    color: '#333',
    flexGrow: 1,
    textAlign: 'right',
  },
  bioGlass: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: '#111',
    textAlign: 'justify',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9809',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.8,
  },
  chartContainer: {
    marginTop: 20,
    width: '100%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
});

export default PlayerDetail;
