import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { DotLoader } from 'react-spinners';
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
      realImages: this.props.images,
      showControlDock: true,
      showSmsModal: false,
      currentImage: 0,
      selectAll: false,
      imagesLoading: true
    };

    this.toggleSmsModal = this.toggleSmsModal.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.openLightboxButton = this.openLightboxButton.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.generateSmsContentFromSelected = 
    this.generateSmsContentFromSelected.bind(this);
  }

  componentDidMount() {
    const url = 'https://helios-api.herokuapp.com/events/' + 
    localStorage.getItem(constants.kEventId);
    axios({
      method: 'get',
      url: url,
    }).then(response => {
      var newImages = []
      var newRealImages =[]
      response.data.data.Items.forEach((element) => {
        const imgName = element["PhotoID"].split("/").slice(-1)[0];
        const thumbUrl = "https://helios-microsite.imgix.net/" + 
            localStorage.getItem(constants.kEventId) +
            "/" + imgName + "?w=900&h=300";
        console.log(thumbUrl);
        let image = {
          src: thumbUrl,
          actual: element["PhotoID"],
          width: 3,
          height: 2
        }
        let realImage = {
          src: element["PhotoID"],
          thumbnail: thumbUrl,
          width: 3,
          height: 2
        }
        newImages.push(image);
        newRealImages.push(realImage);
      });
      this.setState({
        images: newImages,
        realImages: newRealImages,
        imagesLoading: false
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

  generateSmsContentFromSelected() {
    let smsContent = "";
    let photos = this.state.images;
    this.state.selectedImages.forEach(i => {
      smsContent += photos[i].actual;
      smsContent += '\n';
    });
    return smsContent;
  }

  hideSmsModal() {
    this.setState({ showSmsModal: false });
  }

  render() {
    return (
      <div>
        <div style={{position:"fixed", top:"50%", left:"48%"}}>
          <DotLoader
            color={'#ffffff'} 
            loading={this.state.imagesLoading} />
        </div>
        <Gallery 
          photos={this.state.images}
          onClick={this.selectPhoto}
          ImageComponent={SelectedImage} />
        <Lightbox images={this.state.realImages}
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
          smsBody={this.generateSmsContentFromSelected()}>
        </SmsModal>
        <Button 
          bsStyle="success" 
          onClick={this.openLightboxButton}>Preview
        </Button>
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
  ).isRequired,
  realImages: PropTypes.arrayOf(
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
