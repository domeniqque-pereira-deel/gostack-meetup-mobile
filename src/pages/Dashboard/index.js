import { format, parseISO, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useEffect, useState, useMemo } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import api from '~/services/api';

import {
  Container,
  DateControls,
  DateText,
  DateControlButton,
  MeetupList,
  MeetupItem,
  MeetupItemBanner,
  MeetupItemDetailsContainer,
  MeetupDetailsTitle,
  MeetupDetails,
  MeetupDetailsText,
  SubscribeButton,
  Loading,
  FreeDayMessage,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const selectedDateText = useMemo(
    () => format(selectedDate, "dd 'de' MMMM", { locale: ptBR }),
    [selectedDate]
  );

  async function loadMeetups(pageNumber = nextPage, shouldReset = false) {
    if ((totalPages && pageNumber > totalPages) || loading) return;

    setLoading(true);

    if (shouldReset) {
      setMeetups([]);
    }

    const date = format(selectedDate, 'yyyy-MM-dd');
    const response = await api.get(`/meetups?date=${date}&page=${pageNumber}`);

    const { meetups: meetupResponse, totalPages: countPages } = response.data;

    const data = meetupResponse.map(meetup => ({
      ...meetup,
      dateFormated: format(parseISO(meetup.date), "dd 'de' MMMM', às' HH'h'", {
        locale: ptBR,
      }),
    }));

    setMeetups(shouldReset ? data : [...meetups, ...data]);
    setNextPage(pageNumber + 1);
    setTotalPages(countPages);
    setLoading(false);
  }

  useEffect(() => {
    loadMeetups(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  async function refreshList() {
    setRefreshing(true);

    await loadMeetups(1, true);

    setRefreshing(false);
  }

  function prevDate() {
    setSelectedDate(subDays(selectedDate, 1));
  }

  function nextDate() {
    setSelectedDate(addDays(selectedDate, 1));
  }

  return (
    <Background>
      <Container>
        <DateControls>
          <DateControlButton onPress={prevDate}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </DateControlButton>
          <DateText>{selectedDateText}</DateText>
          <DateControlButton onPress={nextDate}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </DateControlButton>
        </DateControls>

        {meetups.length === 0 && !loading && (
          <FreeDayMessage>Nenhum evento para este dia</FreeDayMessage>
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
                  <Icon name="event" size={30} color="#333" />
                  <MeetupDetailsText>{item.dateFormated}</MeetupDetailsText>
                </MeetupDetails>
                <MeetupDetails>
                  <Icon name="place" size={30} color="#333" />
                  <MeetupDetailsText>{item.location}</MeetupDetailsText>
                </MeetupDetails>
                <MeetupDetails>
                  <Icon name="person" size={30} color="#333" />
                  <MeetupDetailsText>
                    Organizador: {item.organizer.name}
                  </MeetupDetailsText>
                </MeetupDetails>

                <SubscribeButton onPress={() => {}} disabled={item.finished}>
                  {item.finished ? 'Evento finalizado' : 'Realizar inscrição'}
                </SubscribeButton>
              </MeetupItemDetailsContainer>
            </MeetupItem>
          )}
        />
      </Container>
    </Background>
  );
}
