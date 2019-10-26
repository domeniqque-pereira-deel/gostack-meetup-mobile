import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateControls = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const DateControlButton = styled.TouchableOpacity``;

export const DateText = styled.Text`
  color: #fff;
  font-size: 23px;
  padding: 0 20px;
  font-weight: bold;
`;

export const MeetupList = styled(FlatList).attrs({
  showsVerticalScrollIndicator: false,
})`
  margin: 0 15px;
`;

export const MeetupItem = styled.View`
  background: #fff;
  margin: 10px 0;
  border-radius: 4px;
`;

export const MeetupItemBanner = styled.Image.attrs({
  resizeMode: 'cover',
})`
  min-height: 180px;
`;

export const MeetupItemDetailsContainer = styled.View`
  padding: 20px;
`;

export const MeetupDetailsTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  padding: 10px 0 25px;
`;

export const MeetupDetails = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 4px;
`;

export const MeetupDetailsText = styled.Text`
  font-size: 13px;
  color: #999;
  padding-left: 10px;
`;

export const SubscribeButton = styled(Button)`
  margin-top: 25px;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff',
})`
  margin: 30px 0;
`;

export const FreeDayMessage = styled.Text`
  align-self: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-top: 30px;
  opacity: 0.8;
`;

export const SubscribedLabel = styled.View`
  height: 46px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const SubscribedLabelText = styled.Text`
  margin-left: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #f94d6a;
`;
