import React from 'react';

const Checkmark = ({ selected }) => (
  <div style={selected ? { left: '4px', top: '4px', position: 'absolute', zIndex: '1' } : { display: 'none' }}>
    <svg style={{ fill: 'white', position: 'absolute' }} width="24px" height="24px">
      <circle cx="12.5" cy="12.2" r="8.292"></circle>
    </svg>
    <svg style={{ fill: '#06befa', position: 'absolute' }} width="24px" height="24px">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </svg>
  </div>
);

const Preview = ({ selected, onExpand, index }) => (
  <div 
    onClick={onExpand(index)} 
    style={selected ? { right: '45px', top: '22px', position: 'absolute', zIndex: '1' } : { display: 'none' }}>
    <svg style={{ position: 'absolute' }} width="50px" height="50px">
      <style>
        {`svg:hover{fill: #06befa}`}
      </style>
      <path d="M16.803,18.615h-4.535c-1,0-1.814-0.812-1.814-1.812v-4.535c0-1.002,0.814-1.814,1.814-1.814h4.535c1.001,0,1.813,0.812,1.813,1.814v4.535C18.616,17.803,17.804,18.615,16.803,18.615zM17.71,12.268c0-0.502-0.405-0.906-0.907-0.906h-4.535c-0.501,0-0.906,0.404-0.906,0.906v4.535c0,0.502,0.405,0.906,0.906,0.906h4.535c0.502,0,0.907-0.404,0.907-0.906V12.268z M16.803,9.546h-4.535c-1,0-1.814-0.812-1.814-1.814V3.198c0-1.002,0.814-1.814,1.814-1.814h4.535c1.001,0,1.813,0.812,1.813,1.814v4.534C18.616,8.734,17.804,9.546,16.803,9.546zM17.71,3.198c0-0.501-0.405-0.907-0.907-0.907h-4.535c-0.501,0-0.906,0.406-0.906,0.907v4.534c0,0.501,0.405,0.908,0.906,0.908h4.535c0.502,0,0.907-0.406,0.907-0.908V3.198z M7.733,18.615H3.198c-1.002,0-1.814-0.812-1.814-1.812v-4.535c0-1.002,0.812-1.814,1.814-1.814h4.535c1.002,0,1.814,0.812,1.814,1.814v4.535C9.547,17.803,8.735,18.615,7.733,18.615zM8.64,12.268c0-0.502-0.406-0.906-0.907-0.906H3.198c-0.501,0-0.907,0.404-0.907,0.906v4.535c0,0.502,0.406,0.906,0.907,0.906h4.535c0.501,0,0.907-0.404,0.907-0.906V12.268z M7.733,9.546H3.198c-1.002,0-1.814-0.812-1.814-1.814V3.198c0-1.002,0.812-1.814,1.814-1.814h4.535c1.002,0,1.814,0.812,1.814,1.814v4.534C9.547,8.734,8.735,9.546,7.733,9.546z M8.64,3.198c0-0.501-0.406-0.907-0.907-0.907H3.198c-0.501,0-0.907,0.406-0.907,0.907v4.534c0,0.501,0.406,0.908,0.907,0.908h4.535c0.501,0,0.907-0.406,0.907-0.908V3.198z"></path>
    </svg>
  </div>
);

const imgStyle = {
  display: 'block',
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s'
};
const selectedImgStyle = {
  transform: 'translateZ(0px) scale3d(0.9, 0.9, 1)',
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s'
};
const cont = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  float: 'left',
  position: 'relative'
}

const SelectedImage = ({ index, onClick, photo, margin, onExpand }) => {
  //calculate x,y scale
  const sx = (100 - ((30 / photo.width) * 100)) / 100;
  const sy = (100 - ((30 / photo.height) * 100)) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;
  return (
    <div style={{ margin, width: photo.width, ...cont }} className={!photo.selected ? 'not-selected' : ''}>

      <Checkmark selected={photo.selected ? true : false} />
      <Preview selected={photo.selected ? true : false} onExpand={onExpand} index={index}/>
      <img style={photo.selected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }} {...photo} onClick={(e) => onClick(e, { index, photo })} />

      <style>
        {`.not-selected:hover{outline:2px solid #06befa}`}
      </style>
    </div>
  )
};

export default SelectedImage;