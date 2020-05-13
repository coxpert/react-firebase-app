import React from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';

import 'react-html5-camera-photo/build/css/index.css';
 
export const CameraView = (props) => {

  function handleTakePhoto (dataUri) {
      
    console.log('takePhoto');
  }
 
  function handleTakePhotoAnimationDone (dataUri) {
      
    console.log('takePhoto');
  }
 
  function handleCameraError (error) {
    console.log('handleCameraError', error);
  }
 
  function handleCameraStart (stream) {
    console.log('handleCameraStart');
  }
 
  function handleCameraStop () {
    console.log('handleCameraStop');
  }
 
  console.log(isMobile)
  return (
        <Camera
        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
        onCameraError = { (error) => { handleCameraError(error); } }
        idealFacingMode = {FACING_MODES.ENVIRONMENT}
        idealResolution = {{width: 640, height: 480}}
        imageType = {IMAGE_TYPES.JPG}
        imageCompression = {0.97}
        isMaxResolution = {true}
        isImageMirror = {false}
        isSilentMode = {false}
        isDisplayStartCameraError = {true}
        isFullscreen = {true}
        sizeFactor = {1}
        onCameraStart = { (stream) => { handleCameraStart(stream); } }
        onCameraStop = { () => { handleCameraStop(); } }
        />
  );
}
 