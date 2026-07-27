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
  useGetPayrollStaffDetail,
} from "../../../API/payroll_staff";
import UpdateStaffPayrollForm from "../../../components/core/payroll/staff/forms/update_staff_payroll";
import { GiContract } from "react-icons/gi";
import { FaSquareFull } from "react-icons/fa";
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

const Allstaff = () => {
  const { userData } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedTab, setSelectedTab] = useState("0");

  const [selectedStaffData, setSelectedStaffData] = useState({});

  const { mutateAsync: mutateGetStaffDetail } = useGetPayrollStaffDetail();

  const [isLoadingStaffDetail, setIsLoadingStaffDetail] = useState({
    loading: false,
    id: null,
  });

  const getStaffPayload = {
    company_id: userData?.data?.COMPANY_ID,
    staff_type: selectedTab,
  };

  const {
    data: getRegularStaff,
    isPending: isLoading,
    refetch: refetchPending,
  } = useGetAllPayrollStaff({
    company_id: userData?.data?.COMPANY_ID,
    staff_type: "0",
  });

  const {
    data: getContractStaff,
    isPending: isLoadingContract,
    refetch: refetchOnPayroll,
  } = useGetAllPayrollStaff({
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
    refetchPending();
    refetchOnPayroll();

    onClose();
  };

  const handleOpenViewVariation = async (data) => {
    setIsLoadingStaffDetail({ loading: true, id: data?.staff_id });
    const res = await mutateGetStaffDetail({ staff_id: data?.staff_id });
    setIsLoadingStaffDetail({ loading: false, id: data?.staff_id });
    setSelectedStaffData(res?.data?.data);

    onOpen();
  };

  return (
    <>
      <PageHeader
        header_text={"All Company Staff"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "Staff" }]}
      />
      <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={selectedTab}
        requestNo={detailsNo}
        loading={{
          0: isLoading,
          1: isLoadingContract,
        }}
      />

      <AllCompanyStaffTable
        incomingData={detailsNo(selectedTab)}
        isLoading={isLoading}
        updatePayroll={handleOpenViewVariation}
        isLoadingStaffDetail={isLoadingStaffDetail}
      />

      <ExpandedDrawerWithButton
        maxWidth={620}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <UpdateStaffPayrollForm
          handleClose={handleClose}
          selectedStaffData={selectedStaffData}
        />
      </ExpandedDrawerWithButton>
    </>
  );
};

export default Allstaff;
