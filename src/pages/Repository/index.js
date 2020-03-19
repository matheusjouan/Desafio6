import React from 'react';
import PropTpyes from 'prop-types';

import { Browser } from './styles';

export default function Repository({ route }) {
  const { repo } = route.params;

  return <Browser source={{ uri: repo.html_url }} />;
}

Repository.propTypes = {
  route: PropTpyes.shape({
    params: PropTpyes.shape({
      repo: PropTpyes.shape({
        html_url: PropTpyes.string,
      }),
    }),
  }).isRequired,
};
