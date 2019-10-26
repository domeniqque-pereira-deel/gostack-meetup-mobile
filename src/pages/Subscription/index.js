import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';

import Background from '~/components/Background';
import api from '~/services/api';
import { loadSubscriptionsRequest } from '~/store/modules/user/actions';

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

function Subscription({ isFocused }) {
  const subscriptions = useSelector(state => state.user.subscriptions);
  const loading =
    useSelector(state => state.user.loadingSubscriptions) || false;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSubscriptionsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  async function handleUnsubscribe(id) {
    await api.delete(`/meetups/${id}/subscriptions`);

    Alert.alert('Inscrição cancelada', 'Inscrição cancelada com sucesso!');

    dispatch(loadSubscriptionsRequest());
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
          onRefresh={() => dispatch(loadSubscriptionsRequest())}
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

Subscription.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscription);
