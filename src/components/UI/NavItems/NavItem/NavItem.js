import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux/Aux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

const NavItem = (props) => {

    return (
       <Menu.Item
        name={props.name}
        active={props.activeItem === props.name}
        onClick={props.clicked}
      />
    );
};

export default NavItem

