import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const passwordRef = useRef();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Informe seu email')
      .required('O email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  async function handleSubmit() {
    try {
      const data = { email, password };

      await schema.validate(data, { abortEarly: false, stripUnknown: true });

      setErrors({});
      dispatch(signInRequest(...data));
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

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <FormInput
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
