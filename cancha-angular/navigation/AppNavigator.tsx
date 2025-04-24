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
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Team"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff', // color vino
          },
          headerTintColor: '#000', // color del texto e íconos
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      >
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

export default AppNavigator;
