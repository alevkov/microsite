import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
// styles
import '../App.css';
// components
import Gallery from '../components/neptunian/Gallery';
import SelectedImage from '../components/neptunian/SelectedImage';
import Lightbox from 'react-images';
import SmsModal from '../components/SmsModal';
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
      selectedImages: new Set(),
      images: this.props.images,
      showControlDock: true,
      showSmsModal: false,
      currentImage: 0,
      selectAll: false
    };

    this.toggleSmsModal = this.toggleSmsModal.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.openLightboxButton = this.openLightboxButton.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  componentDidMount() {
    const url = 'https://helios-api.herokuapp.com/events/' + 
    localStorage.getItem(constants.kEventId);
    axios({
      method: 'get',
      url: url,
    }).then(response => {
      var newImages = []
      response.data.data.Items.forEach((element) => {
        let image = {
          src: element["PhotoID"],
          width: 3,
          height: 2
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

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }

  openLightboxButton(event) {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  toggleSmsModal() {
    this.setState({
      showSmsModal: !this.state.showSmsModal
    })
  }

  selectPhoto(event, obj) {
    let photos = this.state.images;
    photos[obj.index].selected = !photos[obj.index].selected;
    if (photos[obj.index].selected === true) {
      this.state.selectedImages.add(obj.index);
    } else {
      this.state.selectedImages.delete(obj.index);
    }
    this.setState({ photos: photos });
  }

  toggleSelect() {
    let photos = this.state.images.map((photo, index) => {
      return { ...photo, selected: !this.state.selectAll } 
    });
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }

  hideSmsModal() {
    this.setState({ showSmsModal: false });
  }

  render() {
    return (
      <div>
        <Gallery 
          photos={this.state.images}
          onClick={this.selectPhoto}
          ImageComponent={SelectedImage} />
        <Button 
          bsStyle="success" 
          onClick={this.openLightboxButton}>Preview</Button>
        <Lightbox images={this.state.images}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen} />
        <SharingDock 
          showDock={this.state.selectedImages.size !==0 } 
          toggleSms={this.toggleSmsModal} />
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
