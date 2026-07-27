/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { Loader2Icon } from "lucide-react";

const ConfirmApprovalModal = ({
  isOpen,
  handleOk,
  handleCancel,
  subject,
  loading,
}) => {
  return (
    <Modal
      maskClosable={false}
      // title={
      //   <BsExclamationCircleFill size={25} className="text-gray-800 mb-2" />
      // }
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okType="primary"
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={handleCancel} variant="faded" size="sm">
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleOk}
            className="bg-btnColor text-white flex items-center gap-2"
            size="sm"
          >
            {loading && <Loader2Icon className="animate-spin" />}
            Confirm
          </Button>
        </div>
      }
    >
      <div className="flex gap-2 items-center">
        <div>
          <BsExclamationCircleFill size={25} className="text-gray-800 mb-2" />
        </div>
        <p className="text-xl">{subject}</p>
      </div>
    </Modal>
  );
};

export default ConfirmApprovalModal;
