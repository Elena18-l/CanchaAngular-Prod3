
import { Text, View, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>
        Web desarrollada por el grupo Cancha Angular para la asignatura FP:0.67...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#36332E',
    padding: 10,
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center'
  }
})
;
