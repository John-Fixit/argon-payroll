import { Drawer } from "antd";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import {
  useGetTemplateDetail,
  useSaveDraftForm,
  useSubmitSurveyForm,
} from "../../../API/performance";
import StarLoader from "../loaders/StarLoader";
import FormRenderer from "../../../pages/HR/Performance/Setup/FormRenderer";
import { useForm } from "react-hook-form";
import {
  checkRequiredFieldsAnswered,
  createElementLookupMap,
  mapResponsesUsingLookup,
} from "../../../utils/survey_form-helper-functions";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../../utils/toastMsgPop";
import ApprovalHistory from "../../../pages/Approval/ApprovalHistory";
import NoteDetailsApproval from "../approvals/NoteDetailsApproval";
import NoteForm from "../performance/NoteForm";
import AdvanceAttachments from "../salaryAdvance/forms/AdvanceAttachment";
import { uploadFile } from "../../../utils/uploadfile";

const ViewFormTemplate = ({
  isOpenViewTemplate,
  closeViewTemplate,
  template,
  actionType,
  selectedStatus,
}) => {
  const { userData } = useCurrentUser();
  const [selectedTab, setSelectedTab] = useState(0);

  const [isLoading, setIsLoading] = useState(null);
  const [isDraft, setIsDraft] = useState(false);

  const { data: templateDetail, isPending: isLoadingTemplate } =
    useGetTemplateDetail({
      template_id: template?.TEMPLATE_ID || template?.ID,
    });

  const formData = useMemo(() => {
    if (!templateDetail) return {};
    return (
      {
        appraisalHeader: templateDetail?.TITLE,
        appraisalSubHeader: templateDetail?.SUB_TITLE,
        allSection: JSON.parse(templateDetail.DATA_CONTENT),
      } || {}
    );
  }, [templateDetail]);

  const { register, setValue, getValues, watch, formState } = useForm({
    defaultValues: {
      attachment: [],
    },
  });

  const formTemplate = useMemo(() => {
    return formData.allSection ? formData.allSection : [];
  }, [formData.allSection]);

  const lookupMap = createElementLookupMap(formTemplate, template?.TEMPLATE_ID);

  const { mutateAsync: mutateSubmitForm, isPending: isSubmittingForm } =
    useSubmitSurveyForm();

  const { mutateAsync: saveDraftForm, isPendingL: isSubmittingDraft } =
    useSaveDraftForm();

  const handleUploadAttachment = async (attachments, token) => {
    try {
      const uploadedAttachmentIDs = await Promise.all(
        attachments?.map(async (attachment) => {
          const formData = new FormData();
          formData.append("file", attachment.file);

          const res = await uploadFile(formData, token);

          return res?.file_url_id;
        }),
      );

      return uploadedAttachmentIDs;
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    const values = getValues();
    const efficientPayload = mapResponsesUsingLookup(lookupMap, data);
    const answers = efficientPayload?.map((ans) => ({
      template_key: ans?.template_key,
      section_key: ans?.section_key,
      element_key: ans?.element_key,
      answer: ans?.answer || "",
    }));
    console.log(answers, "answer");
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
      request_id: template?.REQUEST_ID,
      answers: answers,
      reporting_officer: values?.report_officer,
      counter_signing_officer: values?.counter_officer,
      note: values?.note,
      attachment: null,
    };

    setIsDraft(data?.is_draft);

    console.log(json);

    const result = checkRequiredFieldsAnswered(formTemplate, json.answers); //{ allAnswered: true };

    if (result?.allAnswered && json.answers?.length) {
      const uploadedAttachment = await handleUploadAttachment(
        values?.attachment,
        userData?.token,
      );
      setIsLoading(true);
      if (uploadedAttachment) {
        json["attachment"] = uploadedAttachment;
      }

      try {
        console.log(json);
        const functionToExecute = data?.is_draft
          ? saveDraftForm
          : mutateSubmitForm;
        const res = await functionToExecute(json);
        successToast(res?.data?.message);
        closeViewTemplate();
      } catch (err) {
        errorToast(err?.response?.data?.message || err?.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      errorToast(
        `Please answer ${result.missingCount} required field(s), all the required fields must be answered`,
      );
    }
  };

  const tabs = useMemo(() => {
    return [
      {
        title: "Template",
        content: (
          <FormRenderer
            appraisalHeader={{
              appraisalHeader: formData?.appraisalHeader,
              appraisalSubHeader: formData?.appraisalSubHeader,
            }}
            sections={formData?.allSection}
            onSubmit={handleSubmit}
            mode={selectedStatus === "approved" ? "view" : "fill"}
            submitButtonText={selectedStatus !== "approved" ? "Submit" : ""}
            viewer={selectedStatus !== "approved" ? "respondent" : ""}
            // responseData={responseData}
            isSubmitting={isSubmittingForm || isLoading}
            isDraftLoading={isSubmittingDraft || isLoading}
            saveAsDraftFunction={(data) =>
              handleSubmit({ ...data, is_draft: true })
            }
            canSaveAsDraft={selectedStatus !== "approved" && true}
          />
        ),
      },
      selectedStatus !== "approved" && {
        title: "Add Attachment",
        content: (
          <AdvanceAttachments
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            buttonText="Upload Attachment"
            goToNextTab={() => setSelectedTab(0)}
            view="form"
          />
        ),
      },

      selectedStatus !== "approved" && {
        title: "Add Note",
        content: (
          <NoteForm
            view="form"
            register={register}
            setValue={setValue}
            watch={watch}
            saveAsDraft={() => handleSubmit({ ...getValues(), is_draft: true })}
            formState={formState}
            isDraft={isDraft}
            isPending={
              isDraft ? isSubmittingDraft || isLoading : isSubmittingForm
            }
            // isApprovalPage={}
          />
        ),
      },

      // (selectedStatus === "approved") && {
      //   title: "Note History",
      //   content: <NoteDetailsApproval details={aperData} />,
      // },
      // (selectedStatus === "approved") && {
      //   title: "Approval History",
      //   content: <ApprovalHistory details={aperData} />,
      // },
    ].filter(Boolean);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData?.allSection,
    formData?.appraisalHeader,
    formData?.appraisalSubHeader,
    formState,
    getValues,
    isSubmittingDraft,
    isSubmittingForm,
    register,
    selectedStatus,
    setValue,
    watch,
    isLoading,
  ]);

  return (
    <>
      <Drawer
        open={isOpenViewTemplate}
        width={selectedTab === 0 ? "1400px" : "1000px"}
        onClose={closeViewTemplate}
      >
        {isLoadingTemplate ? (
          <div className="h-[80vh] flex items-center justify-center">
            <StarLoader size={25} />
          </div>
        ) : (
          <>
            {/* {actionType === "VIEW" && (
              <FormRenderer
                appraisalHeader={{
                  appraisalHeader: formData?.appraisalHeader,
                  appraisalSubHeader: formData?.appraisalSubHeader,
                }}
                sections={formData?.allSection}
                onSubmit={handleSubmit}
                mode="fill"
                viewer="respondent"
                isSubmitting={isSubmittingForm}
                canSaveAsDraft={selectedStatus === "draft" && true}
              />
            )} */}

            <div className="h-full mx-3">
              <div className="bg-[#f5f7fa] min-h-screen px-5 py-5 rounded-xl">
                <div className="grid grid-cols-1 h-ful md:grid-cols-7 gap-x-7 gap-y-5">
                  <div
                    // onSubmit={handleSubmit(onSubmit)}
                    className="my- w-full p-5 overflow-y-auto col-span-6 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 "
                  >
                    <div>
                      {tabs?.map((tab, index) => (
                        <div
                          key={index}
                          style={{
                            display: selectedTab === index ? "block" : "none",
                          }}
                        >
                          {tab?.content}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col border-l-1 border-gray-400 py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-5 md:my-0 md:h-full order-1 md:order-2">
                    {tabs?.map((tab, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedTab(index)}
                        className={`${
                          selectedTab === index ? "font-[500]" : "font-[400]"
                        } relative cursor-pointer font-[13px] leading-[19.5px] text-[rgba(39, 44, 51, 0.7)]`}
                      >
                        {tab?.title}
                        <span
                          className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                            selectedTab === index
                              ? "bg-[#00bcc2]"
                              : "bg-gray-300"
                          }  border-1 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
                        ></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default ViewFormTemplate;

ViewFormTemplate.propTypes = {
  isOpenViewTemplate: PropTypes.bool,
  closeViewTemplate: PropTypes.func,
  template: PropTypes.any,
  actionType: PropTypes.any,
  selectedStatus: PropTypes.any,
};
