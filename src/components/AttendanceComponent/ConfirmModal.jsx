/* eslint-disable react/prop-types */
import {Modal} from 'antd'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { Button } from "@nextui-org/react";

const ConfirmModal = ({isOpen, handleOk, handleCancel}) => {

  return (
    <Modal  
        maskClosable={false}
        title={<BsExclamationCircleFill size={15}    
        className="text-gray-800 mb-2" />} 
        open={isOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        okType='primary' 
        footer={
            <div className="flex justify-end gap-2">
                <Button onClick={handleCancel}  variant='faded' size='sm' >Cancel</Button>
                <Button onClick={handleOk}  color="primary" className=' bg-btnColor' size='sm'  >Ok</Button>
            </div>
        } 
    >
        <p className="mt-6 text-xl">Are you sure you want to punch out?</p>

    </Modal>
  )
}

export default ConfirmModal
