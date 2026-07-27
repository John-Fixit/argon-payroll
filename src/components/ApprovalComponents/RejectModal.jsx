/* eslint-disable react/prop-types */
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input,} from "@nextui-org/react"


const RejectModal = ({isOpen,setIsOpen,handleSideModal}) => {
const reject=()=>{
handleSideModal(false)
setIsOpen(false)
}
  return (
   <div>
      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-medium">Enter your reason for rejection</ModalHeader>
              <ModalBody>
               <Input placeholder="reason" size="sm" />
              </ModalBody>
              <ModalFooter>
                <Button size='sm' className="bg-gray-300" onPress={onClose}>
                  Close
                </Button>
                <Button size="sm" color="danger" onPress={reject}>
                  Reject
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
   </div>
  )
  }
export default RejectModal