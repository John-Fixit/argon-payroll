/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdOutlinePending, MdOutlineAlignVerticalTop } from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import PageHeader from "../../../components/payroll_components/PageHeader";

import RequestCard from "../../Approval/RequestCard";
import AllCompanyStaffTable from "../../../components/core/payroll/staff/all_staff_table";
import {
  useGetAllAwaitingPayrollStaff,
  useGetAllNonMembershipStaff,
} from "../../../API/payroll_staff";
import AwaitingMemberStaffTable from "../../../components/core/payroll/staff/awaiting_staff_table";

const statusData = [
  {
    id: "0",
    label: "Regular Staff",
    icon: MdOutlinePending,
    b_color: "bg-yellow-100",
    t_color: "text-yellow-400",
  },
  {
    id: "1",
    label: "Contract Staff",
    icon: MdOutlineAlignVerticalTop,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
];

const AwaitingPayrollStaff = () => {
  const { userData } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedTab, setSelectedTab] = useState("0");

  const getStaffPayload = {
    company_id: userData?.data?.COMPANY_ID,
    staff_type: selectedTab,
  };

  const {
    data,
    isPending: isLoading,
    refetch: refetchData,
  } = useGetAllAwaitingPayrollStaff(userData?.data?.COMPANY_ID);

  const details = () => {
    return data || [];
  };

  //=============view variation================

  const handleOpen = (data) => {
    onOpen();
  };

  return (
    <>
      <PageHeader
        header_text={"Awaiting Payroll Staff"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "Staff" }]}
      />

      <AwaitingMemberStaffTable
        incomingData={details()}
        isLoading={isLoading}
        tab={"0"}
      />
    </>
  );
};

export default AwaitingPayrollStaff;
