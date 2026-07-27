/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdOutlinePending, MdOutlineAlignVerticalTop } from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetRequestDetail } from "../../../API/api_urls/my_approvals";

import { errorToast, successToast } from "../../../utils/toastMsgPop";
import PageHeader from "../../../components/payroll_components/PageHeader";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";

import RequestCard from "../../Approval/RequestCard";
import AllCompanyStaffTable from "../../../components/core/payroll/staff/all_staff_table";
import {
  useGetAllPayrollStaff,
  useGetAllSuspendedPayrollStaff,
  useRestoreStaffPayroll,
} from "../../../API/payroll_staff";
import UpdateStaffPayrollForm from "../../../components/core/payroll/staff/forms/update_staff_payroll";
import SuspendStaffTable from "../../../components/core/payroll/staff/suspend_table";
import SuspendStaffPayrollForm from "../../../components/core/payroll/staff/forms/suspend_staff_form";
import { FaSquareFull } from "react-icons/fa";
import { GiContract } from "react-icons/gi";
const statusData = [
  {
    id: "0",
    label: "Regular Staff",
    icon: FaSquareFull,
    b_color: "bg-blue-100",
    t_color: "text-blue-400",
    // icon: MdOutlinePending,
    // b_color: "bg-yellow-100",
    // t_color: "text-yellow-400",
  },
  {
    id: "1",
    label: "Contract Staff",
    icon: GiContract,
    b_color: "bg-orange-100",
    t_color: "text-orange-500",
    // icon: MdOutlineAlignVerticalTop,
    // b_color: "bg-green-100",
    // t_color: "text-green-500",
  },
];

const Suspension = () => {
  const { userData } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedTab, setSelectedTab] = useState("0");
  const { mutateAsync: restore, isPending: isRestoring } =
    useRestoreStaffPayroll();

  const getStaffPayload = {
    company_id: userData?.data?.COMPANY_ID,
    staff_type: selectedTab,
  };

  const {
    data: getRegularStaff,
    isPending: isLoading,
    refetch: refetchPending,
  } = useGetAllSuspendedPayrollStaff({
    company_id: userData?.data?.COMPANY_ID,
    staff_type: "0",
  });

  const {
    data: getContractStaff,
    isPending: isLoadingContract,
    refetch: refetchOnPayroll,
  } = useGetAllSuspendedPayrollStaff({
    company_id: userData?.data?.COMPANY_ID,
    staff_type: "1",
  });

  const selectTab = (value) => {
    setSelectedTab(value);
  };

  const detailsNo = (value) => {
    if (value == "0") {
      return getRegularStaff || [];
    } else if (value == "1") {
      return getContractStaff || [];
    } else {
      return [];
    }
  };

  //=============view variation================

  const handleClose = (refreshSignnal) => {
    if (refreshSignnal === "refresh") {
      refetchPending();
      refetchOnPayroll();
    }
    onClose();
  };

  const handleOpen = (data) => {
    onOpen();
  };

  const handleRestoreStaff = async (data) => {
    try {
      const json = {
        company_id: userData?.data?.COMPANY_ID,
        suspension_id: data?.SUSPENSION_ID,
      };
      const res = await restore(json);
      if (res) {
        successToast(res?.data?.message);
        handleClose("refresh");
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  return (
    <>
      <PageHeader
        header_text={"Suspension Staff"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "Staff" }]}
        buttonProp={[
          { button_text: "Add Staff To Suspension", fn: handleOpen },
        ]}
      />
      <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={selectedTab}
        requestNo={detailsNo}
        loading={{
          1: isLoading,
          2: isLoadingContract,
        }}
      />

      <SuspendStaffTable
        incomingData={detailsNo(selectedTab)}
        isLoading={isLoading}
        restoreStaff={handleRestoreStaff}
        isRestoring={isRestoring}
      />

      <ExpandedDrawerWithButton
        maxWidth={620}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <SuspendStaffPayrollForm handleClose={handleClose} />
      </ExpandedDrawerWithButton>
    </>
  );
};

export default Suspension;
