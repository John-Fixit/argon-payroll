/* eslint-disable react/prop-types */

import AttachmentModal from './AttachmentModal';
// import Modal from './Modal';



const ImageModal = ({ 
  isOpen, 
  onClose, 
  src
}) => {
  if (!src) {
    return null;
  }

  return (
    <AttachmentModal isOpen={isOpen} onClose={onClose}>
      <div className="h-80">
        <img 
          className="object-contain object-top w-full h-full " 
          alt="Image" 
          src={src}
        />
      </div>
    </AttachmentModal>
  )
}

export default ImageModal;
