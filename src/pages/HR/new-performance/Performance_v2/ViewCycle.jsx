import { Drawer } from "antd";
import PropTypes from "prop-types";
import ViewCycleRecipient from "../../../../components/core/performance_v2/cycle/view-recipient/ViewCycleRecipient";
import ViewCycleResponse from "../../../../components/core/performance_v2/cycle/view-responses/ViewCycleResponse";
import {
  useEditTemplate,
  useGetTemplateDetail,
} from "../../../../API/performance";

const ViewCycle = ({
  isOpenViewTemplate,
  closeViewTemplate,
  cycle,
  actionType,
}) => {
  const { data: templateDetail, isPending: isLoadingTemplate } =
    useGetTemplateDetail({ template_id: cycle?.ID });

  const { mutateAsync: updateTemplate, isPending: isUpdatingTemplate } =
    useEditTemplate();

  //   const formData = useMemo(() => {
  //     if (!templateDetail) return {};
  //     return (
  //       {
  //         appraisalHeader: templateDetail?.TITLE,
  //         appraisalSubHeader: templateDetail?.SUB_TITLE,
  //         allSection: JSON.parse(templateDetail.DATA_CONTENT),
  //       } || {}
  //     );
  //   }, [templateDetail]);

  //   const handleUpdateTemplate = async (data) => {
  //     const validRespondent = validateSectionRespondent(data);

  //     if (validRespondent) {
  //       const json = {
  //         template_id: cycle?.ID,
  //         title: cycle.TITLE || "New quarterly Appraisal",
  //         template: JSON.stringify(data.allSection),
  //       };

  //       try {
  //         const res = await updateTemplate(json);
  //         successToast(res?.data?.message);
  //         closeViewTemplate();
  //       } catch (err) {
  //         const errMsg = err?.response?.data?.message || err?.message;
  //         errorToast(errMsg);
  //       }
  //     }
  //   };

  return (
    <>
      <Drawer
        open={isOpenViewTemplate}
        // maskClosable={false}
        width={actionType === "CREATE_CYCLE" ? "800" : "1200px"}
        onClose={closeViewTemplate}
        title={<div className="ml-8">{cycle?.TEMPLATE_TITLE}</div>}
      >
        {/* {isLoadingTemplate ? (
          <div className="h-[80vh] flex items-center justify-center">
            <StarLoader size={25} />
          </div>
        ) : ( */}
        <>
          {actionType === "VIEW_RECIPIENT" && (
            <ViewCycleRecipient cycle={cycle} />
          )}
          {actionType === "VIEW_RESPONSE" && (
            <ViewCycleResponse cycle={cycle} />
          )}
        </>
        {/* )} */}
      </Drawer>
    </>
  );
};

export default ViewCycle;

ViewCycle.propTypes = {
  isOpenViewTemplate: PropTypes.bool,
  closeViewTemplate: PropTypes.func,
  cycle: PropTypes.any,
  actionType: PropTypes.any,
};
