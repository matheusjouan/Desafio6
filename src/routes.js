import React from 'react';

// Definição do tipo navegação em pilha
import { createStackNavigator } from '@react-navigation/stack';

// Importações das páginas
import Main from './pages/Main/index';
import User from './pages/User/index';
import Repository from './pages/Repository/index';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      screenOptions={{
        // Definição do fundo do cabeçalho
        headerStyle: {
          backgroundColor: '#7159c1',
        },
        // Personalização do texto (bold, family, etc)
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: '#FFF',
        // Alinha ao centro o título
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="Main" component={Main} options={{ title: 'Home' }} />
      <Stack.Screen
        name="User"
        component={User}
        // route => são os parâmetros passados
        // route.params.dado => acessa o dado desejado
        options={({ route }) => ({ title: route.params.user.login })}
      />
      <Stack.Screen
        name="Repository"
        component={Repository}
        options={({ route }) => ({ title: route.params.repo.name })}
      />
    </Stack.Navigator>
  );
}
