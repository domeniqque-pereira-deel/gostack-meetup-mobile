import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton).attrs(props => ({
  disabled: props.disabled,
}))`
  height: 46px;
  background: #f94d6a;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  ${props => props.disabled && 'background: #ddd;'}
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
