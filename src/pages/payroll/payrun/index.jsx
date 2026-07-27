


/* eslint-disable no-unused-vars */
import {  useState } from "react";
import {
  MdOutlineAlignVerticalTop,
} from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import useCurrentUser from "../../../hooks/useCurrentUser";


import { errorToast, successToast } from "../../../utils/toastMsgPop";
import PageHeader from "../../../components/payroll_components/PageHeader";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";

import RequestCard from "../../Approval/RequestCard";
import { useClosePayrun, useGetPayrollList, useRerunPayrun, useRerunTaxPayrun, useSendToStaffPayrun, } from "../../../API/payroll_staff";
import PayrunTable from "../../../components/core/payroll/staff/pay_run_table";
import CreatePayrunForm from "../../../components/core/payroll/staff/forms/create_payrun";

const statusData = [
  {
    id: "1",
    label: "All Payrun",
    icon: MdOutlineAlignVerticalTop,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
];

const PayRunView = () => {
  const { userData } = useCurrentUser();
  const { isOpen, onOpen, onClose }  = useDisclosure()

  const [selectedTab, setSelectedTab] = useState("0");

  const {
    data,
    isPending: isLoading,
    refetch: refetchPending,
  } = useGetPayrollList({
      company_id: userData?.data?.COMPANY_ID,
      staff_id:userData?.data?.STAFF_ID,
  });

  const {mutateAsync:rerun, isPending:isRerunning} = useRerunPayrun()
  const {mutateAsync:rerunTax, isPending:isRerunningTax} = useRerunTaxPayrun()
  const {mutateAsync:pushToStaff, isPending:isPushingToStaff} = useSendToStaffPayrun()
  const {mutateAsync:lock, isPending:isLocking} = useClosePayrun()




  const selectTab = (value) => {
    setSelectedTab(value);
  };

  const detailsNo = (value) => {
          return data || [];
  };


  const handleClose = () => {
    refetchPending();
    onClose()
  };

  const handleOpen = (data) => {
    onOpen()
  };


  const handlePushToStaff = async (data) => {
    // console.log(data)
    try {
      const json = {
         "company_id" : userData?.data?.COMPANY_ID,
         "staff_id": data?.staff_id,
         "id": data?.id

      }
       const res = await pushToStaff(json)
       if(res){
        successToast(res?.data?.message || "successful!")
        handleClose("refresh")
       }
    } catch (error) {
       errorToast(error?.response?.data?.message)
    }
  };

  const handleRerun = async (data) => {
    try {
      const json = {
         "company_id" : userData?.data?.COMPANY_ID,
         "staff_id":  userData?.data?.STAFF_ID,
         "id": data?.id

      }
       const res = await rerun(json)
       if(res){
        successToast(res?.data?.message || "successful!")
        handleClose("refresh")
       }
    } catch (error) {
       errorToast(error?.response?.data?.message)
    }
  };

  const handleRerunTax = async (data) => {
    try {
      const json = {
         "company_id" : userData?.data?.COMPANY_ID,
         "staff_id":  userData?.data?.STAFF_ID,
         "id": data?.id

      }
       const res = await rerunTax(json)
       if(res){
        successToast(res?.data?.message || "successful!")
        handleClose("refresh")
       }
    } catch (error) {
       errorToast(error?.response?.data?.message)
    }
  };

  const handleLock = async (data) => {
    try {
      const json = {
         "company_id" : userData?.data?.COMPANY_ID,
         "staff_id": data?.staff_id,
         "id": data?.id

      }
       const res = await lock(json)
       if(res){
        successToast(res?.data?.message || "successful!")
        handleClose("refresh")
       }
    } catch (error) {
       errorToast(error?.response?.data?.message)
    }
  };

  return (
    <>
      <PageHeader
        header_text={"Pay Run"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "Pay Run" }]}
        buttonProp={[{ button_text: "Generate Pay Run For New Month", fn: handleOpen }]}
        
      />
      <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={selectedTab}
        requestNo={detailsNo}
        loading={{
          1: isLoading,
        }}
      />

      <PayrunTable
        incomingData={detailsNo(selectedTab)}
        isLoading={isLoading}
        pushToStaff={handlePushToStaff}
        lock={handleLock}
        reRun={handleRerun}
        isLocking={isLocking}
        isRerunning={isRerunning}
        isPushingToStaff={isPushingToStaff}
        isRerunningTax={isRerunningTax}
        reRunTax={handleRerunTax}
      />

      <ExpandedDrawerWithButton
        maxWidth={620}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <CreatePayrunForm handleClose={handleClose} />
      </ExpandedDrawerWithButton>
    </>
  );
};

export default PayRunView;
