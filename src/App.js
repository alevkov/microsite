import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from './Routes';
// styles
import './App.css';
// constants
const constants = require('./constants');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: true
    };
  }

  handleEventClick = event => {
    localStorage.clear();
    window.location = '/';
  }

  render() {
    const adminRoute = '/admin';
    const homeRoute = '/';
    return(
      <div className='App container'>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={homeRoute}>
                Helios
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle>
            </Navbar.Toggle>
          </Navbar.Header>
          
          <Navbar.Collapse>
            <Nav pullRight>

                <NavItem onClick={this.handleEventClick}>
                  {localStorage.getItem(constants.kEventId)}
                </NavItem>

            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
}

export default App;
