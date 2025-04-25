import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-setup';

type BannerProps = {
  playerId: string;
};

const Banner = ({ playerId }: BannerProps) => {
  const [playerName, setPlayerName] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerName = async () => {
      try {
        const docRef = doc(db, 'players', playerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const playerData = docSnap.data();
          setPlayerName(playerData.name);
        }
      } catch (error) {
        console.error('Error fetching player name:', error);
      }
    };

    fetchPlayerName();
  }, [playerId]);

  return (
    <View style={styles.banner}>
      <Image
        source={require('../assets/logosho.png')}
        style={styles.bannerImage}
        resizeMode="contain"
      />
      {playerName && <Text style={styles.playerName}>{playerName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#C02A2D',
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: 80,
    height: 40,
  },
    playerName: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default Banner;
