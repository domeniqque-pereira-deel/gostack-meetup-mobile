import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TInput, Error } from './styles';

function Input({ style, icon, error, ...rest }, ref) {
  return (
    <>
      <Container style={style} hasError={error}>
        {icon && (
          <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />
        )}
        <TInput {...rest} ref={ref} />
      </Container>
      {error && <Error>{error}</Error>}
    </>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
};

Input.defaultProps = {
  icon: null,
  error: null,
  style: {},
};

export default forwardRef(Input);
