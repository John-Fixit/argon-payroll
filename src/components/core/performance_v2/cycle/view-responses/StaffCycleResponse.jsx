import { Drawer } from "antd";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useGetTemplateDetail } from "../../../../../API/performance";
import StarLoader from "../../../loaders/StarLoader";
import FormRenderer from "../../../../../pages/HR/Performance/Setup/FormRenderer";

const StaffCycleResponse = ({
  isOpenViewTemplate,
  closeViewTemplate,
  template,
  actionType,
}) => {
  const { data: templateDetail, isPending: isLoadingTemplate } =
    useGetTemplateDetail({ template_id: template?.ID });

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
            <FormRenderer
              appraisalHeader={{
                appraisalHeader: formData?.appraisalHeader,
                appraisalSubHeader: formData?.appraisalSubHeader,
              }}
              sections={formData?.allSection}
              //   onSubmit={handleSubmit}
              mode="view"
            />
          </>
        )}
      </Drawer>
    </>
  );
};

export default StaffCycleResponse;

StaffCycleResponse.propTypes = {
  isOpenViewTemplate: PropTypes.bool,
  closeViewTemplate: PropTypes.func,
  template: PropTypes.any,
  actionType: PropTypes.any,
};
