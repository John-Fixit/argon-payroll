/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { Avatar, Button } from "@nextui-org/react";
import { Select, Space } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { file_Prefix } from "../../../../API/leave";
import { useGetApprovalStaff } from "../../../../API/salary-advance";
import { useSaveData } from "../../../Leave/Hooks";
import { errorToast } from "../../../../utils/toastMsgPop";
import Label from "../../../forms/FormElements/Label";

const AdvanceApproval = ({ getValues, setValue, watch, goToNextTab }) => {
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [searchedApprovals, setSearchedApprovals] = useState([]);
  const [currentValue, setCurrentValue] = useState({});
  const [approvals, setApprovals] = useState([]);
  const searchRef = useRef();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const queryClient = useQueryClient();


  const { mutate, data, isPending: getStaffLoading } = useGetApprovalStaff();




  useEffect(()=>{
      mutate({
        company_id: getValues().company_id,
        staff_id: getValues().staff_id,
      })
  }, [getValues, mutate])


  const { information: info, keepData } = useSaveData();

  const selection = [
    { value: "DEPARTMENT HEAD", label: "DEPARTMENT HEAD" },
    { value: "REGION HEAD", label: "REGION HEAD" },
    { value: "UNIT HEAD", label: "UNIT HEAD" },
    { value: "DIRECTORATE HEAD", label: "DIRECTORATE HEAD" },
  ];

  

  const staff =
    data?.data?.data?.length > 0
      ? data?.data?.data?.map((current) => {
          return {
            ...current,
            value: current?.STAFF_ID,
            label: `${current.FIRST_NAME} ${current.LAST_NAME}`,
          };
        })
      : [];


  const handleChange = (e, result) => {
    setCurrentValue(result);
  };

  const handleSelectApprovals = (value) => {
    setValue("internal_approval", value)
  };

  
  return (
    <Fragment>
      <div className="w-full bg-white p-8 shadow rounded">
        <div>
          <h1 className="font-normal text-[#212529]">
           Approval
          </h1>
          <form action="">
            <div className="items-center gap-1 border-b pb-4">
              <div className="relative col-span-2">
                <Select
                  value={watch().internal_approval}
                  size={"large"}
                  loading={getStaffLoading}
                  placeholder="Select staff"
                  onChange={handleSelectApprovals}
                  className="rounded-md"
                  style={{
                    width: "100%",
                  }}
                  optionFilterProp="label"
                  showSearch
                  options={staff}
                  optionRender={(user) => (
                    <Space className="cursor-pointer  w-full  px-2 rounded-xl ">
                      {
                        <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                          {user?.data?.FILE_NAME ? (
                            <Avatar
                              alt={user?.data?.name}
                              className="flex-shrink-0"
                              size="sm"
                              src={file_Prefix + user?.data?.FILE_NAME}
                            />
                          ) : (
                            <Avatar
                              alt={user?.data?.name}
                              className="flex-shrink-0"
                              size="sm"
                              name={user?.data?.label?.trim()[0]}
                            />
                          )}

                          <div className="flex flex-col">
                            <span className="font-medium uppercase font-helvetica">
                              {user?.data?.label}
                            </span>
                            <span className="text-xs font-medium text-gray-400 uppercase font-helvetica">
                              {user?.data?.DEPARTMENT}
                            </span>
                          </div>
                        </div>
                      }
                    </Space>
                  )}
                />
             
              </div>
            </div>
            
     
          </form>
        </div>
       
        <div className="flex justify-end mt-2">
              <Button
                size="sm"
                className="rounded-md font-medium shadow font-helvetica uppercase"
                color="secondary"
                onClick={goToNextTab}
              >
                Next
              </Button>
            </div>
      </div>
    </Fragment>
  );
};

export default AdvanceApproval;

AdvanceApproval.propTypes = {
  getValues: PropTypes.func,
  setValue: PropTypes.func,
  watch: PropTypes.func,
  goToNextTab: PropTypes.func,
};
