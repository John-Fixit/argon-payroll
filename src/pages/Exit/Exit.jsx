/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PageHeader from "../../components/payroll_components/PageHeader";
import ApplyExitDrawer from "../../components/core/Exit/ApplyExitDrawer";
import ExitTable from "../../components/core/Exit/table/ExitTable";
import ExitTopCards from "./ExitTopCards";
import useExitData from "./useExit_data";
import { errorToast } from "../../utils/toastMsgPop";
import DefaultDetails from "../Approval/DefaultDetails";
import AttachmentDetailsApproval from "../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../components/core/approvals/NoteDetailsApproval";
import { useGetRequestDetail } from "../../API/api_urls/my_approvals";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../components/payroll_components/FormDrawer";
import ApprovalHistory from "../Approval/ApprovalHistory";

const Exit = () => {
  // *************************
  const [detailsStatus, setDetailsStatus] = useState("1");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openViewDrawer, setOpenViewDrawer] = useState(false);
  // *************************

  const { tableData } = useExitData(detailsStatus, setDetailsStatus);

  const { mutate: getDetails } = useGetRequestDetail();

  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });

  // *********************
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  // *********************

  const downloadExitFile = () => {
    const fileAddress = "/assets/doc/EXIT INTERVIEW FORM.pdf";
    const fileName = "EXIT INTERVIEW FORM";

    const pdfUrl = fileAddress;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("target", "_blank");
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 

  const handleCloseViewDrawer = () => {
    setOpenViewDrawer(false);
  };

  const handleOpenViewDrawer = (exitData) => {
    const requestID = exitData?.REQUEST_ID;

    getDetails(
      { request_id: requestID },
      {
        onSuccess: (data) => {
          const value = data?.data?.data;
          const approvers = value?.approvers;
          const attachments = value?.attachments;
          const requestData = value?.data;
          const notes = value?.notes;

          const { PACKAGE_ID, COMPANY_ID, STAFF_ID, BATCH_ID, EXIT_REQUEST_ID,  ...rest} = requestData;


          setDetails({
            ...details,
            approvers,
            attachments,
            notes,
            data: rest,
            requestID: requestID,
          });
          setOpenViewDrawer(true);
        },
        onError: (err) => {
          errorToast(err?.response?.data?.message);
        },
      }
    );
  };



  const viewExitTabs = [
    {
      title: "Details",
      component: (
        <DefaultDetails
          title={"Exit"}
          details={details}
          handleClose={handleCloseViewDrawer}
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
    <div className="py-8 font-helvetica">
      <PageHeader
        header_text={"Exit"}
        buttonProp={[
          {
            button_text: "Download Exit Form",
            button_type: "download",
            fn: downloadExitFile,
          },
          { button_text: "Apply for Exit", fn: handleOpenDrawer },
        ]}
        breadCrumb_data={[{ name: "Self Service" }, { name: "Exit" }]}
      />

      <ExitTopCards
        detailsStatus={detailsStatus}
        setDetailsStatus={setDetailsStatus}
      />

      <ExitTable exitData={tableData ?? []} handleOpenView={handleOpenViewDrawer}/>

      {openDrawer && (
        <ApplyExitDrawer isOpen={openDrawer} setIsOpen={setOpenDrawer} />
      )}


<ExpandedDrawerWithButton
        isOpen={openViewDrawer}
        onClose={handleCloseViewDrawer}
      >
        <FormDrawer
          title={""}
          tabs={[
            ...viewExitTabs,
            {
              title: "Approval history",
              component: <ApprovalHistory details={details} />
            },
          ]}
        ></FormDrawer>
      </ExpandedDrawerWithButton>


    </div>
  );
};

export default Exit;
