import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Drawer } from "antd";
import AdvanceForm from "./forms/AdvanceForm";
import { useForm } from "react-hook-form";
import AdvanceGuarantor from "./forms/AdvanceGuarantor";
import AdvanceAttachments from "./forms/AdvanceAttachment";
import AdvanceApproval from "./forms/AdvanceApproval";
import AdvanceNote from "./forms/AdvanceNote";
import { errorToast, successToast } from "../../../utils/toastMsgPop";
import {
  useApplySalaryAdvance,
  useGetPossibleAmount,
} from "../../../API/salary-advance";

const SalaryAdvanceForm = ({ isOpen, setIsOpen }) => {
  const { userData } = useCurrentUser();
  const [selectedTab, setSelectedTab] = useState(0);

  //================request to get the possible amounts=======================
  const {
    data: qualifyLoanData,
    error: qualifyLoanError,
    isError: isQualifyLoanError,
    isLoading: qualifyLoanLoading,
  } = useGetPossibleAmount({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
  });
  //============================

  const { mutate, isPending } = useApplySalaryAdvance();

  const {
    control,
    setValue,
    getValues,
    trigger,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID, //1686,
      duration: "",
      internal_approval: null,
      attachment: [],
      amount: null,
      guarantor: null,
      notes: "",
      reason: "",
    },
  });
  const goToNextTab = () => {
    if (selectedTab < tabs.length - 1) {
      setSelectedTab((prevTab) => prevTab + 1);
    }
  };

  const tabs = useMemo(
    () =>
      [
        { title: watch("possibleAmountSelected") ? "Form" : "Loan Calculator" },
        qualifyLoanData && {
          title: "Guarantor",
        },
        qualifyLoanData && {
          title: "Approval",
        },
        qualifyLoanData && {
          title: "Attachments",
        },
        qualifyLoanData && { title: "Notes" },
      ]?.filter(Boolean),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch("possibleAmountSelected"), qualifyLoanData]
  );

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

  const requiredFields = {
    amount: "Amount is required",
    duration: "Duration is required",
    guarantor: "Guarantor is required",
    attachment: "Please attach your last 2 monthly payslips as attachment",
    internal_approval: "Approval is required",
  };

  const validateForm = (values) => {
    const newErrors = {};

    Object.keys(requiredFields).forEach((field) => {
      if (Array.isArray(values?.[field])) {
        // For array fields like job_description and section_two
        if (values?.[field].length === 0) {
          newErrors[field] = requiredFields[field];
        } else if (values?.[field].length < 2) {
          newErrors[field] = "Minimum of last two payslip is required";
        }
      } else {
        // For string fields like report_officer and counter_officer
        if (!values?.[field]) {
          newErrors[field] = requiredFields[field];
        }
      }
    });

    return newErrors;
  };

  const handleSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const { uploadedAttachment, attachment, possibleAmountSelected, ...rest } =
      getValues();

    const formErrors = validateForm(getValues());

    const attachmentIDs = uploadedAttachment?.map((attachment) => {
      return attachment.file_url_id;
    });

    const json = { attachment: attachmentIDs, ...rest };

    if (Object.keys(formErrors).length > 0) {
      const combinedMessage = Object.values(formErrors).join("\n");
      errorToast(combinedMessage);
      return;
    }

    mutate(json, {
      onSuccess: (data) => {
        successToast(data?.data?.message);
        setIsOpen(false);

        reset({
          duration: "",
          internal_approval: null,
          attachment: [],
          amount: null,
          guarantor: null,
          notes: "",
          reason: "",
        });
      },
      onError: (error) => {
        errorToast(error?.response?.data?.message);
      },
    });
  };

  return (
    <>
      <Drawer
        width={750} //620 for shopping and services
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: "bg-[#F7F7F7]",
          header: "font-helvetica bg-[#F7F7F7]",
        }}
      >
        <>
          <div className="bg-[#f5f7fa] min-h-screen px-5 py-5">
            <h4 className="header_h3 text-2xl mb-3 font-helvetica">
              Salary Advance Form
            </h4>

            <div className="grid grid-cols-1 h-ful md:grid-cols-4 gap-x-7 gap-y-5">
              <div className="my- w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 ">
                {(tabs[selectedTab]?.title.toLowerCase() ==
                  "form".toLowerCase() ||
                  tabs[selectedTab]?.title.toLowerCase() ==
                    "loan calculator".toLowerCase()) && (
                  <AdvanceForm
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    errors={errors}
                    touchedFields={touchedFields}
                    trigger={trigger}
                    qualifyLoanData={qualifyLoanData}
                    qualifyLoanError={qualifyLoanError}
                    qualifyLoanLoading={qualifyLoanLoading}
                    isQualifyLoanError={isQualifyLoanError}
                    goToNextTab={goToNextTab}
                  />
                )}
                {tabs[selectedTab].title.toLowerCase() ==
                  "Guarantor".toLowerCase() && (
                  <AdvanceGuarantor
                    goToNextTab={goToNextTab}
                    setValue={setValue}
                    watch={watch}
                    getValues={getValues}
                  />
                )}
                {tabs[selectedTab].title.toLowerCase() ==
                  "Attachments".toLowerCase() && (
                  <AdvanceAttachments
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    goToNextTab={goToNextTab}
                  />
                )}
                {tabs[selectedTab].title.toLowerCase() ==
                  "Approval".toLowerCase() && (
                  <AdvanceApproval
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    goToNextTab={goToNextTab}
                  />
                )}
                {tabs[selectedTab].title.toLowerCase() ==
                  "Notes".toLowerCase() && (
                  <AdvanceNote
                    handleSubmit={handleSubmit}
                    setValue={setValue}
                    getValues={getValues}
                    isLoading={isPending}
                  />
                )}
              </div>
              <div className="flex flex-col border-l-1 border-gray-400 py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-5 md:my-0 md:h-full order-1 md:order-2">
                {tabs?.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`${
                      selectedTab === index ? "font-[600]" : "font-[400]"
                    } relative cursor-pointer font-[13px] leading-[19.5px] text-[rgba(39, 44, 51, 0.7)]`}
                  >
                    {tab?.title}
                    <span
                      className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                        selectedTab === index ? "bg-[#00bcc2]" : "bg-gray-300"
                      }  border-1 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      </Drawer>
    </>
  );
};

export default SalaryAdvanceForm;

SalaryAdvanceForm.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};
