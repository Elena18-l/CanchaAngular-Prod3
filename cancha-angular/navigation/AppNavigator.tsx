import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamScreen from '../screens/Team';
import PlayerDetail from '../screens/Player_detail';
import PlayerMedia from '../screens/Player_media';

// Tipos de navegación
export type RootStackParamList = {
  Team: undefined;
  PlayerDetail: { playerId: string };
  PlayerMedia: { playerId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const onPress = () => {
    console.log("Ver detalle presionado");
    // Aquí podrías navegar a otra pantalla, por ejemplo:
    // navigation.navigate('PlayerDetail', { playerId: '123' });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Team">
        <Stack.Screen
          name="Team"
          component={TeamScreen}
          options={{ title: 'Equipo' }}
        />
        <Stack.Screen
          name="PlayerDetail"
          component={PlayerDetail}
          options={{ title: 'Detalle del Jugador' }}
        />
        <Stack.Screen
          name="PlayerMedia"
          component={PlayerMedia}
          options={{ title: 'Media del Jugador' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 15,
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

export default AppNavigator;
