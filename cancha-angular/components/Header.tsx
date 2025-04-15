import { MouseEventHandler } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Header({ onReset }: { onReset: () => void }) {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={onReset}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>
      <Image source={require('../assets/logosho.png')} style={styles.logosho} />
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#FACD7A',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  logosho: {
    width: 40,
    height: 40
  }
});