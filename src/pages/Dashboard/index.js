import React from 'react';
import { Text } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <Background>
      <Container>
        <Text>Dashboard</Text>
      </Container>
    </Background>
  );
}
