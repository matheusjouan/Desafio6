import styled from 'styled-components/native';
// Importa o Componente WebView, onde será renderizado os itens de fora
import { WebView } from 'react-native-webview';

// Edita a WebView para ocupar a tela toda
export const Browser = styled(WebView)`
  flex: 1;
`;
