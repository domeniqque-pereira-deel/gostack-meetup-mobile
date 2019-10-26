import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import api from '~/services/api';

import {
  Container,
  MeetupList,
  MeetupItem,
  MeetupItemBanner,
  MeetupItemDetailsContainer,
  MeetupDetailsTitle,
  MeetupDetails,
  MeetupDetailsText,
  UnsubscribeButton,
  Loading,
  Empty,
} from './styles';

export default function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadSubscriptions() {
    setLoading(true);

    const response = await api.get('subscriptions');

    const data = response.data.map(subscription => subscription.Meetup);

    setSubscriptions(data);
    setLoading(false);
  }

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function handleUnsubscribe(id) {
    await api.delete(`/meetups/${id}/subscriptions`);

    Alert.alert('Inscrição cancelada', 'Inscrição cancelada com sucesso!');

    loadSubscriptions();
  }

  return (
    <Background>
      <Container>
        {subscriptions.length === 0 && !loading && (
          <Empty>Nenhuma inscrição</Empty>
        )}

        <MeetupList
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          refreshing={loading}
          onRefresh={loadSubscriptions}
          ListFooterComponent={loading && <Loading />}
          renderItem={({ item }) => (
            <MeetupItem>
              <MeetupItemBanner
                source={{ uri: item.banner.url }}
                alt={item.title}
              />

              <MeetupItemDetailsContainer>
                <MeetupDetailsTitle>{item.title}</MeetupDetailsTitle>

                <MeetupDetails>
                  <Icon name="event" size={30} color="#999" />
                  <MeetupDetailsText>{item.dateFormated}</MeetupDetailsText>
                </MeetupDetails>
                <MeetupDetails>
                  <Icon name="place" size={30} color="#999" />
                  <MeetupDetailsText>{item.location}</MeetupDetailsText>
                </MeetupDetails>
                <MeetupDetails>
                  <Icon name="person" size={30} color="#999" />
                  <MeetupDetailsText>
                    Organizador: {item.organizer.name}
                  </MeetupDetailsText>
                </MeetupDetails>

                <UnsubscribeButton
                  onPress={() => handleUnsubscribe(item.id)}
                  disabled={item.finished}>
                  Cancelar inscrição
                </UnsubscribeButton>
              </MeetupItemDetailsContainer>
            </MeetupItem>
          )}
        />
      </Container>
    </Background>
  );
}
