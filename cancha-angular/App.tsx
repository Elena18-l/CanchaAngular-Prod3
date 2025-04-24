import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TeamScreen from './screens/Team';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Layout} from './components/Layout';
import AppNavigator from './navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" />

        {/* Header personalizado */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Cancha Angular</Text>
        </View>

        {/* Banner del grupo */}
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Shohoku</Text>
        </View>

        {/* Navegación */}
        <View style={styles.navigatorContainer}>
          <AppNavigator />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222', // fondo global más oscuro
  },
  header: {
    backgroundColor: '#F5D59A', // rojo fuerte
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#C02A2D',
    paddingVertical: 10,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  navigatorContainer: {
    flex: 1,
  },
});