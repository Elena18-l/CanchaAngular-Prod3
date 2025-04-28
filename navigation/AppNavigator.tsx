import React from 'react';
import { Image, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TeamScreen from '../screens/Team';
import PlayerDetail from '../screens/Player_detail';
import PlayerMedia from '../screens/Player_media';
import Banner from '../components/banner';

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
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#F5D59A',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Team')}>
              <Image
                source={require('../assets/logo.png')}
                style={{ width: 40, height: 40, marginRight: 10 }}
                resizeMode="contain"
              />
            </Pressable>
            
            ),
          })}
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
