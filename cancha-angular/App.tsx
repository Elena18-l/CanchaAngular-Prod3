import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
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
          <Image 
          source={require('./assets/logo.png')} 
          style={{ width: 50, height: 50 }} 
          resizeMode="contain" />
         
        </View>

        {/* Banner del grupo */}
        <View style={styles.banner}>
        <Image 
          source={require('./assets/logosho.png')} 
          style={{ width:100, height: 60 }} 
          resizeMode="contain" />
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#C02A2D',
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