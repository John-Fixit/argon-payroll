/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import {
  MdOutlineCancel,
  MdOutlineCheckCircle,
  MdOutlinePending,
} from "react-icons/md";
import { BsArrowReturnLeft } from "react-icons/bs";
import HistoryTable from "../../../components/Leave/HistoryTable";
import { useEffect, useState } from "react";
import { columns, tableData } from "../../../components/Leave/data";
import LeaveCards from "../../../components/Leave/LeaveCards";
import {
  useGetApprovedRequest,
  useGetCompletedRequest,
  useGetDeclinedRequest,
  useGetReturnRequest,
} from "../../../API/leave";
import { RiDraftLine } from "react-icons/ri";

const LeaveTable = ({
  setCurrentView,
  view,
  viewDownload,
  resume,
  pendingRequest,
  pending_loading,
  userData,
}) => {
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [leaveId, setLeaveId] = useState("");
  // const [reccentColumn, setReccentColumn] = useState(columns);
  const { data: approvedRequest, isLoading: approved_loading } =
    useGetApprovedRequest({
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    });
  const { data: declinedRequest, isLoading: declined_loading } =
    useGetDeclinedRequest({
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    });
  const { data: completedRequest, isLoading: completed_loading } =
    useGetCompletedRequest({
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    });
  const { data: returnRequest, isLoading: return_loading } =
    useGetReturnRequest({
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    });

  useEffect(() => {
    setSelectedTableData(
      pendingRequest?.map((leave) => {
        return { ...leave, status: "pending" };
      })
    );
    setLeaveId("pending");
  }, [pendingRequest]);

  const selectTab = (value) => {
    setLeaveId(value);
    if (value == "pending") {
      setSelectedTableData(
        pendingRequest?.map((leave) => {
          return { ...leave, status: "pending" };
        })
      );
    } else if (value == "approved") {
      setSelectedTableData(
        approvedRequest?.data?.approved_leave?.map((leave) => {
          return { ...leave, status: "approved" };
        })
      );
    } else if (value == "declined") {
      setSelectedTableData(
        declinedRequest?.data?.declined_leave?.map((leave) => {
          return { ...leave, status: "declined" };
        })
      );
    } else if (value == "completed") {
      setSelectedTableData(
        completedRequest?.data?.complete_leave?.map((leave) => {
          return { ...leave, status: "completed" };
        })
      );
    } else if (value == "return") {
      setSelectedTableData(
        returnRequest?.data?.data?.map((leave) => {
          return { ...leave, status: "return" };
        })
      );
    }
  };
  const leaveNo = (value) => {
    if (value == "pending") {
      return pendingRequest;
    } else if (value == "approved") {
      return approvedRequest?.data?.approved_leave;
    } else if (value == "declined") {
      return declinedRequest?.data?.declined_leave;
    } else if (value == "completed") {
      return completedRequest?.data?.complete_leave;
    } else if (value == "return") {
      return returnRequest?.data?.data;
    }
  };

  const leaveHistory = [
    {
      id: "pending",
      label: "Pending",
      icon: MdOutlinePending,
      b_color: "bg-amber-100",
      t_color: "text-amber-500",
    },
    {
      id: "declined",
      label: "Declined",
      icon: MdOutlineCancel,
      b_color: "bg-red-100",
      t_color: "text-red-500",
    },
    {
      id: "approved",
      label: "Approved",
      icon: MdOutlineCheckCircle,
      b_color: "bg-green-100",
      t_color: "text-green-500",
    },
    {
      id: "completed",
      label: "Completed",
      icon: RiDraftLine,
      b_color: "bg-green-100",
      t_color: "text-green-300",
    },
    {
      id: "return",
      label: "Return",
      icon: BsArrowReturnLeft,
      b_color: "bg-blue-100",
      t_color: "text-blue-500",
    },
  ];

  return (
    <div>
      <LeaveCards
        pendingRequest
        leaveHistory={leaveHistory}
        leaveId={leaveId}
        leaveNo={leaveNo}
        selectTab={selectTab}
        loading={{
          pending: pending_loading,
          approved: approved_loading,
          declined: declined_loading,
          completed: completed_loading,
          return: return_loading,
        }}
      />

      <HistoryTable
        tableData={selectedTableData}
        setCurrentView={setCurrentView}
        columns={columns}
        view={view}
        viewDownload={viewDownload}
        resume={resume}
      />
    </div>
  );
};

export default LeaveTable;
