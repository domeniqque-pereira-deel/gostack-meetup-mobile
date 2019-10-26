import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import {
  updateProfileSuccess,
  loadSubscriptionsSuccess,
  subscribeOnMeetupSuccess,
} from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro ao atualizar perfil', 'Veririfique seus dados!');
  }
}

export function* loadSubscriptions() {
  const response = yield call(api.get, 'subscriptions');

  const data = response.data.map(({ Meetup }) => ({
    ...Meetup,
    dateFormated: format(parseISO(Meetup.date), "dd 'de' MMMM', às' HH'h'", {
      locale: ptBR,
    }),
  }));

  yield put(loadSubscriptionsSuccess(data));
}

export function* subscribeOnMeetup({ payload }) {
  try {
    const { meetup } = payload;

    yield call(api.post, `meetups/${meetup.id}/subscriptions`);

    yield put(subscribeOnMeetupSuccess(meetup));

    Alert.alert('Inscrito', 'Inscrição realizada com sucesso!');
  } catch (err) {
    Alert.alert('Inscrição não realizada', err.response.data.error);
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/LOAD_SUBSCRIPTIONS_REQUEST', loadSubscriptions),
  takeLatest('@user/SUBSCRIBE_ON_MEETUP_REQUEST', subscribeOnMeetup),
]);
