import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import Routes from './Routes';
import helios from './svg/helios.png';
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

    handleEventClick = () => {
        localStorage.clear();
        window.location = '/';
    };

    render() {
        const adminRoute = '/admin';
        const homeRoute = '/';
        return (
            <div className='App container'>
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Link to={homeRoute}>
                            <img className='logo' src={helios}/>
                        </Link>
                    </Navbar.Header>

                    <Navbar.Collapse>
                        <Nav>
                            <NavItem onClick={this.handleEventClick}>
                                {localStorage.getItem(constants.kEventId)}
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Routes/>
            </div>
        );
    }
}

export default App;
