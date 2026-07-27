/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { options, reasons } from "./data";
import PropTypes from 'prop-types'
import { Input, Select, SelectItem,} from '@nextui-org/react'
import { DatePicker } from "antd";

const LeaveTextForm = ({setSelectedTab,isOpen, setIsOpen}) => {
  const [leaveInformation, setLeaveInformation] = useState({
  type:'',
  from:'',
  to:'',
  no_of_days:'',
  reason:'',
  approvals:[],
  hand_overs:[],
  status:'pending'
  })

  const handleFromDateChange = (date) => {
  // console.log(date);
   setLeaveInformation((prev) => {
                return { ...prev, from: date };
              });
  };
  const handleToDateChange = (date) => {
  const startDate = new Date(leaveInformation.from);
const endDate = new Date(date);

// Calculate the difference in milliseconds
const timeDifference = endDate - startDate;

// Convert the difference to days
const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

// console.log(`Number of days between the two dates: ${daysDifference}`);
 setLeaveInformation((prev) => {
                return { ...prev, to: date,no_of_days:daysDifference };
              });
  };

  const goToAddApproval=()=>{
  // console.log(leaveInformation);
  if (leaveInformation.type=='' ||leaveInformation.from=='' ||leaveInformation.to=='' ||leaveInformation.reason==''||leaveInformation.no_of_days=='') {
    alert('Fill the required information')
  }else{
  sessionStorage.setItem('leaveInformation',JSON.stringify(leaveInformation))
  setSelectedTab(4)
  }
  }


  return (
    <Fragment>
        <div className="w-full bg-white p-8">
          {/* <h1 className="px-4 py-2 font-normal text-[#212529]">
            Leave Request
          </h1> */}
          <div className="py-4">
            <div className="my-4">
                     <Select
            label='Leave Type'
            id="leaveType"
            labelPlacement='outside'
            placeholder='Select type'
            className='w-full rounded-sm'
            radius="sm"
            classNames={{
            trigger:'border-1'
            }}
            variant="bordered"
                 onChange={(e) => {
              setLeaveInformation((prev) => {
                return { ...prev, type: e.target.value };
              });
                 }}
          >
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div>
                <label className=" text-sm" htmlFor="from">
                  From
                </label>
                    <DatePicker
                onChange={(e) => handleFromDateChange(e.$d)}
             className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none"
            />
              </div>

              <div>
                <label className=" text-sm" htmlFor="to">
                  To
                </label>
                 <DatePicker
                onChange={(e) => handleToDateChange(e.$d)}
              className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none"
            />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div>
                 <Input
            type='number'
             labelPlacement="outside"
             label='Duration'
            disabled
            radius="sm"
            classNames={{
            inputWrapper:['border-1', "group-data-[focused=true]:border-blue-400",]
            }}
            variant="bordered"
                  value={leaveInformation.no_of_days}
            className=' w-full ring-0 rounded-md'
          />
              </div>
              <div>
                     <Input
           type="number"
                  name=""
                  id="dd"
                  disabled
                   label='Days deducted'
             labelPlacement="outside"
             radius="sm"
            classNames={{
            inputWrapper:['border-1', "group-data-[focused=true]:border-blue-400",]
            }}
            variant="bordered"
                  value={leaveInformation.no_of_days}
            className=' bgwhite w-full ring-0 rounded-md'
          />
              </div>
            </div>
            <div className="my-10">
                 <Select
            label='Leave Reason'
            id="leaveReason"
            labelPlacement='outside'
            placeholder='Select reason'
            className='w-full'
            radius="sm"
            classNames={{
            trigger:'border-1'
            }}
            variant="bordered"
      onChange={(e) => {
              setLeaveInformation((prev) => {
                return { ...prev, reason: e.target.value };
              });
                 }}
          >
            {reasons.map((reason) => (
              <SelectItem key={reason.value} value={reason.value}>
                {reason.label}
              </SelectItem>
            ))}
          </Select>
            </div>
          </div>
        </div>
        <div className=" flex gap-4 mt-8 justify-end px-8">
        <button className="rounded shadow-md px-4 py-2 hover:bg-slate-100 transition-all bg-slate-50" onClick={()=>setIsOpen(!isOpen)}>Close</button>
              <button className="bg-[#303840] hover:bg-[#22262b] transition-all text-sm rounded-[4px] text-white font-medium px-4 py-2 font-helvetica shadow-md" onClick={goToAddApproval}>
              Add Approvals
              </button>
        </div>
    </Fragment>
  );
};

export default LeaveTextForm;

LeaveTextForm.propTypes={
setSelectedTab:PropTypes.func,
isOpen:PropTypes.bool, 
setIsOpen: PropTypes.func
}
