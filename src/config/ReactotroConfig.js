import Reactotron from 'reactotron-react-native';

/**
 * Varíavel global
 * true => ambiente desenvolvimento
 * false => produção
 */
if (__DEV__) {
  const tron = Reactotron.configure({ host: '192.168.0.6' })
    .useReactNative()
    .connect();

  console.tron = tron;

  // Limpa a timeline no reload
  tron.clear();
}
