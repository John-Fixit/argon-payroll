
/* eslint-disable no-unused-vars */
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "antd";
import PropTypes from "prop-types";

const ReportOfficerComment = ({
  register,
  setValue,
  getValues,
  formState,
  onNext,
}) => {
  return (
    <>
      <Card className="shadow-sm">
        <div className="px-4 pt-4">
          <p className="text-[15px] my-auto font-normal text-default-600">
            COMMENTS BY OFFICER APPRAISED
          </p>
        </div>
        <CardBody>
          <div className="">
            <Input.TextArea
              className="w-full"
              onChange={(e) => setValue("appraisee_comment", e.target.value)}
              placeholder="Comments..."
            />
          </div>
          <div className="flex justify-end py-3">
        <button
        onClick={onNext}
          className="bg-btnColor px-4 py-1 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
        >
          Next
        </button>
      </div>
        </CardBody>
      </Card>
    </>
  );
};

ReportOfficerComment.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func
}

export default ReportOfficerComment;