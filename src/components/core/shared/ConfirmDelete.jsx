/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";

const ConfirmDeleteModal = ({
  isOpen,
  handleOk,
  handleCancel,
  subject,
  loading,
}) => {
  return (
    <Modal
      maskClosable={false}
      title={
        <div className="flex items-center gap-3">
          <BsExclamationCircleFill size={20} className="text-red-600" />
          <p className="mt-6 text-xl">
            {subject || "Are you sure to execute this operation?"}
          </p>
        </div>
      }
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
            isLoading={loading}
            className="bg-red-400 text-white"
            size="sm"
          >
            Confirm
          </Button>
        </div>
      }
    ></Modal>
  );
};

export default ConfirmDeleteModal;
