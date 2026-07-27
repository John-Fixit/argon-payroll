/* eslint-disable no-unused-vars */

import TextArea from "../../../forms/FormElements/TextArea";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const T4_PreliminaryAssessmentSection = ({
  register,
  setValue,
  formState,
  watch,
  onNext,
  current_level, isApprovalPage
}) => {
  // let sectionTwo = watch("section_two") || Array(4).fill("");
  const [sectionTwo, setSectionTwo] = useState(
    watch("section_two") || Array(4).fill("")
  );
  // Sync local state with react-hook-form on mount
  useEffect(() => {
    setValue("section_two", sectionTwo, { shouldValidate: true });
  }, [setValue, sectionTwo]);

  // Sync watch updates with local state (optional for external updates)
  useEffect(() => {
    const currentValues = watch("section_two") || [];
    setSectionTwo(currentValues);
  }, [watch]);

  const handleTextAreaChange = (index, value) => {
    const updatedAssessment = [...sectionTwo];
    updatedAssessment[index] = value;
    setSectionTwo(updatedAssessment);
    setValue("section_two", updatedAssessment, { shouldValidate: true });
  };

  return (
    <>
      <Card className="shadow-sm my-4">
        <div className="p-2">
          {/* <p className="text-[17px] font-medium my-auto px-4 text-zinc-500">
              PART 2
            </p> */}
          <p className="text-[15px] my-auto font-normal  px-4 text-default-600">
            PRELIMINARY SELF ASSESSMENT (To be completed by appraisee)
          </p>
        </div>
        <hr />
        <CardBody className=" w-full p-4">
          {[
            {
              text: "State any special contributions you have made during the year to the activities of your Department/Directorate/Organisation. (such contributions that could earn you special commendation, reward, certificate, special mention or honours).",
            },
            {
              text: "What improvement do you think you have made on any unfavourable report made on your work in the last appraisal exercise?",
            },
            {
              text: "State what conditions or circumstances facilitated your performance.",
            },
            {
              text: "State if any, the conditions and circumstances that impeded your achieving better performance.",
            },
          ]?.map((item, index) => (
            <div key={index + "___part_2"} className=" gap-4 my-4">
              <div className="col-span-2">
                <p className="ms-2 font-Roboto">
                  <span className="mr-2">2.{index + 1}</span>
                  <span>{item?.text}</span>
                </p>
              </div>
              <div className="col-span-3">
                <Input.TextArea
                  placeholder="..."
                  value={watch("section_two")?.[index]}
                  onChange={(e) => handleTextAreaChange(index, e.target.value)}
                  disabled={isApprovalPage }
                />
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

T4_PreliminaryAssessmentSection.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  current_level: PropTypes.any, 
  isApprovalPage: PropTypes.any,
};

export default T4_PreliminaryAssessmentSection;
