import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Author,
  Bio,
  SubmitProfile,
  SubmitProfileText,
} from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    loading: false,
    newUser: '',
    users: [],
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  async componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;

    this.setState({ loading: true });

    const response = await api.get(`/users/${newUser}`);

    const dados = {
      login: response.data.login,
      name: response.data.name,
      avatar: response.data.avatar_url,
      bio: response.data.bio,
    };
    this.setState({ users: [...users, dados], newUser: '', loading: false });

    Keyboard.dismiss();
  };

  handleSubmit = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Author>{item.name}</Author>
              <Bio>{item.bio}</Bio>
              <SubmitProfile onPress={() => this.handleSubmit(item)}>
                <SubmitProfileText>Ver Perfil</SubmitProfileText>
              </SubmitProfile>
            </User>
          )}
        />
      </Container>
    );
  }
}
