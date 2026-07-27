/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoIosClose, IoMdSearch } from "react-icons/io";
import { Avatar, Button, cn, Spinner, User } from "@nextui-org/react";
import Label from "../forms/FormElements/Label";
import { file_Prefix, useGetApprovalStaff } from "../../API/leave";
import { useSaveData } from "../Leave/Hooks";
import { Select, Space, Tooltip } from "antd";
import { errorToast } from "../../utils/toastMsgPop";
import { useQueryClient } from "@tanstack/react-query";
import ActionButton from "../forms/FormElements/ActionButton";

const ApprovalForm = ({ setInformation, information, goToNextTab }) => {
  const [currentValue, setCurrentValue] = useState({});

  const { mutate, data, isPending: getStaffLoading } = useGetApprovalStaff();

  useEffect(() => {
    mutate({
      company_id: information.company_id,
      staff_id: information.staff_id,
      selection: currentValue?.value,
    });
  }, [
    currentValue?.value,
    information.company_id,
    information.staff_id,
    mutate,
  ]);

  const { information: info, keepData } = useSaveData();

  // Approval form

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

  const handleSelectApprovals = (e, result) => {
    let existed = info?.approvals?.find(
      (approval) => approval.STAFF_ID == result.STAFF_ID
    );

    if (existed) {
      errorToast("Already selected");
    } else {
      if (info?.approvals?.length) {
        keepData({ approvals: [...info.approvals, result] });
      } else {
        keepData({ approvals: [result] });
      }

      setInformation((information) => {
        return {
          ...information,
          internal_approvals: [
            ...information.internal_approvals,
            { title: currentValue.value, staff_id: result.STAFF_ID },
          ],
        };
      });

      // setCurrentValue({});
    }
  };

  // deleting an already selected staff member
  const handleDelete = (approval) => {
    const filtered = info?.approvals.filter(
      (current, i) => current.STAFF_ID !== approval.STAFF_ID
    );
    // setApprovals(filtered);
    keepData({ approvals: filtered });
    setInformation((information) => {
      return {
        ...information,
        internal_approvals: information.internal_approvals.filter(
          (current, i) => current.staff_id !== approval.STAFF_ID
        ),
      };
    });
  };

  return (
    <Fragment>
      <form className="w-full bg-white p-8 shadow rounded">
        <div>
          {/* <h1 className="px-4 py-2 font-normal text-[#212529]">
           Approval
          </h1> */}
          <div>
            <div className="my-4 items-center gap-1 border-b pb-4">
              <Label>Approval Title</Label>
              <div className="w-full md:col-span-2">
                <Select
                  size="large"
                  placeholder="Select approval title"
                  options={selection}
                  value={currentValue}
                  className="w-full font-helvetica"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="my-4 items-center gap-1 border-b pb-4">
              <Label>Staff</Label>
              <div className="relative col-span-2">
                <Select
                  size={"large"}
                  disabled={!currentValue?.label}
                  labelInValue
                  loading={getStaffLoading}
                  placeholder="Select Staff Name"
                  onChange={handleSelectApprovals}
                  className="rounded-md"
                  style={{
                    width: "100%",
                  }}
                  optionFilterProp="label"
                  showSearch
                  value={currentValue?.label && null}
                  options={staff.map((user) => ({
                    value: user?.value, // Staff unique identifier
                    label: user?.label, // Staff name
                    disabled: user?.ON_LEAVE, // Disable if ON_LEAVE is true
                    // title: user?.ON_LEAVE ? "Staff on leave" : undefined, // Tooltip for disabled options
                    ...user, // Spread the rest of the user's properties
                  }))}
                  optionRender={(staff) => (
                    <Tooltip
                      title={
                        staff?.data?.ON_LEAVE ? (
                          <div className="flex flex-col items-start">
                            <span className="mb-2">
                              Staff on Leave, contact staff to return
                            </span>
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
                        <div
                          className={cn(`flex gap-2 items-center px-2 py-1`)}
                        >
                          {staff?.data?.FILE_NAME ? (
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
          </div>
        </div>
        {info?.approvals?.length > 0 && (
          <div className="m-8">
            <div className="px-4 border-b border-slate-400 font-helvetica flex items-center gap-2">
              <p className="text-[#00BCC2] text-medium font-helvetica">
                {info?.approvals?.length > 1 ? "Approvals" : " Approval"}
              </p>{" "}
              <span className="bg-[#00BCC2] rounded-full h-[14px] w-[14px] text-white text-xs font-medium text-center">
                {info?.approvals?.length}
              </span>
            </div>
            <div>
              {info?.approvals
                ?.slice()
                ?.reverse()
                ?.map((approval, index) => (
                  <div
                    className="flex justify-between my-4 items-center py-2 px-3 rounded bg-slate-100"
                    key={index}
                  >
                    <div className="flex items-center gap-5">
                      {approval?.FILE_NAME ? (
                        <Avatar
                          alt={approval?.name}
                          className="flex-shrink-0"
                          size="sm"
                          src={
                            approval?.FILE_NAME
                              ? file_Prefix + approval?.FILE_NAME
                              : ""
                          }
                        />
                      ) : (
                        <Avatar
                          alt={approval?.name}
                          className="flex-shrink-0"
                          size="md"
                          name={approval?.label?.trim()[0]}
                        />
                      )}
                      <div className="">
                        <p className="m-0 font-medium font-helvetica uppercase">
                          {approval?.FIRST_NAME} {approval?.LAST_NAME}
                        </p>
                        <p className="m-0 text-xs font-helvetica uppercase text-gray-500">
                          {approval?.DEPARTMENT}
                        </p>
                      </div>
                    </div>
                    <IoIosClose
                      size={20}
                      className="cursor-pointer"
                      onClick={() => handleDelete(approval)}
                    />
                  </div>
                ))}
            </div>
            <div className="flex justify-end"></div>
          </div>
        )}
        <div className="flex justify-end">
          <Button
            size="sm"
            className="rounded-md font-medium shadow font-helvetica uppercase"
            color="secondary"
            onClick={goToNextTab}
          >
            Next
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default ApprovalForm;

ApprovalForm.propTypes = {
  setInformation: PropTypes.func,
  information: PropTypes.object,
  goToNextTab: PropTypes.func,
};
