import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  StarList,
  Header,
  Avatar,
  Author,
  Bio,
  Starred,
  OwnerAvatar,
  Info,
  OwnerAuthor,
  Title,
  Loading,
} from './styles';

export default class User extends Component {
  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
  };

  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          login: PropTypes.string,
          avatar: PropTypes.string,
          name: PropTypes.string,
          bio: PropTypes.string,
        }),
      }),
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    const { page } = this.state;
    this.load(page);
  }

  load = async page => {
    const { route } = this.props;
    const { user } = route.params;
    const { stars } = this.state;

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {
        page,
      },
    });

    this.setState({
      // Pega de onde parou e adiciona o outro restante da página
      stars: page > 1 ? [...stars, ...response.data] : response.data,
      loading: false,
      page,
      refreshing: false,
    });
  };

  loadMoreItens = () => {
    const { page } = this.state;
    const nextPage = page + 1;

    this.load(nextPage);
  };

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] });
    // 1 => volta para primeira página
    this.load(1);
  };

  handleNavigate = repo => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repo });
  };

  render() {
    const { route } = this.props;
    const { user } = route.params;
    const { stars, loading, refreshing } = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Author>{user.name}</Author>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <StarList
            data={stars}
            keyExtractor={star => String(star.id)}
            // Quando chegar 20% da lista, gatilho p/ onEndReached
            onEndReachedThreshold={0.1}
            // Quando chegar no limite definido chama-se a função de carregar mais itens
            onEndReached={this.loadMoreItens}
            // Função que dispara quando é arrastado a tela td p/ baixo
            onRefresh={this.refreshList}
            // Após arrastado verifica se refresing é true para atualizar
            refreshing={refreshing}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <OwnerAuthor>{item.owner.login}</OwnerAuthor>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
