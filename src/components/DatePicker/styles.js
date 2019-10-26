import RNDateTimePicker from '@react-native-community/datetimepicker';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  margin: 20px 0;

  ${props =>
    !props.opened &&
    css`
      flex-direction: row;

      justify-content: center;
      align-items: center;
    `}
`;

export const DateControlButton = styled.TouchableOpacity``;

export const DateButton = styled.TouchableOpacity``;

export const DateText = styled.Text`
  color: #fff;
  font-size: 23px;
  padding: 0 20px;
  font-weight: bold;
  text-align: center;
  opacity: ${props => (props.opened ? 0.6 : 1)};
`;

export const Picker = styled.View`
  background: #fff;
  margin-top: 30px;
  border-radius: 4px;
`;

export const DateTimePicker = styled(RNDateTimePicker)`
  color: #fff;
  background: red;
`;
