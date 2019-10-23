import PropTypes from 'prop-types';
import React, { useState, useRef } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';
import Background from '~/components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Informe seu email')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
    .required('A senha é obrigatória'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password')],
    'As senhas não correspondem'
  ),
});

export default function SignUp({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  async function handleSubmit() {
    try {
      const data = { name, email, password, passwordConfirmation };

      await schema.validate(data, { abortEarly: false, stripUnknown: true });
      
      setErrors({});
      dispatch(signUpRequest(data));
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
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <FormInput
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordConfirmationRef.current.focus()}
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <FormInput
            secureTextEntry
            placeholder="Repita a senha"
            ref={passwordConfirmationRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={passwordConfirmation}
            onChangeText={setPasswordConfirmation}
            error={errors.passwordConfirmation}
          />

          <SubmitButton onPress={handleSubmit}>Criar conta</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já tenho conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
