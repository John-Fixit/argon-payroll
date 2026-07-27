/* eslint-disable no-unused-vars */
// import React from 'react'

import Header from "../../components/PerformanceComponents/Header";
import Separator from "../../components/payroll_components/Separator";
import React, { useState } from "react";
import PerformanceDrawer from "./PerformanceDrawer";
import RequestCard from "../Approval/RequestCard";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetActivePerformance, useGetMyAper } from "../../API/performance";
import { errorToast } from "../../utils/toastMsgPop";

import PerformanceTable from "../../components/core/performance/PerformanceTable";
import { FaFirstdraft } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { useGetRequestDetail } from "../../API/api_urls/my_approvals";
import PerformanceApprovalDrawer from "../Approval/AperApprovalView";
import { useDisclosure } from "@nextui-org/react";

const Performance = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewIndex, setViewIndex] = useState(null);
  const [aperData, setAperData] = useState(null);
  const [canApprove, setCanApprove] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const [detailsStatus, setDetailsStatus] = useState("pending");

  const { userData } = useCurrentUser();

  //===============get my APER =====================
  const {
    data: apers,
    isLoading: aperLoading,
    refetch,
  } = useGetMyAper({
    staff_id: userData?.data?.STAFF_ID,
    status: detailsStatus,
  });
  const {
    data: pendingApers,
    isLoading: pendingAperLoading,
    refetch: refetchPending,
  } = useGetMyAper({
    staff_id: userData?.data?.STAFF_ID,
    status: "pending",
  });
  const { data: draftApers, isLoading: draftAperLoading } = useGetMyAper({
    staff_id: userData?.data?.STAFF_ID,
    status: "draft",
  });
  const { data: completedApers, isLoading: completedAperLoading } =
    useGetMyAper({
      staff_id: userData?.data?.STAFF_ID,
      status: "completed",
    });

  const { mutate: mutateRequestDetail, isPending } = useGetRequestDetail();

  const { data: period } = useGetActivePerformance(userData?.data?.COMPANY_ID);

  // -------------------approval------------------------
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });
  const {
    isOpen: isAperOpen,
    onOpen: onAperOpen,
    onClose: onAperClose,
  } = useDisclosure();
  // -------------------approval------------------------

  const statusData = [
    {
      id: "pending",
      label: "Pending",
      icon: MdOutlinePending,
      b_color: "bg-amber-100",
      t_color: "text-amber-600",
    },
    {
      id: "draft",
      label: "Draft",
      icon: FaFirstdraft,
      b_color: "bg-purple-100",
      t_color: "text-purple-600",
    },
    {
      id: "completed",
      label: "Approved",
      icon: AiOutlineFileDone,
      b_color: "bg-green-100",
      t_color: "text-green-600",
    },
  ];

  const detailsNo = (value) => {
    if (value == "pending") {
      return pendingApers;
    } else if (value == "draft") {
      return draftApers;
    } else if (value == "completed") {
      return completedApers;
    }
  };

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const handleViewAper = (aper, index) => {
    setViewIndex(index);
    setSelectedTab(0);
    mutateRequestDetail(
      {
        request_id: aper?.request_id,
      },

      {
        onError: (err) => {
          const errMsg = err?.response?.data?.message || err?.message;
          errorToast(errMsg);
        },
        onSuccess: (res) => {
          const resData = res?.data?.data;

        if(Number(aper?.canApprove)){
          handleViewApproval(resData, aper?.request_id)
        }else{
          setAperData({...resData, is_draft: aper?.is_draft})
          setIsOpen(true)
        }
      }
    
  })
}

  const handleViewApproval = (value, reqID) => {
    const approvers = value?.approvers;
    const attachments = value?.attachments;
    const requestData = value?.data;
    const notes = value?.notes;
    setDetails({
      ...details,
      approvers,
      attachments,
      notes,
      data: requestData,
      requestID: reqID,
    });
    onAperOpen();
  };

  const handleClose = (refreshSignnal) => {
    setIsOpen({ type: "", status: false });

    setDetails({
      approvers: [],
      attachments: [],
      data: null,
      notes: [],
      requestID: null,
    });

    if (refreshSignnal === "refresh") {
      refetch();
      refetchPending();
    }
  };

  const handleCreateAppraise = () => {
    setSelectedTab(0);
    setIsOpen(true);
    // setCanApprove()
  };

  return (
    <div className="py-8 font-helvetica">
      <Header handleCreateAppraise={handleCreateAppraise} period={period} />
      <div className="mb-6">
        <Separator separator_text={"History"} />
        <RequestCard
          requestHistory={statusData}
          selectTab={selectTab}
          requestStatus={detailsStatus}
          requestNo={detailsNo}
        />
      </div>

      <PerformanceTable
        tableData={apers?.map((item) => {
          return {
            ...item,
            status: detailsStatus,
          };
        })}
        handleViewAper={handleViewAper}
        tableStatus={detailsStatus}
        viewIndex={viewIndex}
        isPending={isPending}
      />
      {/* <PerformanceRecord />
      <div className="my-6 grid gap-4 md:grid-cols-2">
        <PieChart />
        <BarChart />
        <LineChart />
      </div>
      <div className="my-8">
        <h2 className="font-helvetica text-lg my-2">
          The last three performances
        </h2>
        <LastThreePerformancesTable />
      </div>
      <div className="my-8">
        <h2 className="font-helvetica text-lg my-2">All Performances</h2>
        <HistoryTable />
      </div> */}
      {/* <ApprasealForm /> */}
      {/* <Drawer
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sideBarNeeded={true}
        drawerWidth={"80rem"}
      >
        {tabs[selectedTab].title.toLowerCase() ==
          "Attachments".toLowerCase() && <Attachment />}
        {tabs[selectedTab].title.toLowerCase() == "Notes".toLowerCase() && (
          <Note />
        )}
      </Drawer> */}

      <PerformanceDrawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        aperData={aperData}
        setAperData={setAperData}
        period={period}
      />

      <PerformanceApprovalDrawer
        isOpen={isAperOpen}
        setIsOpen={() => onAperClose()}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        incomingData={details}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Performance;
