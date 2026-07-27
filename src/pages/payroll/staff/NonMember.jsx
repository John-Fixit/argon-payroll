


/* eslint-disable no-unused-vars */
import {  useState } from "react";
import {
  MdOutlinePending,
  MdOutlineAlignVerticalTop,
} from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import PageHeader from "../../../components/payroll_components/PageHeader";


import RequestCard from "../../Approval/RequestCard";
import { useGetAllNonMembershipStaff } from "../../../API/payroll_staff";
import NonMemberStaffTable from "../../../components/core/payroll/staff/non_member_table";
import { FaSquareFull } from "react-icons/fa";
import { GiContract } from "react-icons/gi";

const statusData = [
  {
    id: "0",
    label: "Regular Staff",
    icon: FaSquareFull,
    b_color: "bg-blue-100",
    t_color: "text-blue-400",
  },
  {
    id: "1",
    label: "Contract Staff",
    icon: GiContract,
    b_color: "bg-orange-100",
    t_color: "text-orange-500",
  },
];



const NonMember = () => {
  const { userData } = useCurrentUser();

  const [selectedTab, setSelectedTab] = useState("0");




  const getStaffPayload = {
      company_id: userData?.data?.COMPANY_ID,
      staff_type: selectedTab,
  };

  const {
    data: getRegularStaff,
    isPending: isLoading,
    refetch: refetchPending,
  } = useGetAllNonMembershipStaff({
      company_id: userData?.data?.COMPANY_ID,
      staff_type: "0",
  });

  const {
    data: getContractStaff,
    isPending: isLoadingContract,
    refetch: refetchOnPayroll,
  } = useGetAllNonMembershipStaff({
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


  return (
    <>
      <PageHeader
        header_text={"Non Member Staff"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "Staff" }]}
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

      <NonMemberStaffTable  
        incomingData={detailsNo(selectedTab)}
        isLoading={isLoading}
         tab={selectedTab}
      />
    </>
  );
};

export default NonMember;
