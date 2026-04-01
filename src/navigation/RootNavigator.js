import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0066cc',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Filmes',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Detalhes"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params?.titulo || 'Detalhes',
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
