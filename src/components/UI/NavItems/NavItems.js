import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import Aux from '../../../hoc/Aux/Aux';
import NavItem from './NavItem/NavItem';

class NavItems extends Component{
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state
        console.log(this.props.navList);
      let nav = (
        <Menu>
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
        </Menu>
      )
        
      
      return (
        <Aux>
            {nav}
        </Aux>
      );
    }

}

export default NavItems;