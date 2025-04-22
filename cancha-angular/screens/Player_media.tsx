import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PlayerMedia = () => {
  const route = useRoute();
  const { playerId } = route.params as { playerId: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Media</Text>
      <Text style={styles.subtitle}>ID del jugador recibido:</Text>
      <Text style={styles.playerId}>{playerId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce4ec',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
  },
  playerId: {
    marginTop: 10,
    fontSize: 20,
    color: '#e91e63',
    fontWeight: '600',
  },
});

export default PlayerMedia;
