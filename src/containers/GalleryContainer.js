import React, { Component } from 'react';
import PropTypes from 'prop-types';
// styles
import '../App.css';
// components
import Gallery from '../components/neptunian/Gallery';
import SelectedImage from '../components/neptunian/SelectedImage';
import Lightbox from 'react-images';
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
      showControlDock: true,
      showSmsModal: false,
      currentImage: 0,
      selectAll: false
    };

    this.toggleSmsModal = this.toggleSmsModal.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
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
          onClick={this.openLightbox}
          ImageComponent={SelectedImage} />
        <Lightbox images={this.state.images}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen} />
        <SharingDock 
          showDock={true} 
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