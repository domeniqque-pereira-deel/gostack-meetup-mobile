import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 2;
  border-bottom-color: ${props => (props.hasError ? '#f94d6a' : 'transparent')};
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255, 0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;

export const Error = styled.Text`
  font-size: 14px;
  color: #f94d6a;
  padding: 0 0 15px;
`;
