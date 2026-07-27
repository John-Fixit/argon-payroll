/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Modal} from 'antd'
import { BsExclamationCircleFill } from 'react-icons/bs'
import { Button } from "@nextui-org/react";
import { CiMoneyBill } from 'react-icons/ci';
import moment from 'moment';


const LoanConfirmModal = ({isOpen, handleOk, handleCancel, amount, repayment, loading}) => {

  return (
    <Modal  
        maskClosable={false}
        title={
          <div className='flex gap-2 items-center'>
            <BsExclamationCircleFill size={15}    
            className="text-gray-800 header_h3 text-[0.825rem] leading-[1.5] tracking-[2px]" />
            <div className="text-gray-800 header_h3 text-[0.825rem] leading-[1.5] tracking-[2px]">CONFIRM</div>
          </div>
      } 
        open={isOpen} 
        onOk={handleOk} 
        onCancel={handleCancel} 
        okType='primary' 
        footer={
            <div className="flex justify-end gap-x-10">
                <Button onClick={handleCancel}  variant="bordered" size='sm' className='border-red-300 text-red-400' >Cancel</Button>
                <Button disabled={loading} onClick={handleOk}  className='bg-[#8d50ff] text-white' size='sm'  >Apply For Loan</Button>
            </div>
        } 
    >
        <div className="my-6 text-lg text-gray-800 header_h3  leading-[1.5] tracking-[2px] bg-[#e7e9ec] p-2 rounded-lg">

            <div className='flex flex-col gap-3'>

              <div className='flex gap-5 gap-y-3 justify-between flex-wrap'>
                <div className='flex gap-1 items-center'>
                  <span className='text-gray-600'>Principal</span>
                </div>
                <span className='font-semibold'>₦
                {amount?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}</span>
              </div>
              <div className='flex gap-5 gap-y-3 justify-between flex-wrap'>
                <span className='text-gray-600'>Repayment Amount</span>
                <span className='font-semibold'>₦
                {repayment?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}</span>
              </div>
              {/* <div className='flex gap-5 gap-y-3 justify-between flex-wrap'>
                <span className='text-gray-700'>Repayment Date</span>
                <span className='font-semibold'>{moment(duration).format("DD MMM YYYY")}</span>
              </div> */}

            </div>

        </div>

    </Modal>
  )
}

export default LoanConfirmModal