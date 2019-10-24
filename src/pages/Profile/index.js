import React, { useState, useRef } from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Background from '~/components/Background';
import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
  Divisor,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string().required('O email é obrigatório'),
  oldPassword: Yup.string(),
  password: Yup.string().when('oldPassword', (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, 'A senha deve ter no mínimo 6 dígitos')
          .required('Informe a nova senha')
      : field
  ),
  passwordConfirmation: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirme sua senha')
          .oneOf(
            [Yup.ref('password')],
            'A confirmação de senha não corresponde'
          )
      : field
  ),
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const emailRef = useRef();
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  async function handleSubmit() {
    try {
      const data = { name, email, oldPassword, password, passwordConfirmation };

      await schema.validate(data, { abortEarly: false, stripUnknown: true });

      setErrors({});
      dispatch(updateProfileRequest(data));
      setOldPassword('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (err) {
      if (!err.inner) {
        throw err;
      }

      const validationErrors = err.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});

      setErrors(validationErrors);
    }
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Background>
      <Container>
        <Form>
          <FormInput
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <Divisor />

          <FormInput
            secureTextEntry
            placeholder="Senha atual"
            ref={oldPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
            error={errors.oldPassword}
          />

          <FormInput
            secureTextEntry
            placeholder="Nova senha"
            ref={passwordRef}
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => passwordConfirmationRef.current.focus()}
            error={errors.password}
          />

          <FormInput
            secureTextEntry
            placeholder="Confirmação de senha"
            ref={passwordConfirmationRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            error={errors.passwordConfirmation}
          />

          <SubmitButton onPress={handleSubmit}>Salvar perfil</SubmitButton>

          <LogoutButton onPress={handleLogout}>Sair do MeetApp</LogoutButton>
        </Form>
      </Container>
    </Background>
  );
}
