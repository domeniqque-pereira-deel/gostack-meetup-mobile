import { Alert } from 'react-native';
import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '~/services/api';

import { signFailure, signInSuccess } from './actions';

export function* signUp({ payload }) {
  try {
    const { name, email, password, passwordConfirmation } = payload.data;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      passwordConfirmation,
    });

    Alert.alert('Cadastro finalizado', 'Cadastro efetuado com sucesso!');

    // history.push('/');
  } catch (err) {
    Alert.alert('Falha no cadastro', 'Verifique seus dados!');
    yield put(signFailure());
  }
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', { email, password });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/meetups');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('persist/REHYDRATE', setToken),
  // takeLatest('@auth/SIGN_OUT', signOut),
]);
