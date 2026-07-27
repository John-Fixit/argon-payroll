/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const LocationInfoCard = ({ isOpen, onClose, locationData }) => {
  // console.log(locationData)
  return (
    <Modal
      backdrop={"opaque"}
      isOpen={isOpen}
      onClose={onClose}
      placement="top"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
            <ModalBody>
              <div className="text-lg text-green-600">
                You have successfully clocked-in for Today <br />
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 text-green-600 bg-green-600 rounded-full"></div>{" "}
                  <span>Face verified successfully</span>
                </div>
              </div>
              <div className="text-lg">Location Details:</div>

              <div className="flex flex-col">
                <div className="text-xl font-bold">
                  Location: NCAA Abuja HQ{" "}
                </div>
                {/* <div>City: {locationData?.city}</div> */}
                {/* <div>City: {locationData?.city} </div> */}
              </div>
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
  );
};

export default LocationInfoCard;
