import React, { Component } from 'react';
import PropTypes from 'prop-types';
// styles
import '../App.css';
// components
import Gallery from '../components/Gallery';
import SmsModal from '../components/SmsModal';
import CheckButton from '../components/CheckButton';
import SharingDock from '../components/SharingDock';
// helpers
import shuffle from 'shuffle-array';
import axios from 'axios';
// constants
const constants = require('../constants');

class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: this.props.images,
      selectAllChecked: false,
      showControlDock: true,
      showSmsModal: false
    };

    this.onSelectImage = this.onSelectImage.bind(this);
    this.getSelectedImages = this.getSelectedImages.bind(this);
    this.onClickSelectAll = this.onClickSelectAll.bind(this);
    this.toggleSmsModal = this.toggleSmsModal.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://helios-api.herokuapp.com/events/'
      + localStorage.getItem(constants.kEventId),
    }).then(response => {
      var newImages = []
      response.data.data.Items.forEach((element) => {
        let image = {
          src: element["PhotoID"],
          thumbnail: element["PhotoID"],
          thumbnailWidth: 450,
          thumbnailHeight: 300,
          caption: ""
        }
        newImages.push(image);
      });
      this.setState({
        images: newImages
      });
    })
    .catch(error => {
      throw(error);
    });
  }

  allImagesSelected(images) {
    var f = images.filter(
      function (img) {
        return img.isSelected === true;
      }
    );
    return f.length === images.length;
  }

  toggleSmsModal() {
    this.setState({
      showSmsModal: !this.state.showSmsModal
    })
  }

  hideSmsModal() {
    this.setState({ showSmsModal: false });
  }

  onSelectImage(index, image) {
    var images = this.state.images.slice();
    var img = images[index];
    if(img.hasOwnProperty("isSelected"))
      img.isSelected = !img.isSelected;
    else
      img.isSelected = true;

    this.setState({
      images: images
    });

    if(this.allImagesSelected(images)){
      this.setState({
        selectAllChecked: true
      });
    }
    else {
      this.setState({
        selectAllChecked: false
      });
    }
  }

  getSelectedImages() {
    var selected = [];
    for(var i = 0; i < this.state.images.length; i++)
      if(this.state.images[i].isSelected === true)
        selected.push(i);
    return selected;
  }

  onClickSelectAll() {
    var selectAllChecked = !this.state.selectAllChecked;
    this.setState({
      selectAllChecked: selectAllChecked
    });

    var images = this.state.images.slice();
    if(selectAllChecked){
      for(var i = 0; i < this.state.images.length; i++)
        images[i].isSelected = true;
    }
    else {
      for(var j= 0; j < this.state.images.length; j++)
        images[j].isSelected = false;

    }
    this.setState({
      images: images
    });
  }

  render() {
    return (
      <div>
        {/* select all (admin only)
        <CheckButton
        index={0}
        isSelected={this.state.selectAllChecked}
        onClick={this.onClickSelectAll}
        parentHover={true}
        color={"rgba(0,0,0,0.54)"}
        selectedColor={"#4285f4"}
        hoverColor={"rgba(0,0,0,0.54)"}/>
        <div style={{
              height: "36px",
              display: "flex",
              alignItems: "center",
              color: "white"}}>select all</div>
        <div style={{
              padding: "2px",
              color: "#666"}}>Selected images: {this.getSelectedImages().toString()}</div>
        */}
        <Gallery
        images={this.state.images}
        onSelectImage={this.onSelectImage}
        showLightboxThumbnails={false}/>
        <SharingDock showDock={this.getSelectedImages().length!==0} toggleSms={this.toggleSmsModal}/>
        <SmsModal 
        isShown={this.state.showSmsModal} 
        handleClose={this.toggleSmsModal}
        smsRecepient="+19548042297"
        smsBody="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg">
        </SmsModal>
      </div>
    );
  }
}

GalleryContainer.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      srcset: PropTypes.array,
      caption: PropTypes.string,
      thumbnailWidth: PropTypes.number.isRequired,
      thumbnailHeight: PropTypes.number.isRequired,
      isSelected: PropTypes.bool
    })
  ).isRequired
};

GalleryContainer.defaultProps = {
  images: []
};

export default GalleryContainer;