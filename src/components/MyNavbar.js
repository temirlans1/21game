import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Collapse, NavbarToggler } from 'reactstrap';

class MyNavbar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
        isOpen: false,
        activeTab: '1'
    };
  }
  toggle() {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }
  changeTab(tabNumber) {
    this.setState({
      activeTab: tabNumber
    });
  }
  
  onScroll(event){
    var homeElement = document.getElementById('homeSection');
    var rulesElement = document.getElementById('rulesSection');
    var gameElement = document.getElementById('gameSection');
    var rect1 = homeElement.getBoundingClientRect();
    var rect2 = rulesElement.getBoundingClientRect();
    var rect3 = gameElement.getBoundingClientRect();
    if(Math.abs(rect1.top) < 150) {
      this.changeTab('1');
    }
    if(Math.abs(rect2.top) < 150) {
      this.changeTab('2');
    }
    if(Math.abs(rect3.top) < 150) {
      this.changeTab('3');
    }
  }

  render() {
    document.onscroll = this.onScroll;
    return (
      <Navbar fixed="top" expand="md" light>
        <NavbarBrand href="/">21</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} id="navContent" navbar>
          <Nav className="ml-auto" navbar>
            <NavItem id="homeNav">
              <NavLink href="#homeSection"
                className={(this.state.activeTab === '1') ? "active" : ""}>Home</NavLink>
            </NavItem>
            <NavItem id="rulesNav">
              <NavLink href="#rulesSection"  
                className={(this.state.activeTab === '2') ? "active" : ""}>Rules</NavLink>
            </NavItem>
            <NavItem id="gameNav">
              <NavLink href="#gameSection" 
                className={(this.state.activeTab === '3') ? "active" : ""}>Game</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default MyNavbar;