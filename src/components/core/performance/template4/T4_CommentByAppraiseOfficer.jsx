/* eslint-disable no-unused-vars */
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "antd";
import PropTypes from "prop-types"
const T4_CommentByAppraiseOfficer = ({
  register,
  setValue,
  getValues,
  formState,
  watch,
  onNext,
  current_level, 
  isApprovalPage
}) => {
  return (
    <>
      <Card className="shadow-sm my-4">
        <div className="px-4 pt-4">
          <p className="text-[17px] font-medium text-zinc-500">PART 7</p>

          <p className="text-[15px] my-auto font-normal text-default-600">
            COMMENTS BY OFFICER APPRAISED
          </p>
        </div>
        <hr />
        <CardBody>
          <div className="grid grid-cols-3">
            <div className="col-span-2">
              <Input.TextArea
            placeholder="Comment here..."
            value={watch("appraisee_comment")}
            onChange={(e)=>setValue("appraisee_comment", e.target.value)}
            disabled={isApprovalPage && current_level !== "staff" }
/>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};
T4_CommentByAppraiseOfficer.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  watch: PropTypes.func,
  current_level: PropTypes.any,
  isApprovalPage: PropTypes.any
}

export default T4_CommentByAppraiseOfficer;
