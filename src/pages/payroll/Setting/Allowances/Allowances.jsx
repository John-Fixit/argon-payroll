/* eslint-disable no-unused-vars */
import { useState } from "react";
// import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
// import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import AllowancesTable from "../../../../components/core/payroll/attribute/AllowancesTable";
import Label from "../../../../components/forms/FormElements/Label";
import { Input } from "antd";
import NewAllowancesDrawer from "../../../../components/core/payroll/attribute/new_allowances/NewAllowancesDrawer";
import { useGetAllAllowances } from "../../../../API/allowance";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import RequestCard from "../../../Approval/RequestCard";
import { FaSquareFull } from "react-icons/fa";
import { GiContract } from "react-icons/gi";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
const data = [
  {
    _id: 100,
    name: "Basic Salary",
    code: "abasic",
    abbrev: "",
    regular: "Yes",
    contribution: "No",
    type: "Payment",
    calculation: "Fast",
    recompute: true,
  },
  {
    _id: 200,
    name: "AIICO PENSIONS MANAGERS LTD",
    code: "ACC-001",
    abbrev: "ACC-001",
    regular: "ACC-001",
    contribution: "ACC-001",
    type: "ACC-001",
    calculation: "ACC-001",
    recompute: "ACC-001",
  },
  {
    _id: 300,
    name: "ACCESS BANK PLC",
    code: "ACC-001",
    abbrev: "ACC-001",
    regular: "ACC-001",
    contribution: "ACC-001",
    type: "ACC-001",
    calculation: "ACC-001",
    recompute: "ACC-001",
  },
  {
    _id: 467,
    name: "ACCESS BANK PLC",
    code: "ACC-001",
    abbrev: "ACC-001",
    regular: "ACC-001",
    contribution: "ACC-001",
    type: "ACC-001",
    calculation: "ACC-001",
    recompute: "ACC-001",
  },
  {
    _id: 590,
    name: "ACCESS BANK PLC",
    code: "ACC-001",
    abbrev: "ACC-001",
    regular: "ACC-001",
    contribution: "ACC-001",
    type: "ACC-001",
    calculation: "ACC-001",
    recompute: "ACC-001",
  },
  {
    _id: 629,
    name: "ACCESS BANK PLC",
    code: "ACC-001",
    abbrev: "ACC-001",
    regular: "ACC-001",
    contribution: "ACC-001",
    type: "ACC-001",
    calculation: "ACC-001",
    recompute: "ACC-001",
  },
];

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

export default function Allowances() {
  const [open, setOpen] = useState({
    status: false,
    attribute: null,
    role: null,
  });

  const { userData } = useCurrentUser();

  const [activeTabStatus, setActiveTabStatus] = useState("0");

  const { data: allFulltimeAllowances, isPending: fulltimeAllowanceLoading } =
    useGetAllAllowances({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: 0,
    });
  const { data: allContractAllowances, isPending: contractAllowanceLoading } =
    useGetAllAllowances({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: 1,
    });

  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(true);
    setOpen({ status: true, role: __param?.role, data: __param });
  };
  const handleCloseDrawer = () => {
    setIsOpen(false);
    setOpen({ status: false });
  };

  return (
    <>
      <section className="header">
        <section>
          <PageHeader
            header_text={"Allowances"}
            breadCrumb_data={[{ name: "Setting" }, { name: "Allowances" }]}
            buttonProp={[
              { button_text: "Add New Allowances", fn: handleOpenDrawer },
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
        {/* attributes table */}
        <section className="mt-10">
          <AllowancesTable
            tableData={detailsNo(activeTabStatus)}
            handleOpenDrawer={handleOpenDrawer}
          />
        </section>
      </section>
      <NewAllowancesDrawer
        isOpen={isOpen}
        handleCloseDrawer={handleCloseDrawer}
        defaultValues={open.data}
      />
    </>
  );
}
