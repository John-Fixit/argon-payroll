/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { IoIosClose, IoMdSearch } from "react-icons/io";
import { Avatar, Button, cn } from "@nextui-org/react";
import Label from "../forms/FormElements/Label";
import Input from "../forms/FormElements/Input";
// import Select from "react-tailwindcss-select";
import { file_Prefix, useGetStaffApproval } from "../../API/leave";
import { useSaveData } from "../Leave/Hooks";
import { errorToast } from "../../utils/toastMsgPop";
import { Select, Space, Tooltip } from "antd";
import ActionButton from "../forms/FormElements/ActionButton";

const HandOverForm = ({ setInformation, information, goToNextTab }) => {
  // const [searchedStaff, setSearchedStaff] = useState([]);
  const [handOvers, setHandOvers] = useState([]);
  const [currentSelected, setCurrentSelected] = useState({});
  const [staff, setStaff] = useState([]);
  const searchRef = useRef();

  const { isFetched, data } = useGetStaffApproval({
    company_id: information.company_id,
    staff_id: information.staff_id,
    selection: "HANDING OVER",
  });
  // console.log(data?.data?.data)

  const { information: info, keepData } = useSaveData();
  // console.log(info)

  useEffect(() => {
    if (isFetched) {
      // console.log(data);
      setStaff(
        data?.data?.data?.map((current) => {
          return {
            ...current,
            value: `${current.FIRST_NAME} ${current.LAST_NAME}`,
            label: `${current.FIRST_NAME} ${current.LAST_NAME}`,
          };
        })
      );
    }
  }, [isFetched, data]);

  const handleSelectHandOver = (e, result) => {
    // console.log(result)
    // setCurrentSelected(prev=>[...prev,result])
    setCurrentSelected(result);
    keepData({ handover: result });
    setInformation((information) => {
      return { ...information, handovers: result.STAFF_ID };
    });
  };

  // function to search for the staff
  // const searchItem = (value) => {
  //     const filtered = staff.filter((selected) =>
  //       selected.name.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setSearchedStaff(filtered);
  // };

  // // function to hide the container after deleting the input value
  // const hideContainer = (value) => {
  //   if (value == "") {
  //     setSearchedStaff([]);
  //   }
  // };

  // deleting an already selected staff member
  const handleDelete = (id) => {
    const filtered = handOvers.filter((_, i) => i !== id);
    setHandOvers(filtered);
  };

  // adding handover
  // const addHandOver = (hand) => {
  //   searchRef.current.value = "";
  //   setHandOvers([...handOvers, hand]);
  //   console.log(hand);
  //   setSearchedStaff([]);
  // };

  // submit handover
  const next = () => {
    if (information.handovers == null) {
      errorToast("Handover is required");
    } else {
      goToNextTab();
    }
  };

  return (
    <Fragment>
      <div>
        <div className="w-full bg-white p-8 shadow rounded">
          {/* <h1 className="px-4 py-2 font-normal text-[#212529]">Hand Overs</h1> */}
          {/* <div>
            <div className="relative my-4">
              <Input
                type="text"
                ref={searchRef}
                labelPlacement="outside"
                label="Choose staff to handover to"
                className=" w-full ring-0 rounded-md text-md"
                radius="sm"
                        classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
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
              <Button
              color="primary"
                disabled={!handOvers?.length}
                className="rounded-md"
                onClick={submitHandOver}
              >
                Submit
              </Button>
            </div>
          </div> */}
          <div>
            <div className="relative my-4">
              <div className="my-4 items-center gap-1 border-b pb-4">
                <Label>Hand Over</Label>
                <div className="w-full relative md:col-span-2">
                  {/* <Input
                type="text"
                ref={searchRef}
                placeHolder='Search'
                onChange={(e) => searchItem(e.target.value)}
                onKeyUp={(e) => hideContainer(e.target.value)}
              />
              <IoMdSearch className="lucide lucide-search  text-sidebarInptextColor absolute top-3 right-2" /> */}

                  <Select
                    // value={value}
                    size={"large"}
                    labelInValue
                    placeholder="Select approval"
                    onChange={handleSelectHandOver}
                    className="border-1 border-gray-300 rounded-md"
                    style={{
                      width: "100%",
                    }}
                    variant="borderless"
                    optionFilterProp="label"
                    showSearch
                    options={staff.map((staff) => ({
                      value: staff?.value, // Staff unique identifier
                      label: staff?.label, // Staff name
                      disabled: staff?.ON_LEAVE, // Disable if ON_LEAVE is true
                      // title: staff?.ON_LEAVE ? "Staff on leave" : undefined, // Tooltip for disabled options
                      ...staff, // Spread the rest of the staff's properties
                    }))}
                    optionRender={(staff) => (
                      <Tooltip
                        title={
                          staff?.data?.ON_LEAVE ? (
                            <div className="flex flex-col items-start">
                              <span className="mb-2">
                                Staff on Leave, contact staff to return
                              </span>
                              {/* <ActionButton
                                className={"flex gap-x-1"}
                                onClick={() =>
                                  alert(
                                    `Request sent for ${staff?.data?.label}`
                                  )
                                }
                              >
                                Ask to return
                              </ActionButton> */}
                            </div>
                          ) : undefined
                        }
                        placement="top"
                      >
                        <Space
                          className={cn(
                            "cursor-pointer w-full px-2 rounded-xl flex justify-between",
                            staff?.data?.ON_LEAVE
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          )}
                        >
                          <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                            {staff?.data?.FILE_NAME?.includes("http") ? (
                              <Avatar
                                alt={staff?.data?.name}
                                className="flex-shrink-0"
                                size="sm"
                                src={file_Prefix + staff?.data?.FILE_NAME}
                              />
                            ) : (
                              <Avatar
                                alt={staff?.data?.name}
                                className="flex-shrink-0"
                                size="sm"
                                name={staff?.data?.label?.trim()[0]}
                              />
                            )}

                            <div className="flex flex-col">
                              <span className="font-medium uppercase font-helvetica">
                                {staff?.data?.label}
                              </span>
                              <span className="text-xs font-medium text-gray-400 uppercase font-helvetica">
                                {staff?.data?.DEPARTMENT}
                              </span>
                            </div>
                          </div>
                          {staff?.data?.ON_LEAVE ? (
                            <div className="flex items-center gap-x-1">
                              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                              <p className="text-default-400 opacity-70 text-xs font-helvetica">
                                ON LEAVE
                              </p>
                            </div>
                          ) : null}
                        </Space>
                      </Tooltip>
                    )}
                  />
                </div>
              </div>

              {/* {searchedStaff.length > 0 && (
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
              )} */}
            </div>
            {/* {handOvers.length>0 &&
<div>
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
              <Button
              color="primary"
                disabled={!handOvers?.length}
               className="rounded-md font-helvetica shadow"
                onClick={submitHandOver}
              >
                Add HandOvers
              </Button>
            </div>
</div>
} */}
            {info?.handover?.label && (
              <div className="flex justify-between my-4 items-center py-2 px-3 rounded bg-slate-100">
                <div className="flex items-center gap-5">
                  {info?.handover?.FILE_NAME ? (
                    <Avatar
                      alt={info?.handover?.name}
                      className="flex-shrink-0"
                      size="md"
                      src={
                        info?.handover?.FILE_NAME
                          ? file_Prefix + info?.handover?.FILE_NAME
                          : ""
                      }
                    />
                  ) : (
                    <Avatar
                      alt={info?.handover?.name}
                      className="flex-shrink-0"
                      size="sm"
                      name={info?.handover?.label?.trim()[0]}
                    />
                  )}
                  <div className="">
                    <p className="m-0 font-medium font-helvetica uppercase">
                      {info?.handover?.FIRST_NAME} {info?.handover?.LAST_NAME}
                    </p>
                    <p className="m-0 text-xs font-helvetica uppercase text-gray-500">
                      {info?.handover?.DEPARTMENT}
                    </p>
                  </div>
                </div>
                {/* <IoIosClose
                  size={20}
                  className="cursor-pointer"
                  onClick={() => handleDelete(index)}
                /> */}
              </div>
            )}

            <div className="flex justify-end">
              <Button
                size="sm"
                className="rounded-md font-medium shadow font-helvetica uppercase"
                color="secondary"
                onClick={next}
              >
                next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HandOverForm;

HandOverForm.propTypes = {
  setInformation: PropTypes.func,
  information: PropTypes.object,
  goToNextTab: PropTypes.func,
};
