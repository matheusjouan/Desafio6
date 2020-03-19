import 'react-native-gesture-handler';
import './config/ReactotroConfig';

import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import Routes from './routes';

function App() {
  return (
    <NavigationContainer>
      {/* Estilização da barra onde mostra (bateria/hora/etc) */}
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      {/* Importação das rotas */}
      <Routes />
    </NavigationContainer>
  );
}

export default App;
