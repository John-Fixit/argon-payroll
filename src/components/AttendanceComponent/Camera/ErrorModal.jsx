/* eslint-disable react/prop-types */
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
// import {Modal} from 'antd'

const ErrorModal = ({isOpen, onClose}) => {

  return (
    <Modal className="z-[100]" backdrop={'opaque'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p className="text-lg font-bold text-red-600"> 
                  Failed Verification
                </p>
                <p className=" text-2xl text-gray-900 mt-2"> 
                  Your Image Verification failed. Please retry
                </p>
                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default ErrorModal
