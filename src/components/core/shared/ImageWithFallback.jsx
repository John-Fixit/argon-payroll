/* eslint-disable react/prop-types */
import  { useState } from 'react';

const ImageWithFallback = ({ src, alt, fallbackSrc, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};
export default ImageWithFallback;