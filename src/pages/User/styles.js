import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.View`
  align-items: center;
  margin: 0 20px 30px;
  border-bottom-width: 1px;
  border-color: #eee;
  padding-bottom: 20px;
`;

export const Avatar = styled.Image`
  height: 100;
  width: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const Author = styled.Text`
  font-size: 15px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin-top: 5px;
  font-size: 14px;
  color: #999;
  text-align: center;
  line-height: 18px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: '#7159c1',
  size: 50,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const StarList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const Starred = styled(RectButton)`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  /* Mostra um espaço cinza quando esta carregando a imagem */
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const OwnerAuthor = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;
