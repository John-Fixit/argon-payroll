/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import React, { Fragment, useEffect, useRef, useState } from "react";
import { aprrovalRoles, staff } from "./data";
import { IoIosClose, IoMdSearch } from "react-icons/io";
import { Avatar } from "@nextui-org/react";
import { Input, Select, SelectItem,} from '@nextui-org/react'

const LeaveReturnApprovalForm = ({approvalNotification, setApprovalNotification,setSelectedTab}) => {
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [searchedApprovals, setSearchedApprovals] = useState([]);
  const [approvals, setApprovals] = useState([]);
  const searchRef = useRef();
 
   useEffect(() => {
  if (sessionStorage.leaveInformation) {
    const information=JSON.parse(sessionStorage.getItem('leaveInformation'))
    if(information.approvals){
    setApprovals(information.approvals);
    setApprovalNotification({...approvalNotification,notification_count:information.approvals.length})
    }
  }
  }, [])
  

  // searching the staff with the selected role
  const handleChange = (e) => {
    // console.log(e);
const information=JSON.parse(sessionStorage.getItem('leaveInformation'))
  if (information) {
    if (e.target.value) {
      const filtered = staff.filter(
        (staff_member) => staff_member.role == e.target.value
      );
      setSelectedStaff(filtered);
    }
  }else{
  alert('Fill leave form first')
  }

  };

  // function to search for the staff
  const searchItem = (value) => {
  if (selectedStaff.length<1) {
  alert('Select approval role first') 
  }else{
    const filtered = selectedStaff.filter((selected) =>
      selected.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedApprovals(filtered);
  }
  };

  // function to hide the container after deleting the input value
  const hideContainer = (value) => {
    if (value == "") {
      setSearchedApprovals([]);
    }
  };

  // deleting an already selected staff member
  const handleDelete = (id) => {
    const filtered = approvals.filter((_, i) => i !== id);
    setApprovals(filtered);
    setApprovalNotification({...approvalNotification,notification_count:filtered.length})
  };

  // adding approval
  const addApproval = (approval) => {
    searchRef.current.value = "";
    setApprovals([...approvals, approval]);
    setApprovalNotification({...approvalNotification,notification_count:[...approvals, approval].length})
    setSearchedApprovals([]);
  };

  // submit approval
  const submitApproval = () => {
  const information=JSON.parse(sessionStorage.getItem('leaveInformation'))
  if (information.hand_overs.length<1) {
  const latestInformation={...information,approvals:approvals}
sessionStorage.setItem('leaveInformation',JSON.stringify(latestInformation))
    setSelectedTab(3)
  }
    // console.log(approvals);
  };
  return (
    <Fragment>
      <div className="p-8">
        <div className="w-full bg-white">
            <h1 className="px-4 py-2 font-normal text-[#212529]">
           Approval
          </h1>
          <form action="" className="p-4">
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-1 items-center">
              <label className="text-sm" htmlFor="approvalRole">
                Select Approval Role
              </label>
              <div className="col-span-2">
                            <Select
            
            labelPlacement='outside'
            placeholder='Plase select'
            className='w-full rounded-sm'
            aria-label='approval role'
                onChange={(e)=>handleChange(e)}
          >
           {aprrovalRoles.map((aprrovalRole) => (
                    <SelectItem key={aprrovalRole.value} value={aprrovalRole.value}>
                      {aprrovalRole.value}
                    </SelectItem>
                  ))}
          </Select>
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-1 items-center">
              <label className="w- text-sm" htmlFor="staff">
                Search for Staff
              </label>
              <div className="relative col-span-2">
                   <Input
            type='text'
            
            ref={searchRef}
             labelPlacement="outside"
             placeholder='Find by name'
            className=' w-full ring-0 rounded-md text-xs'
              onChange={(e) => searchItem(e.target.value)}
                  onKeyUp={(e) => hideContainer(e.target.value)}
          />
                <IoMdSearch className="lucide lucide-search  text-sidebarInptextColor absolute top-3 right-2" />

                {searchedApprovals.length > 0 && (
                  <ul className="absolute top-10 w-full bg-white px-5 border rounded shadow">
                    {searchedApprovals.map((approval, index) => (
                      <li
                        className="flex justify-between my-4 items-center py-2 px-3 cursor-pointer hover:bg-slate-200 rounded"
                        key={index}
                        onClick={() => addApproval(approval)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            size="md"
                          />
                          <p className="m-0 font-medium">{approval.name}</p>
                        </div>
                        <p className="m-0 text-xs">{approval.abbr}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="my-8">
          <h2 className="px-4 py-2 text-sm border-b border-slate-400 text-gray-800">
            Approval
          </h2>
          <div>
            {approvals.length > 0 ? (
              approvals.map((approval, index) => (
                <div
                  className="flex justify-between my-4 items-center py-2 px-3 rounded bg-slate-100"
                  key={index}
                >
                  <div className="flex items-center gap-5">
                    <Avatar
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      size="md"
                    />
                    <div className="">
                      <p className="m-0 font-medium">{approval.name}</p>
                      <p className="m-0 text-xs">{approval.role}</p>
                    </div>
                  </div>
                  <IoIosClose
                    size={20}
                    className="cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              ))
            ) : (
              <h3 className="text-center my-8 text-gray-400">
                No approvals found
              </h3>
            )}
          </div>
          <div className="flex justify-end">
            <button
              disabled={!approvals?.length}
              className="bg-[#303840] hover:bg-[#22262b] transition-all text-sm rounded-[4px] text-white font-medium px-4 py-2 font-helvetica shadow-md"
              onClick={submitApproval}
            >
              Choose handover
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LeaveReturnApprovalForm;

LeaveReturnApprovalForm.propTypes={
approvalNotification:PropTypes.object,
setApprovalNotification:PropTypes.func,
setSelectedTab:PropTypes.func,
}
