/* eslint-disable no-unused-vars */
import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import LoansTable from "./LoansTable";
import UploadLoanDrawer from "../../../../components/core/payroll/loan/UploadLoanDrawer";
import { FaSquareFull } from "react-icons/fa";
import { GiContract } from "react-icons/gi";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import RequestCard from "../../../Approval/RequestCard";
import { useGetLoanDetail } from "../../../../API/payroll";

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

export default function Loans() {
  const [open, setOpen] = useState({
    status: false,
    attribute: null,
    role: null,
  });

  const { userData } = useCurrentUser();

  const [activeTabStatus, setActiveTabStatus] = useState("0");

  const { data: allFulltimeAllowances, isPending: fulltimeAllowanceLoading } =
    useGetLoanDetail({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: 0,
    });
  const { data: allContractAllowances, isPending: contractAllowanceLoading } =
    useGetLoanDetail({
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
            header_text={"Loans"}
            breadCrumb_data={[
              { path: "", name: "Payroll" },
              { path: "", name: "Loans" },
            ]}
            buttonProp={[{ button_text: "Upload Loan", fn: handleOpenDrawer }]}
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

        {/* loans table */}
        <section>
          <LoansTable
            tableData={detailsNo(activeTabStatus)}
            handleOpenDrawer={handleOpenDrawer}
          />
        </section>
      </section>

      <UploadLoanDrawer
        isOpen={open.status}
        handleCloseDrawer={handleCloseDrawer}
      />

      {/* <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer >
          <Add_UploadStaffLoanForm  />
        </FormDrawer>
      </ExpandedDrawerWithButton> */}
    </>
  );
}
