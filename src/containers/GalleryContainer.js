import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';
// styles
import '../App.css';
// components
import Gallery from '../components/neptunian/Gallery';
import SelectedImage from '../components/neptunian/SelectedImage';
import Lightbox from 'react-images';
import SmsModal from '../components/SmsModal';
import EmailModal from '../components/EmailModal';
import SharingDock from '../components/SharingDock';
import CloudInterface from '../extras/s3';
// constants
const constants = require('../constants');
const url = require('url');
const http = require('http');
const sizeOf = require('image-size');

const CountdownLatch = function (limit) {
  this.limit = limit;
  this.count = 0;
  this.waitBlock = function (){};
};
CountdownLatch.prototype.countDown = function (){
  this.count = this.count + 1;
  if(this.limit <= this.count){
    return this.waitBlock();
  }
};
CountdownLatch.prototype.await = function(callback){
  this.waitBlock = callback;
};

class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImages: new Set(),
      images: this.props.images,
      realImages: this.props.images,
      showControlDock: true,
      showSmsModal: false,
      showEmailModal: false,
      currentImage: 0,
      selectAll: false,
      imagesLoading: true
    };

    this.toggleSmsModal = this.toggleSmsModal.bind(this);
    this.toggleEmailModal = this.toggleEmailModal.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.selectPhoto = this.selectPhoto.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.generateShareContentFromSelected = 
    this.generateShareContentFromSelected.bind(this);
  }

  componentDidMount() {
    let that = this;
    let eventId = null;
    if (this.props.match.params.eventId != null && this.props.match.params.eventId != undefined) {
      eventId = this.props.match.params.eventId;
      localStorage.setItem(constants.kEventId, eventId);
    } else if (localStorage.getItem(constants.kEventId) != null) {
      eventId = localStorage.getItem(constants.kEventId);
    }

    const s3 = new CloudInterface();
    s3.list('helios-photos', eventId + '/loveit')
    .then(response => {
      const newImages = [];
      const newRealImages = [];
      const barrier = new CountdownLatch(response.length);
      response.forEach((element) => {

        const imgName = element.split('/').slice(-1)[0];
        const thumbUrl = element;
        const options = url.parse(thumbUrl);
         
        http.get(options, function (response) {
          let chunks = [];
          response.on('data', function (chunk) {
            chunks.push(chunk);
          }).on('end', function() {
            const buffer = Buffer.concat(chunks);
            const dimensions = sizeOf(buffer);
            let image = {
              src: thumbUrl,
              actual: element,
              width: dimensions.width,
              height: dimensions.height
            };
            let realImage = {
              src: element,
              thumbnail: thumbUrl,
              width: dimensions.width,
              height: dimensions.height
            };
            newImages.push(image);
            newRealImages.push(realImage);
            barrier.countDown();
          });
        });

      });
      barrier.await(function() {
        that.setState({
          images: newImages,
          realImages: newRealImages,
          imagesLoading: false
        });
      })
    }).catch(error => {
        throw(error);
    });
  }

  openLightbox = index => () => {
    this.setState({
      currentImage: index,
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
    });
  }

  toggleEmailModal() {
    this.setState({
      showEmailModal: !this.state.showEmailModal
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
      return { ...photo, selected: !this.state.selectAll }; 
    });
    this.setState({ photos: photos, selectAll: !this.state.selectAll });
  }

  generateShareContentFromSelected() {
    let content = '';
    let photos = this.state.images;
    this.state.selectedImages.forEach(i => {
      content += photos[i].actual.replace(/ /g, "%20");
      content += '\n';
      content += '-------------------';
      content += '\n';
    });
    return content;
  }

  render() {
    return (
      <div>
        <div class="row align-items-center justify-content-center">
          <SyncLoader
            color={'#ffffff'} 
            loading={this.state.imagesLoading} />
        </div>
        <Gallery 
          photos={this.state.images}
          onExpand={this.openLightbox}
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
          toggleSms={this.toggleSmsModal}
          toggleEmail={this.toggleEmailModal} />
        <SmsModal 
          isShown={this.state.showSmsModal} 
          handleClose={this.toggleSmsModal}
          smsRecepient="+19548042297"
          smsBody={this.generateShareContentFromSelected()}>
        </SmsModal>
        <EmailModal
          isShown={this.state.showEmailModal}
          handleClose={this.toggleEmailModal}
          emailRecepient="example@mail.com"
          emailBody={this.generateShareContentFromSelected()}>
        </EmailModal>
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
