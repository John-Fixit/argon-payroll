/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { MdOutlinePending, MdOutlineAlignVerticalTop } from "react-icons/md";
import { Button, useDisclosure } from "@nextui-org/react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetRequestDetail } from "../../../API/api_urls/my_approvals";

import { errorToast, successToast } from "../../../utils/toastMsgPop";
import PageHeader from "../../../components/payroll_components/PageHeader";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";

import RequestCard from "../../Approval/RequestCard";
import AllCompanyStaffTable from "../../../components/core/payroll/staff/all_staff_table";
import {
  useCreate13th,
  useGet13thPaymentDetails,
  useGetAll13thPayment,
  useGetAllPayrollStaff,
  useGetAllSuspendedPayrollStaff,
  useRestoreStaffPayroll,
  useStaff13thMonth,
} from "../../../API/payroll_staff";
import UpdateStaffPayrollForm from "../../../components/core/payroll/staff/forms/update_staff_payroll";
import SuspendStaffTable from "../../../components/core/payroll/staff/suspend_table";
import SuspendStaffPayrollForm from "../../../components/core/payroll/staff/forms/suspend_staff_form";
import ThirteenthMonthTable from "../../../components/core/payroll/staff/13th_table";
import Recalculate13thMonthForm from "../../../components/core/payroll/staff/forms/re_13_form";
import StaffThirteenthMonthTable from "../../../components/core/payroll/staff/staff_13th_table";
import Staff13thMonthDetail from "../../../components/core/payroll/staff/forms/create_13_form";
import PayrollReportTable from "../../../components/core/reportWizard/PayrollReportTable";
import {
  useGenerateThirteenthReport,
  useGenerateThirteenthReportByMutation,
} from "../../../API/reports";
import { Modal } from "antd";
import { BsExclamationCircleFill } from "react-icons/bs";
const statusData = [
  {
    id: "0",
    label: "All 13th Month",
    icon: MdOutlineAlignVerticalTop,
    b_color: "bg-pink-100",
    t_color: "text-pink-400",
  },
];

const ThirteenthMonth = () => {
  const { userData } = useCurrentUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isReOpen,
    onOpen: onReOpen,
    onClose: onReClose,
  } = useDisclosure();
  const {
    isOpen: isStaffOpen,
    onOpen: onStaffOpen,
    onClose: onStaffClose,
  } = useDisclosure();

  const [selectedTab, setSelectedTab] = useState("0");
  const [detailsData, setDetailsData] = useState([]);
  const [staffDetailData, setStaffDetailData] = useState(null);
  const [staffOverviewDetailData, setStaffOverviewDetailData] = useState(null);
  const [curId, setCurId] = useState(null);
  const [payrunId, setPayrunId] = useState(null);
  const [reportOpen, setReportOpen] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const {
    data: data,
    isPending: isLoading,
    refetch: refetchPending,
  } = useGetAll13thPayment({
    company_id: userData?.data?.COMPANY_ID,
  });

  const { mutateAsync: getDetails, isPending: isFetching } =
    useGet13thPaymentDetails();

  const {
    data: report13,
    refetch: getreport,
    isPending: isGenerating,
  } = useGenerateThirteenthReport(payrunId);

  const { mutateAsync: generate13Report, data: generatedReport } =
    useGenerateThirteenthReportByMutation();

  const { mutateAsync: getOverviewDetails, isPending: isFetchingOverview } =
    useStaff13thMonth();

  const { mutateAsync: create13th, isPending: isCreating } = useCreate13th();

  useEffect(() => {
    const open = () => {
      if (payrunId && report13?.length) {
        setReportOpen(true);
      }
    };

    open();

    return () => {
      // setPayrunId(null)
    };
  }, [report13, payrunId]);

  const selectTab = (value) => {
    setSelectedTab(value);
  };

  const detailsNo = () => {
    return data || [];
  };

  //=============view variation================

  const handleClose = (refreshSignnal) => {
    if (refreshSignnal === "refresh") {
      refetchPending();
    }
    onClose();
  };

  const handleReOpen = (data) => {
    console.log(data);
    setStaffDetailData(data);
    onReOpen();
  };

  const handleOpenConfirmModal = () => {
    setOpenConfirmModal(true);
  };
  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  const onCreate13thMonth = async () => {
    // try {
    //   const json = {
    //     company_id: userData?.data?.COMPANY_ID,
    //   };
    //   const res = await create13th(json);
    //   if (res) {
    //     successToast(res?.data?.message || "successful!");
    //     handleClose();
    //   }
    // } catch (error) {
    //   errorToast(error?.response?.data?.message);
    // }
  };

  const refetchDetail = async () => {
    try {
      const res = await getDetails(curId);
      if (res) {
        console.log(res);
        setDetailsData(res);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const onViewDetails = async (data) => {
    try {
      console.log(data);
      const res = await getDetails(data?.id);
      if (res) {
        console.log(res);
        setDetailsData(res);
        setCurId(data?.id);
        onStaffOpen();
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const generateReport = async (data) => {
    try {
      setPayrunId(data?.id);
      const reportRes = await generate13Report(data?.id);

      if (reportRes) {
        setReportOpen(true);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const onViewStaffDetails = async (data) => {
    try {
      const json = {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: data?.staff_id,
        payroll_id: data?.payroll_run_id,
      };
      const res = await getOverviewDetails(json);
      if (res) {
        console.log(res);
        setStaffOverviewDetailData(res?.data?.data);
        onOpen();
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  return (
    <>
      <PageHeader
        header_text={"13th Month"}
        breadCrumb_data={[{ name: "Payroll" }, { name: "13Th Month" }]}
        buttonProp={[
          {
            button_text: "Create 13th Month",
            fn: handleOpenConfirmModal,
            fnLoading: isCreating,
          },
        ]}
        // { button_text: "Re-Calculate 13th Month", fn: handleReOpen }
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

      <ThirteenthMonthTable
        incomingData={detailsNo(selectedTab)}
        isLoading={isLoading}
        isLoadingDetails={isFetching}
        viewDetails={onViewDetails}
        isGenerating={isGenerating}
        generateReport={generateReport}
      />

      <ExpandedDrawerWithButton
        maxWidth={1000}
        isOpen={isStaffOpen}
        onClose={onStaffClose}
      >
        <StaffThirteenthMonthTable
          incomingData={detailsData || []}
          isLoading={isLoading}
          viewDetails={onViewStaffDetails}
          recalculate={handleReOpen}
          isFetchingOverview={isFetchingOverview}
        />
      </ExpandedDrawerWithButton>

      <ExpandedDrawerWithButton
        maxWidth={620}
        isOpen={isReOpen}
        onClose={onReClose}
      >
        <Recalculate13thMonthForm
          handleClose={onReClose}
          staffDetailData={staffDetailData}
          refetchDetail={refetchDetail}
        />
      </ExpandedDrawerWithButton>

      <ExpandedDrawerWithButton
        maxWidth={820}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <Staff13thMonthDetail
          handleClose={handleClose}
          staffOverviewDetailData={staffOverviewDetailData || []}
        />
      </ExpandedDrawerWithButton>

      {/* generate report */}
      <ExpandedDrawerWithButton
        maxWidth={1400}
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
      >
        <PayrollReportTable
          tableData={generatedReport || report13 || []}
          is_grouped={true}
          title={"13th Month Remital Report"}
        />
      </ExpandedDrawerWithButton>

      <Modal
        maskClosable={false}
        title={
          <BsExclamationCircleFill size={15} className="text-red-600 mb-2" />
        }
        onClose={handleCloseConfirmModal}
        closeIcon={null}
        open={openConfirmModal}
        okType="primary"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="faded" size="lg" onClick={handleCloseConfirmModal}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-white"
              size="lg"
              onClick={onCreate13thMonth}
              loading={isCreating}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            Confirm Action
          </p>
          <p className="text-base text-gray-600">
            Are you sure you want to proceed?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ThirteenthMonth;
