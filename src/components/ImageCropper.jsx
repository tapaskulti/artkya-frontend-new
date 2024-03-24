import React, { useState } from 'react';
import Cropper from 'react-easy-crop';

const ImageCropper = ({ image, aspectRatio, onCropCompleted }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
      onCropCompleted(croppedArea, croppedAreaPixels);
  };

  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={aspectRatio}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
};

export default ImageCropper;
