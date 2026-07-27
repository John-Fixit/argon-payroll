/* eslint-disable no-unused-vars */
import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import UploadCooperativeDrawer from "../../../../components/core/payroll/cooperative/UploadCooperativeDrawer";
import CooperativeTable from "./CooperativeTable";
import { FaSquareFull } from "react-icons/fa";
import { GiContract } from "react-icons/gi";
import { useGetCooperativeDetail } from "../../../../API/payroll";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import RequestCard from "../../../Approval/RequestCard";

const statusData = [
  {
    id: "0",
    label: "Fulltime",
    icon: FaSquareFull,
    b_color: "bg-blue-100",
    t_color: "text-blue-400",
  },
  {
    id: "1",
    label: "Contract",
    icon: GiContract,
    b_color: "bg-orange-100",
    t_color: "text-orange-500",
  },
];

const Cooperative = () => {
  const [open, setOpen] = useState({
    status: false,
    attribute: null,
    role: null,
  });

  const { userData } = useCurrentUser();

  const [activeTabStatus, setActiveTabStatus] = useState("0");

  const { data: allFulltimeAllowances, isPending: fulltimeAllowanceLoading } =
    useGetCooperativeDetail({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: 0,
    });
  const { data: allContractAllowances, isPending: contractAllowanceLoading } =
    useGetCooperativeDetail({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: 1,
    });

  const selectTab = (value) => {
    setActiveTabStatus(value);
  };

  const detailsNo = (value) => {
    if (value == "0") {
      return allFulltimeAllowances || [];
    } else if (value == "1") {
      return allContractAllowances || [];
    } else {
      return [];
    }
  };

  const handleOpenDrawer = (__param) => {
    setOpen({ ...open, status: true });
  };
  const handleCloseDrawer = () => {
    setOpen({ ...open, status: false });
  };

  return (
    <>
      <section className="header">
        <section>
          <PageHeader
            header_text={"Cooperative"}
            breadCrumb_data={[
              { path: "", name: "Payroll" },
              { path: "", name: "cooperative" },
            ]}
            buttonProp={[
              { button_text: "Upload Cooperative", fn: handleOpenDrawer },
            ]}
            btnAvailable={true}
          />
        </section>

        <RequestCard
          requestHistory={statusData}
          selectTab={selectTab}
          requestStatus={activeTabStatus}
          requestNo={detailsNo}
          loading={{
            0: fulltimeAllowanceLoading,
            1: contractAllowanceLoading,
          }}
        />

        {/* cooperative table */}
        <section>
          <CooperativeTable
            tableData={detailsNo(activeTabStatus)}
            handleOpenDrawer={handleOpenDrawer}
          />
        </section>
      </section>

      <UploadCooperativeDrawer
        isOpen={open.status}
        handleCloseDrawer={handleCloseDrawer}
      />
    </>
  );
};

export default Cooperative;
