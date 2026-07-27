import { Drawer } from "antd";
import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  useEditTemplate,
  useGetTemplateDetail,
} from "../../../../API/performance";
import { validateSectionRespondent } from "../../../../utils/validateSectionRespondent";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import StarLoader from "../../../../components/core/loaders/StarLoader";
import FormBuilder from "../../Performance/Setup/FormBuilder";
import FormRenderer from "../../Performance/Setup/FormRenderer";
import CreateCycle from "../../../../components/core/performance_v2/create-cycle/createCycle";

const ViewTemplate = ({
  isOpenViewTemplate,
  closeViewTemplate,
  template,
  actionType,
}) => {
  const { data: templateDetail, isPending: isLoadingTemplate } =
    useGetTemplateDetail({ template_id: template?.ID });

  const { mutateAsync: updateTemplate, isPending: isUpdatingTemplate } =
    useEditTemplate();

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

  const handleUpdateTemplate = async (data) => {
    const validRespondent = validateSectionRespondent(data);

    if (validRespondent) {
      const json = {
        template_id: template?.ID,
        title: template.TITLE || "New quarterly Appraisal",
        template: JSON.stringify(data.allSection),
      };

      try {
        const res = await updateTemplate(json);
        successToast(res?.data?.message);
        closeViewTemplate();
      } catch (err) {
        const errMsg = err?.response?.data?.message || err?.message;
        errorToast(errMsg);
      }
    }
  };

  return (
    <>
      <Drawer
        open={isOpenViewTemplate}
        // maskClosable={false}
        width={actionType === "CREATE_CYCLE" ? "800" : "1200px"}
        onClose={closeViewTemplate}
        title={<div className="ml-8">{template?.TITLE}</div>}
      >
        {isLoadingTemplate ? (
          <div className="h-[80vh] flex items-center justify-center">
            <StarLoader size={25} />
          </div>
        ) : (
          <>
            {actionType === "EDIT" && (
              <FormBuilder
                role="builder"
                appraisalHeader={{
                  header: formData?.appraisalHeader,
                }}
                handleSubmit={handleUpdateTemplate}
                sections={formData?.allSection}
                isSubmitting={isUpdatingTemplate}
                isEditing={true}
              />
            )}
            {actionType === "VIEW" && (
              <FormRenderer
                appraisalHeader={{
                  appraisalHeader: formData?.appraisalHeader,
                  appraisalSubHeader: formData?.appraisalSubHeader,
                }}
                sections={formData?.allSection}
                //   onSubmit={handleSubmit}
                mode="view"
              />
            )}

            {actionType === "CREATE_CYCLE" && (
              <CreateCycle
                template={template}
                handleCloseDrawer={closeViewTemplate}
              />
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default ViewTemplate;

ViewTemplate.propTypes = {
  isOpenViewTemplate: PropTypes.bool,
  closeViewTemplate: PropTypes.func,
  template: PropTypes.any,
  actionType: PropTypes.any,
};
