import { useCallback, useMemo, useState } from "react";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import RequestCard from "../../../Approval/RequestCard";
import { FaUserFriends } from "react-icons/fa";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import OnboardingTable from "../../../../components/core/onboarding/OnboardingTable";
import Onboard_new_staff from "../../../../components/core/onboarding/onboard_new_staff/Onboard_new_staff";
import { useDeleteRequest, useGetOnboard } from "../../../../API/onboard";
import useFormStore from "../../../../components/formRequest/store";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import DefaultDetails from "../../../Approval/DefaultDetails";
import AttachmentDetailsApproval from "../../../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../../../components/core/approvals/NoteDetailsApproval";
import { useGetRequestDetail } from "../../../../API/api_urls/my_approvals";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import ApprovalHistory from "../../../Approval/ApprovalHistory";
import { Button, ConfigProvider, Modal } from "antd";

//onboard details that I need
const onboardRegData = [
  "title",
  "first_name", //required
  "last_name", //required
  "other_names",
  "maiden_name",
  "nationality", //required
  "state_of_origin", //required
  "lga", //required
  "gender", //required
  "marital_status", //required
  "phone", //required
  "email",
  "home_address", //required
  "home_state",
  "home_lga",
  "employment_type",
  "current_appointment_date",
  "first_appointment_date",
  "first_arrival_date",
  "region_office",
  "directorate",
  "department",
  "unit",
  "designation",
  "grade",
  "step",
  "dob",
  "blood_group",
];

const OnboardStaff = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [openConfirmModal, setOpenConfirmModal] = useState({
    state: false,
    requestID: null,
  });

  const [openOnboardDrawer, setOpenOnboardDrawer] = useState(false);

  const { updateData } = useFormStore();

  const statusData = useMemo(
    () => [
      {
        id: "1",
        label: "Pending",
        icon: FaUserFriends,
        b_color: "bg-cyan-100",
        t_color: "text-cyan-400",
      },
      {
        id: "2",
        label: "Approval",
        icon: FaUserFriends,
        b_color: "bg-green-100",
        t_color: "text-green-500",
      },
      {
        id: "3",
        label: "Drafts",
        icon: FaUserFriends,
        b_color: "bg-pink-100",
        t_color: "text-pink-400",
      },
      {
        id: "4",
        label: "Decline",
        icon: FaUserFriends,
        b_color: "bg-red-100",
        t_color: "text-red-400",
      },
    ],
    [],
  );

  //================= fetching of data and other properties for onboarding =========================

  const { userData } = useCurrentUser();

  const { mutate: getDetails } = useGetRequestDetail();

  const { mutateAsync: mutateDeleteRequest, isPending: isDeletingRequest } =
    useDeleteRequest();

  const [detailsStatus, setDetailsStatus] = useState("1");

  const { data: get_pending_request, isLoading: loading_1 } = useGetOnboard(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
    "pending_requests",
  );
  const { data: get_approved_request, isLoading: loading_2 } = useGetOnboard(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
    "approved_requests",
  );

  const { data: get_drafts_request, isLoading: loading_3 } = useGetOnboard(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
    "get_drafts",
  );

  const { data: get_declined_request, isLoading: loading_4 } = useGetOnboard(
    {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
    "declined_requests",
  );

  //============================================================ ends here =========================================

  const formatResponseData = useCallback((queryResponse) => {
    return queryResponse ? queryResponse?.data : {};
  }, []);

  const selectTab = (value) => {
    setDetailsStatus(value);
  };

  const detailsNo = (value) => {
    if (value == "1") {
      return formatResponseData(get_pending_request, "1")?.data;
    } else if (value == "2") {
      return formatResponseData(get_approved_request, "2")?.data;
    } else if (value == "3") {
      return formatResponseData(get_drafts_request, "3")?.data;
    } else if (value == "4") {
      return formatResponseData(get_declined_request, "4")?.data;
    } else {
      return [];
    }
  };

  const tableData = useMemo(() => {
    return detailsStatus === "1"
      ? formatResponseData(get_pending_request, "1")
      : detailsStatus === "2"
        ? formatResponseData(get_approved_request, "2")
        : detailsStatus === "3"
          ? formatResponseData(get_drafts_request, "3")
          : detailsStatus === "4"
            ? formatResponseData(get_declined_request, "4")
            : null;
  }, [
    detailsStatus,
    formatResponseData,
    get_pending_request,
    get_approved_request,
    get_declined_request,
    get_drafts_request,
  ]);

  const isLoading = useMemo(() => {
    return loading_1 || loading_2 || loading_3 || loading_4;
  }, [loading_1, loading_2, loading_3, loading_4]);

  //============= ends here ===========================

  const currTabName = useMemo(() => {
    return statusData?.find((status) => status?.id === detailsStatus)?.label;
  }, [detailsStatus, statusData]);

  const handleOpenDrawer = () => {
    updateData({
      onboard: {},
    });
    setOpenDrawer(true);
  };

  function convertKeysToLowerCase(obj) {
    // Define a mapping object for keys that have different names
    const keyMapping = {
      DATE_OF_FIRST_APPOINTMENT: "first_appointment_date",
      DATE_OF_FIRST_ARRIVAL: "first_arrival_date",
      REGIONAL_OFFICE: "region_office",
      EMPLOYEE_TYPE: "employment_type",
    };

    return Object.keys(obj).reduce((acc, key) => {
      // Get the mapped key or use the original key if there's no mapping
      const mappedKey = keyMapping[key] || key.toLowerCase();

      // Include the key only if it exists in the onboardRegData
      if (onboardRegData.includes(mappedKey)) {
        acc[mappedKey] = obj[key];
      }

      return acc;
    }, {});
  }

  const handleCancelConfirm = () => {
    setOpenConfirmModal({ state: false, requestID: null });
  };

  const handleDeleteRequest = async () => {
    try {
      const requestID = openConfirmModal?.requestID;
      const response = await mutateDeleteRequest(requestID);

      successToast(response?.data?.message);
      setOpenConfirmModal({ state: false, requestID: null });
    } catch (error) {
      const errMsg = error?.response?.data?.message || error?.message;
      errorToast(errMsg);
    }
  };

  const handleOpenOnboardDrawer = async (action, onboardData) => {
    const requestID = onboardData?.REQUEST_ID;
    if (onboardData?.IS_DRAFT) {
      updateData({
        onboard: {
          ...convertKeysToLowerCase(onboardData),
          dob: onboardData?.DATE_OF_BIRTH,
          is_draft: onboardData?.IS_DRAFT,
          draft_id: requestID, //onboardData?.STAFF_ID,
        },
      });
      setOpenDrawer(true);
    } else {
      if (action === "delete") {
        setOpenConfirmModal({ state: true, requestID });
        return;
      } else
        getDetails(
          { request_id: requestID },
          {
            onSuccess: (data) => {
              const value = data?.data?.data;
              const approvers = value?.approvers;
              const attachments = value?.attachments;
              const requestData = value?.data;
              const notes = value?.notes;

              setDetails({
                ...details,
                approvers,
                attachments,
                notes,
                data: requestData,
                requestID: requestID,
              });

              if (action === "view") {
                setOpenOnboardDrawer(true);
              } else {
                updateData({
                  onboard: {
                    ...convertKeysToLowerCase(onboardData),
                    dob: onboardData?.DATE_OF_BIRTH,
                    draft_id: onboardData?.REQUEST_ID, //onboardData?.STAFF_ID,
                    declinedOnboard: detailsStatus === "4",
                  },
                  onboardNote: notes?.[0]?.NOTE_CONTENT,
                });
                setOpenDrawer(true);
              }
            },
            onError: (err) => {
              errorToast(err?.response?.data?.message || err?.message);
            },
          },
        );
    }
  };

  const handleCloseOnboardDrawer = () => {
    setOpenOnboardDrawer(false);
  };

  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });

  const viewOnboardTabs = [
    {
      title: "Details",
      component: (
        <DefaultDetails
          title={"Employee Onboarding"}
          details={details}
          handleClose={handleCloseOnboardDrawer}
          currentStatus={detailsStatus}
        />
      ),
    },
    {
      title: "Attachment",
      component: <AttachmentDetailsApproval details={details} />,
    },
    { title: "Note", component: <NoteDetailsApproval details={details} /> },
  ];

  return (
    <div>
      <PageHeader
        header_text={"Onboarding"}
        buttonProp={[{ button_text: "New Onboarding", fn: handleOpenDrawer }]}
      />

      <RequestCard
        requestHistory={statusData}
        selectTab={selectTab}
        requestStatus={detailsStatus}
        requestNo={detailsNo}
        loading={{
          1: loading_1,
          2: loading_2,
          4: loading_3,
          5: loading_4,
        }}
      />
      <Separator separator_text={`${currTabName} Onboarding`} />

      <div className="mt-3">
        <OnboardingTable
          tableData={tableData?.data ?? []}
          isLoading={isLoading}
          handleAction={handleOpenOnboardDrawer}
          currentTab={detailsStatus}
        />
      </div>

      {openDrawer && (
        <Onboard_new_staff isOpen={openDrawer} setIsOpen={setOpenDrawer} />
      )}

      <ExpandedDrawerWithButton
        isOpen={openOnboardDrawer}
        onClose={handleCloseOnboardDrawer}
      >
        <FormDrawer
          title={""}
          tabs={[
            ...viewOnboardTabs,
            {
              title: "Approval history",
              component: <ApprovalHistory details={details} />,
            },
          ]}
        ></FormDrawer>
      </ExpandedDrawerWithButton>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00bcc2",
          },
        }}
      >
        <Modal
          open={openConfirmModal?.state}
          title="Confirmation to Delete Request"
          // onOk={handleDeleteRequest}
          onCancel={handleCancelConfirm}
          footer={(_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              {/* <OkBtn /> */}
              <Button
                onClick={handleDeleteRequest}
                type="primary"
                loading={isDeletingRequest}
              >
                Confirm
              </Button>
            </>
          )}
        >
          <p>Are you sure to continue with this action?</p>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default OnboardStaff;
