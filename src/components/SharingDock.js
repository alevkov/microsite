import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dock from 'react-dock';
import IconButton from '@material-ui/core/IconButton';
// assets
import smsButtonSvg from '../svg/sms_48px.svg';
import emailButtonSvg from '../svg/email.svg';
import FacebookBox from 'material-ui-community-icons/icons/facebook-box';
import TwitterBox from 'material-ui-community-icons/icons/twitter-box';

export default class SharingDock extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const sharingListStyles = {
      display:'flex',
      padding:0,
      textAlign: 'center',
      justifyContent: 'center'
    }

    const sharingButtonStyles = {
      listStyleType: 'none'
    }

    const dockStyles = {
      backgroundColor: "rgba(0.4,0.4,0.4,0.54)"
    }

    const dockIconStyles = {
      color: "white",
      width: 40,
      height: 40
    }
    
    return (
        <Dock
          size='0.13'
          position='bottom' 
          dimMode='none'
          dockStyle={dockStyles}
          isVisible={this.props.showDock}>
            <ul style={sharingListStyles}>
              <li style={sharingButtonStyles}>
                <IconButton onClick={this.props.toggleSms}>
                  <img src={smsButtonSvg} width="40"/>
                </IconButton>
              </li>
              <li style={sharingButtonStyles}>
                <IconButton>
                  <img src={emailButtonSvg} width="40"/>
                </IconButton>
              </li>
              <li style={sharingButtonStyles}>
                <IconButton>
                  <FacebookBox style={dockIconStyles} />
                </IconButton>
              </li>
              <li style={sharingButtonStyles}>
                <IconButton>
                  <TwitterBox style={dockIconStyles} />
                </IconButton>
              </li>
            </ul>
          </Dock>
    )
  }
}