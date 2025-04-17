import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamScreen from '../screens/Team';
import PlayerDetail from '../screens/Player_detail';

// Tipos de navegación
export type RootStackParamList = {
  Team: undefined;
  PlayerDetail: { playerId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
