import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TeamScreen from './screens/Team';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Layout} from './components/Layout';
export default function App() {
  return (
    <SafeAreaProvider>
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      <Layout/>
    </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
