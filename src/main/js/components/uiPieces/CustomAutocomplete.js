import React, { PropTypes } from 'react';
import { Autocomplete } from 'react-toolbox/lib/autocomplete';
import theme from './CustomAutocomplete.css';

const CustomAutocomplete = ({ children, ...other  }) => (
  <Autocomplete {...other} theme={theme}>
    {children}
  </Autocomplete>
);

CustomAutocomplete.propTypes = {
  children: PropTypes.node
};

export default CustomAutocomplete;
