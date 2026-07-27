/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useRef, useState } from "react";
import PageHeader from "../../components/payroll_components/PageHeader";
import SalaryAdvanceForm from "../../components/core/salaryAdvance/SalaryAdvanceForm";
import { Button } from "antd";
import SalaryApprovedAdvanceModal from "../../components/core/salaryAdvance/SalaryApprovedAdvanceModal";
import SalaryPreview from "../../components/core/salaryAdvance/SalaryPreview";
import { useReactToPrint } from "react-to-print";
import RequestCard from "../Approval/RequestCard";
import { MdOutlineCheckCircle, MdOutlinePending } from "react-icons/md";
import { useGetStaffDetails } from "../../API/staff_details";
import useCurrentUser from "../../hooks/useCurrentUser";
import SalaryAdvanceTable from "../../components/core/salaryAdvance/table/SalaryAdvanceTable";
import { useGetSalaryAdvance } from "../../API/salary-advance";
import { MdOutlineCancel } from "react-icons/md";

const statusData = [
  {
    id: "pending",
    label: "Pending",
    icon: MdOutlinePending,
    b_color: "bg-yellow-100",
    t_color: "text-yellow-400",
  },
  {
    id: "approved",
    label: "Approved",
    icon: MdOutlineCheckCircle,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
  {
    id: "rejected",
    label: "Rejected",
    icon: MdOutlineCancel,
    b_color: "bg-red-100",
    t_color: "text-red-500",
  },
];

const SalaryAdvance = () => {
  const { userData } = useCurrentUser();

  const [isOpen, setIsOpen] = useState(false);
  const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);

  const [detailsStatus, setDetailsStatus] = useState("pending");

  const { data: salaryPendingRequest, isLoading: loading_1 } =
    useGetSalaryAdvance({
      staff_id: userData?.data?.STAFF_ID,
      status: "pending",
    });
  const { data: salaryApprovedRequest, isLoading: loading_2 } =
    useGetSalaryAdvance({
      staff_id: userData?.data?.STAFF_ID,
      status: "approved",
    });
  const { data: salaryRejectedRequest, isLoading: loading_3 } =
    useGetSalaryAdvance({
      staff_id: userData?.data?.STAFF_ID,
      status: "rejected",
    });

  const formatResponseData = useCallback((queryResponse) => {
    return queryResponse ? queryResponse?.data : {};
  }, []);

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const detailsNo = useCallback(
    (value) => {
      if (value === "pending") {
        return formatResponseData(salaryPendingRequest, "pending")?.data;
      } else if (value === "approved") {
        return formatResponseData(salaryApprovedRequest, "approved")?.data;
      } else if (value === "rejected") {
        return formatResponseData(salaryRejectedRequest, "rejected")?.data;
      } else {
        return [];
      }
    },
    [
      formatResponseData,
      salaryApprovedRequest,
      salaryPendingRequest,
      salaryRejectedRequest,
    ]
  );

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };
  const handleOpenApprovedDrawer = () => {
    setIsApprovedModalOpen(true);
  };

  const handlePrint = (printMethod) => {
    printMethod();
  };

  const componentRef = useRef();

  const tableData = useMemo(() => {
    return detailsNo(detailsStatus) || [];
  }, [detailsNo, detailsStatus]);

  return (
    <>
      <PageHeader
        header_text={"Salary Advance"}
        breadCrumb_data={[{ name: "Self Service" }, { name: "Salary Advance" }]}
        buttonProp={[{ button_text: "Apply", fn: handleOpenDrawer }]}
      />

      <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={detailsStatus}
        requestNo={detailsNo}
        loading={{
          pending: loading_1,
          approved: loading_2,
          rejected: loading_3,
        }}
      />

      <SalaryAdvanceTable
        salaryAdvanceData={tableData}
        isLoading={loading_1 || loading_2}
      />

      <SalaryAdvanceForm isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* <SalaryApprovedAdvanceModal isOpen={isApprovedModalOpen} setIsOpen={setIsApprovedModalOpen} onPrint={handlePrint}  /> */}
      {/* <Button onClick={handleOpenApprovedDrawer}>Download Approved Advance</Button>
        <Button onClick={printPDF}>Download Approved Salary</Button> */}

      <div className="hidden">
        <div ref={componentRef}>
          <SalaryPreview />
        </div>
      </div>
    </>
  );
};

export default SalaryAdvance;
