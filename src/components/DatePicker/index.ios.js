import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format, addDays, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PropType from 'prop-types';
import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  DateControlButton,
  DateButton,
  DateText,
  Picker,
} from './styles';

export default function DatePicker({ date, onChange }) {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM", { locale: ptBR }),
    [date]
  );

  function prevDate() {
    onChange(null, subDays(date, 1));
  }

  function nextDate() {
    onChange(null, addDays(date, 1));
  }

  return (
    <Container opened={opened}>
      {!opened && (
        <DateControlButton onPress={prevDate}>
          <Icon name="keyboard-arrow-left" size={30} color="#fff" />
        </DateControlButton>
      )}

      <DateButton onPress={() => setOpened(!opened)}>
        <DateText opened={opened}>{dateFormatted}</DateText>

        {opened && (
          <Picker>
            <RNDateTimePicker value={date} onChange={onChange} locale="pt-BR" />
          </Picker>
        )}
      </DateButton>

      {!opened && (
        <DateControlButton onPress={nextDate}>
          <Icon name="keyboard-arrow-right" size={30} color="#fff" />
        </DateControlButton>
      )}
    </Container>
  );
}

DatePicker.propTypes = {
  date: PropType.instanceOf(Date).isRequired,
  onChange: PropType.func.isRequired,
};
