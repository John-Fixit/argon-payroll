/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { Fragment, useRef, useState } from "react";
import { staff } from "./data";
import { IoIosClose, IoMdSearch } from "react-icons/io";
import { Avatar, Input } from "@nextui-org/react";

const LeaveHandOverForm = ({
  handOverNotification,
  setHandOverNotification,
  approvalNotification,
  setApprovalNotification,
  isOpen,
  setIsOpen,
}) => {
  const [searchedStaff, setSearchedStaff] = useState([]);
  const [handOvers, setHandOvers] = useState([]);
  const searchRef = useRef();

  // function to search for the staff
  const searchItem = (value) => {
    const information = JSON.parse(sessionStorage.getItem("leaveInformation"));
    if (information) {
      const filtered = staff.filter((selected) =>
        selected.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearchedStaff(filtered);
    } else {
      alert("Fill leave form first");
    }
  };

  // function to hide the container after deleting the input value
  const hideContainer = (value) => {
    if (value == "") {
      setSearchedStaff([]);
    }
  };

  // deleting an already selected staff member
  const handleDelete = (id) => {
    const filtered = handOvers.filter((_, i) => i !== id);
    setHandOvers(filtered);
    setHandOverNotification({
      ...handOverNotification,
      notification_count: filtered.length,
    });
  };

  // adding handover
  const addHandOver = (hand) => {
    searchRef.current.value = "";
    setHandOvers([...handOvers, hand]);
    setHandOverNotification({
      ...handOverNotification,
      notification_count: [...handOvers, hand].length,
    });
    // console.log(hand);
    setSearchedStaff([]);
  };

  // submit handover
  const submitHandOver = () => {
    const information = JSON.parse(sessionStorage.getItem("leaveInformation"));
    // console.log(information);
    if (information.approvals.length < 1) {
      alert("Choose approval");
    } else {
      if (localStorage.leaveInformation) {
        const outCome = JSON.parse(localStorage.getItem("leaveInformation"));
        const toBeSaved = [
          ...outCome,
          { ...information, hand_overs: handOvers, _id: outCome.length + 1 },
        ];
        localStorage.setItem("leaveInformation", JSON.stringify(toBeSaved));
      } else {
        const toBeSaved = [{ ...information, hand_overs: handOvers, _id: 1 }];
        localStorage.setItem("leaveInformation", JSON.stringify(toBeSaved));
      }
      setHandOverNotification({
        ...handOverNotification,
        notification_count: [],
      });
      setApprovalNotification({
        ...approvalNotification,
        notification_count: [],
      });
      sessionStorage.clear("leaveInformation");
      setIsOpen(!isOpen);
    }
  };

  return (
    <Fragment>
      <div>
        <div className="w-full bg-white p-8">
          <h1 className="px-4 py-2 font-normal text-[#212529]">Hand Overs</h1>
          <div>
            <div className="relative my-4">
              <Input
                type="text"
                ref={searchRef}
                labelPlacement="outside"
                label="Choose staff to handover to"
                className=" w-full ring-0 rounded-md text-md"
                radius="sm"
            classNames={{
            inputWrapper:['border-1', "group-data-[focused=true]:border-blue-400",]
            }}
            variant="bordered"
                onChange={(e) => searchItem(e.target.value)}
                onKeyUp={(e) => hideContainer(e.target.value)}
              />
              <IoMdSearch className="lucide lucide-search  text-sidebarInptextColor absolute top-3 right-2" />
              <div className="my-4 flex items-center gap-4">
                <input type="checkbox" name="" id="main" />
                <label htmlFor="main">Is Main Handover</label>
              </div>

              {searchedStaff.length > 0 && (
                <ul className="absolute top-10 w-full bg-white px-5 border rounded shadow z-40">
                  {searchedStaff.map((handover, index) => (
                    <li
                      className="flex justify-between my-4 items-center py-2 px-3 cursor-pointer hover:bg-slate-200 rounded"
                      key={index}
                      onClick={() => addHandOver(handover)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar
                          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                          size="md"
                        />
                        <p className="m-0 font-medium">{handover.name}</p>
                      </div>
                      <p className="m-0 text-xs">{handover.abbr}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {handOvers.map((handOver, index) => (
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
                    <p className="m-0 font-medium">{handOver.name}</p>
                    <p className="m-0 text-xs">{handOver.role}</p>
                  </div>
                </div>
                <IoIosClose
                  size={20}
                  className="cursor-pointer"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))}

            <div className="flex justify-end">
              <button
                disabled={!handOvers?.length}
                className="bg-[#303840] hover:bg-[#22262b] transition-all text-sm rounded-[4px] text-white font-medium px-4 py-2 font-helvetica shadow-md"
                onClick={submitHandOver}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LeaveHandOverForm;

LeaveHandOverForm.propTypes = {
  handOverNotification: PropTypes.object,
  approvalNotification: PropTypes.object,
  setHandOverNotification: PropTypes.func,
  setApprovalNotification: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
