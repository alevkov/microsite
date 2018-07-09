import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
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

    if (localStorage.getItem(constants.kEventId) === null) {
      localStorage.setItem(constants.kEventId, "abc");
    }
  }

  render() {
    return(
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Helios</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/admin">
                <NavItem>Admin</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }
};

export default App;
