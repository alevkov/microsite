import React, { Component } from 'react';
import PropTypes from 'prop-types';
// assets
import logo from './svg/logo.svg';
// styles
import './App.css';
// components
import Button from '@material-ui/core/Button';
import Gallery from '../src/components/Gallery';
import SmsModal from '../src/components/SmsModal';
import CheckButton from '../src/components/CheckButton';
import SharingDock from '../src/components/SharingDock';
// helpers
import shuffle from 'shuffle-array';

class App extends React.Component {
    constructor(props){
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

    allImagesSelected (images) {
        var f = images.filter(
            function (img) {
                return img.isSelected == true;
            }
        );
        return f.length == images.length;
    }

    toggleSmsModal () {
        this.setState({
            showSmsModal: !this.state.showSmsModal
        })
    }

    hideSmsModal() {
        this.setState({ showSmsModal: false });
    }

    onSelectImage (index, image) {
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

    getSelectedImages () {
        var selected = [];
        for(var i = 0; i < this.state.images.length; i++)
            if(this.state.images[i].isSelected == true)
                selected.push(i);
        return selected;
    }

    onClickSelectAll () {
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
            for(var i = 0; i < this.state.images.length; i++)
                images[i].isSelected = false;

        }
        this.setState({
            images: images
        });
    }

    render () {
      console.log("Show: " + (this.getSelectedImages().length!=0));
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
        <div>
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
          <Gallery
          images={this.state.images}
          onSelectImage={this.onSelectImage}
          showLightboxThumbnails={true}/>
          <SharingDock showDock={this.getSelectedImages().length!=0} toggleSms={this.toggleSmsModal}/>
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

App.propTypes = {
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

App.defaultProps = {
    images: shuffle([
        {
            src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            tags: [{value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: ""
        },
        {
            src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: ""
        },
        {
            src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: ""
        },
        {
            src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 183,
            caption: ""
        },
        {
            src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
            thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
            thumbnailWidth: 240,
            thumbnailHeight: 320,
            tags: [{value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
            thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 190,
            caption: ""
        },
        {
            src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 148,
            tags: [{value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: ""
        },
        {
            src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
            alt: "Big Ben - London",
            thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
            thumbnailWidth: 248,
            thumbnailHeight: 320,
            caption: ""
        },
        {
            src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
            alt: "Red Zone - Paris",
            thumbnail: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 113,
            tags: [{value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
            alt: "Wood Glass",
            thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
            thumbnailWidth: 313,
            thumbnailHeight: 320,
            caption: ""
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: ""
        },
        {
            src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 194,
            caption: ""
        },
        {
            src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
            alt: "Cosmos Flower",
            thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: ""
        },
        {
            src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
            thumbnailWidth: 271,
            thumbnailHeight: 320,
            caption: ""
        },
        {
            src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            tags: [{value: "", title: ""}, {value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            tags: [{value: "", title: ""}, {value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
            thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: ""
        },
        {
            src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
            thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 213,
            caption: ""
        },
        {
            src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 179,
            tags: [{value: "", title: ""}, {value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_n.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 215,
            tags: [{value: "", title: ""}],
            caption: ""
        },
        {
            src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_n.jpg",
            thumbnailWidth: 257,
            thumbnailHeight: 320,
            caption: ""
        },
        {
            src: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_n.jpg",
            thumbnailWidth: 226,
            thumbnailHeight: 320,
            caption: ""
        }
    ]).splice(0,16)
};

export default App;
