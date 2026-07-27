/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ExpandedDrawerWithButton from "../../modals/ExpandedDrawerWithButton";
import FormDrawer from "../../payroll_components/FormDrawer";
import PropTypes from "prop-types";
import DefaultDetails from "../../../pages/Approval/DefaultDetails";
import ApprovalHistory from "../../../pages/Approval/ApprovalHistory";
import AttachmentDetailsApproval from "../../core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../core/approvals/NoteDetailsApproval";
import { useGetRequestDetail } from "../../../API/api_urls/my_approvals";
import { errorToast } from "../../../utils/toastMsgPop";
import StarLoader from "../loaders/StarLoader";

const SalaryAdvanceDrawer = ({ isOpen, onClose, salaryData }) => {
  const { mutateAsync: mutateRequestDetail, isPending } = useGetRequestDetail();

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await mutateRequestDetail({
          request_id: salaryData?.REQUEST_ID,
        });

        const {
          data: {
            START_DATE,
            END_DATE,
            STAFF_ID,
            DURATION,
            ...dataRest
          },
          ...rest
        } = res.data.data;

        setDetails({
          data: {
            DURATION: `${DURATION} months`,
            ...dataRest,
          },
          ...rest,
        });
      } catch (err) {
        errorToast(err?.response?.data?.message || err?.message);
      }
    };
    if (salaryData?.REQUEST_ID) {
      fetchDetails();
    }
  }, [mutateRequestDetail, salaryData?.REQUEST_ID]);

  const tabs = [
    {
      title: "Detail",
      component: (
        <DefaultDetails
          title={"Salary Advance"}
          details={details}
          handleClose={onClose}
          currentStatus={"default"}
        />
      ),
    },
    {
      title: "Attachment",
      component: <AttachmentDetailsApproval details={details} />,
    },
    { title: "Note", component: <NoteDetailsApproval details={details} /> },
    {
      title: "Approval history",
      component: <ApprovalHistory details={details} />,
    },
  ];

  return (
    <>
      <ExpandedDrawerWithButton isOpen={isOpen} onClose={onClose}>
        {isPending ? (
          <div className="flex justify-center">
            <StarLoader />
          </div>
        ) : (
          <FormDrawer title={""} tabs={[...tabs]}></FormDrawer>
        )}
      </ExpandedDrawerWithButton>
    </>
  );
};

SalaryAdvanceDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  salaryData: PropTypes.object,
};

export default SalaryAdvanceDrawer;
