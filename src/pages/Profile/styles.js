import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  padding: 0 20px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  font-size: 18px;
`;

export const Divisor = styled.View`
  border-top-color: #fff;
  opacity: 0.1;
  border-top-width: 1px;
  padding: 10px 0;
  margin: 10px 0;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
  background: #e5556e;
`;

export const LogoutButton = styled(Button)`
  margin-top: 20px;
  background: #d44059;
`;
