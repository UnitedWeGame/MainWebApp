import React, { PropTypes } from 'react';
import { Menu, IconMenu } from 'react-toolbox/lib/menu';
import theme from './CustomMenuButton.css';

const CustomMenu = ({ children, ...other  }) => (
  <IconMenu {...other} theme={theme}>
    {children}
  </IconMenu>
);

CustomMenu.propTypes = {
  children: PropTypes.node
};

export default CustomMenu;
