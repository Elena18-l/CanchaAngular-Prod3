import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Web desarrollada por el grupo Cancha Angular para la asignatura FP:0.67 - Desarrollo front-end con frameworks en entornos móviles - UOC - Jesuïtes. 2025.{"\n"}
        Derechos de propiedad intelectual de Takehiko Inoue y Sueisha.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#36332E',
    padding: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
});
