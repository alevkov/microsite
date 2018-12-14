import React, { Component } from 'react';
import Dock from 'react-dock';
import IconButton from '@material-ui/core/IconButton';
// assets
import SmsBox from 'material-ui-community-icons/icons/message-text';
import EmailBox from 'material-ui-community-icons/icons/email';
import FacebookBox from 'material-ui-community-icons/icons/facebook-box';
import TwitterBox from 'material-ui-community-icons/icons/twitter-box';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

export default class SharingDock extends React.Component {
  render() {
    const sharingListStyles = {
      display:'flex',
      textAlign: 'center',
      justifyContent: 'center'
    };

    const sharingButtonStyles = {
      listStyleType: 'none',
      paddingTop: 10,
      paddingRight: 40
    };

    const dockStyles = {
      backgroundColor: 'black',
      opacity: 0.6
    };

    const dockIconStyles = {
      color: 'white',
      opacity: 1,
      width: 40,
      height: 40
    };
    
    return (
      <Dock
        size={0.13}
        position='bottom' 
        dimMode='none'
        dockStyle={dockStyles}
        isVisible={this.props.showDock}>
        <ul style={sharingListStyles}>
          <li style={sharingButtonStyles}>
            <IconButton onClick={this.props.toggleSms}>
              <SmsBox style={dockIconStyles} />
            </IconButton>
          </li>
          <li style={sharingButtonStyles}>
            <IconButton onClick={this.props.toggleEmail}>
              <EmailBox style={dockIconStyles} />
            </IconButton>
          </li>
          <li style={sharingButtonStyles}>
            <FacebookShareButton 
            url={"http://helios-microsite.herokuapp.com/" + localStorage.getItem("KEY_EVENT_ID")} 
            quote={"Check out my photos!"}>
            <IconButton> 
              <FacebookBox style={dockIconStyles} />
            </IconButton>
            </FacebookShareButton>
          </li>
          <li style={sharingButtonStyles}>
            <TwitterShareButton 
            url={"http://helios-microsite.herokuapp.com/" + localStorage.getItem("KEY_EVENT_ID")} 
            title={"Check out my photos!" + "http://helios-microsite.herokuapp.com/" + localStorage.getItem("KEY_EVENT_ID")}>
              <IconButton> 
                <TwitterBox style={dockIconStyles} />
              </IconButton>
            </TwitterShareButton>
          </li>
        </ul>
      </Dock>
    );
  }
}