import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Header, Icon, Image, Menu, Segment, Sidebar, Button, Divider } from 'semantic-ui-react';
import Aux from '../../../hoc/Aux/Aux';
import NavItem from './NavItem/NavItem';

import './NavItems.css';

class NavItems extends Component{
    state = {
        activeItem: 'home',
        visible: false
    }
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    toggleVisibility = () => this.setState({ visible: !this.state.visible})

    render() {
      const { activeItem, visible } = this.state
        
      let nav = (
        
        <Sidebar.Pushable as={Segment}>
        <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={this.toggleVisibility}
        vertical
        visible={visible}
        width='thin'>
            {    
                this.props.navList.map(navListItem => {
                   return(<Link to={navListItem.path}>
                        <NavItem 
                            name={navListItem.name}
                            activeItem = {activeItem}
                            clicked={this.handleItemClick}
                        />
                    </Link>);
                })
            }
        </Sidebar>
      
        <Sidebar.Pusher dimmed={visible}>
        <Segment basic>
        <div className="navbar-section">
                <div className="navbar-button" onClick={this.toggleVisibility}>
                <Icon name="sidebar" size="big" />
                </div>
                <div className="logo-navbar">
                 <Link to="/"><h2>SPOTBook</h2></Link>
                </div>
            </div>
         {this.props.children}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
      )
        
      
      return (
        <Aux>
          
            {nav}
        </Aux>
      );
    }

}

export default NavItems;