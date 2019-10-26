import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import Background from '~/components/Background';
import DatePicker from '~/components/DatePicker';
import api from '~/services/api';
import { subscribeOnMeetupRequest } from '~/store/modules/user/actions';

import {
  Container,
  MeetupList,
  MeetupItem,
  MeetupItemBanner,
  MeetupItemDetailsContainer,
  MeetupDetailsTitle,
  MeetupDetails,
  MeetupDetailsText,
  SubscribeButton,
  Loading,
  Empty,
  SubscribedLabel,
  SubscribedLabelText,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const subscriptions = useSelector(state => state.user.subscriptions);

  const dispatch = useDispatch();

  async function loadMeetups(pageNumber = nextPage, shouldReset = false) {
    if ((totalPages && pageNumber > totalPages) || loading) return;

    setLoading(true);

    if (shouldReset) {
      setMeetups([]);
    }

    const subscribedIds = subscriptions.map(meetup => meetup.id);

    const date = format(selectedDate, 'yyyy-MM-dd');
    const response = await api.get(`/meetups?date=${date}&page=${pageNumber}`);

    const { meetups: meetupResponse, totalPages: countPages } = response.data;

    const data = meetupResponse.map(meetup => ({
      ...meetup,
      dateFormated: format(parseISO(meetup.date), "dd 'de' MMMM', às' HH'h'", {
        locale: ptBR,
      }),
      subscribed: subscribedIds.includes(meetup.id),
    }));

    setMeetups(shouldReset ? data : [...meetups, ...data]);
    setNextPage(pageNumber + 1);
    setTotalPages(countPages);
    setLoading(false);
  }

  useEffect(() => {
    loadMeetups(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, subscriptions]);

  async function refreshList() {
    setRefreshing(true);

    await loadMeetups(1, true);

    setRefreshing(false);
  }

  function handleSubscribe(meetup) {
    if (meetup.finished) return;

    dispatch(subscribeOnMeetupRequest(meetup));
  }

  return (
    <Background>
      <Container>
        <DatePicker
          date={selectedDate}
          onChange={(e, date) => setSelectedDate(date)}
        />

        {meetups.length === 0 && !loading && (
          <Empty>Nenhum evento para este dia</Empty>
        )}

        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          refreshing={refreshing}
          onEndReachedThreshold={0.1}
          onEndReached={() => loadMeetups()}
          onRefresh={refreshList}
          ListFooterComponent={loading && !refreshing && <Loading />}
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

                {item.subscribed ? (
                  <SubscribedLabel>
                    <Icon name="check" size={25} color="#f94d6a" />

                    <SubscribedLabelText>Inscrito</SubscribedLabelText>
                  </SubscribedLabel>
                ) : (
                  <SubscribeButton
                    onPress={() => handleSubscribe(item)}
                    disabled={item.finished}>
                    {item.finished ? 'Evento finalizado' : 'Realizar inscrição'}
                  </SubscribeButton>
                )}
              </MeetupItemDetailsContainer>
            </MeetupItem>
          )}
        />
      </Container>
    </Background>
  );
}
