/* eslint-disable react/prop-types */

import { Avatar, cn } from "@nextui-org/react";
import { Fragment } from "react";
import {
  IoCheckmarkCircleSharp,
} from "react-icons/io5";
import { MdPending } from "react-icons/md";
import moment from "moment";
import { ImCancelCircle } from "react-icons/im";
import { filePrefix } from "../../utils/filePrefix";
import { useGetRequest_Detail } from "../../API/api_urls/my_approvals";

const LeaveApprovalHistory = ({ currentView }) => {

    const { data, isPending, isError } = useGetRequest_Detail(currentView?.REQUEST_ID);

    const request_detail = data?.data?.data
  
    const details = {
      data: request_detail?.data,
      approvers: request_detail?.approvers,
      notes: request_detail?.notes,
      attachments: request_detail?.attachments,
      isLoading: isPending,
      isError: isError
    }




  return (
    <Fragment>
      <div className="shadow  rounded p-4 bg-white">
        <h4 className="text-lg font-helvetica">Approval History</h4>
        <div className="my-4 w-full">
          <ol className="ms-12 my-4 text-gray-500 border-s-2 border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {details?.approvers?.map((appHis, i) => (
              <li key={i} className="mb-10 ms-4 relative group">
                <p className="font-helvetica text-xs uppercase">
                  {appHis?.DESIGNATION}
                </p>
                <div className="border p-2 rounded">
                  <Avatar
                    src={
                      appHis?.FILE_NAME || appHis?.APPROVERS?.FILE_NAME
                        ? filePrefix +
                          (appHis?.FILE_NAME || appHis?.APPROVERS?.FILE_NAME)
                        : null
                    }
                    size="sm"
                    className="absolute -start-[62px]"
                  />
                  <span className={cn("absolute w-[12px] h-[12px]  border-2 border-white rounded-full -start-[23px] top-5", appHis?.REQUEST_STATUS !== "Awaiting" ? "bg-btnColor"  : "bg-gray-200"  )} ></span>
                  <div className="">
                    <div className="flex justify-between items-between">
                      <p className="uppercase text-gray-500 text-sm font-helvetica">
                        {appHis?.LAST_NAME || appHis?.APPROVERS?.LAST_NAME}{" "}
                        {appHis?.FIRST_NAME || appHis?.APPROVERS?.FIRST_NAME}
                      </p>
                      <div
                        className={cn(
                          "h-8 w-8 flex justify-center items-center rounded-full",
                          {
                            "bg-red-300": appHis?.REQUEST_STATUS === "Declined",
                            "bg-green-300": appHis?.REQUEST_STATUS === "Approved",
                            "bg-yellow-300": appHis?.REQUEST_STATUS === "Pending",
                            "bg-gray-300":  appHis?.REQUEST_STATUS === "Awaiting"
                          }
                        )}
                      >
                        {appHis?.REQUEST_STATUS === "Approved" ? (
                          <IoCheckmarkCircleSharp
                            size={20}
                            className="text-green-600"
                          />
                        ) : appHis?.REQUEST_STATUS === "Declined" ? (
                          <ImCancelCircle size={20} className="text-red-600" />
                        ) : appHis?.REQUEST_STATUS === "Pending" ? (
                          <MdPending size={20} className="text-yellow-600" />
                        ) : (
                          <MdPending size={20} className="text-gray-600" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs flex flex-col gap-2">
                      <span>
                        {appHis?.DEPARTMENT || appHis?.APPROVERS?.DEPARTMENT}
                      </span>
                      {
                        appHis?.REQUEST_STATUS !== "Awaiting" && (
                            <div className="flex justify-between gap-4">
                              <span>
                                {moment(
                                  appHis?.TIME_REQUESTED ||
                                    appHis?.APPROVERS?.TIME_REQUESTED
                                ).format("MMMM Do YYYY, h:mm:ss a")}
                              </span>
                              <span>
                                {moment(
                                  appHis?.TIME_REQUESTED ||
                                    appHis?.APPROVERS?.TIME_REQUESTED
                                )
                                  .startOf("day")
                                  .fromNow()
                                  .slice(0, -3)}
                              </span>
                            </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

        
        </div>
      </div>
    </Fragment>
  );
};

export default LeaveApprovalHistory;