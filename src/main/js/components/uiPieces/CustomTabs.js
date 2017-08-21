import React, { PropTypes } from 'react';
import { Tabs } from 'react-toolbox/lib/tabs';
import theme from './CustomTabs.css';

const CustomTabs = ({ children, ...other  }) => (
  <Tabs {...other} theme={theme}>
    {children}
  </Tabs>
);

CustomTabs.propTypes = {
  children: PropTypes.node
};

export default CustomTabs;
