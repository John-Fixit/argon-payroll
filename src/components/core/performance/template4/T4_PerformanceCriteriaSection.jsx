/* eslint-disable no-unused-vars */

import { Card, CardBody } from "@nextui-org/react";
import { Radio } from "antd";
import PropTypes from "prop-types";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const T4_PerformanceCriteriaSection = ({
  register,
  setValue,
  getValues,
  formState,
  onNext,
  watch,
  current_level, isApprovalPage
}) => {

  const {userData} = useCurrentUser()
  
  const handleTextAreaChange = (index, value) => {
    const updatedAssessment = getValues("report_rating_ranks");
    // console.log(updatedAssessment, value)
    updatedAssessment[index] = value;
    setValue("report_rating_ranks", updatedAssessment, { shouldValidate: true ,});
  };

  return (
    <>
      <Card className="shadow-sm my-4">
        <div className="p-4">
          <p className="text-[17px] font-medium text-zinc-500">PART 4</p>
          <p className="text-[15px] my-auto font-normal text-default-600">
            PERFORMANCE CRITERIA (Reporting Officer should omit factors not
            applicable and tick the column that most accurately suites his/her
            rating)
          </p>
          <p className="text-[17px]  font-[400] text-zinc-500">
            RATING FACTORS: POOR(1), FAIR(2), GOOD(3), V. Good(4), EXCELLENT(5)
          </p>
        </div>
        <hr />
        <CardBody className=" w-full ">
          {[
            {
              title: "A.   LEADERSHIP & MOTIVATION",
              sub_section: [
                {desc: "Ability to develop subordinates and build teammorale", key_value: "", line: 0},
                {desc: "Communicate, motivate staff and command respect", key_value: "", line: 1},
                {desc: "Willingness to delegate without abdicating", key_value: "", line: 2},
              ],
            },
            {
              title: "B.   DECISION MAKING CAPABILITY",
              sub_section: [
                {desc: "Ability to specify and analyse issues based on specific aims and objectives", key_value: "", line: 3},
                {desc: "Acceptance of responsibility for decision making", key_value: "", line: 4},
                {desc: "Ability to encourage subordinates to take decision", key_value: "", line: 5},
              ],
            },
            {
              title: "C.   MANAGERIAL COMPETENCE",
              sub_section: [
                {desc: "Ability to analyse problems competently, set realistic goals establish prioties correctly", key_value: "", line: 6},
                {desc: "Organisation of resources, planning, ability to cope with pressure and accurately evaluate results", key_value: "", line: 7},
                {desc: "Ability to be innovative and creative", key_value: "", line: 8},
              ],
            },
            {
              title: "D.   FUNCTIONAL EFFECTIVENESS",
              sub_section: [
                {desc: "Ability to meet deadline, initiate solutions, achieve customer satisfaction, generate profit, effectively manage budget", key_value: "", line: 9},
                {desc: "Ability to ahcieve balance between job quality and quantity", key_value: "", line: 10},
                {desc: "Efficiency on input/output on time basis", key_value: "", line: 11},
                {desc: "Safely conciousness, ability to enforce regulations, firmness and fairness in dealing with issues and breaches", key_value: "", line: 12},
              ]
            },
            {
              title: "E.   APPEARANCE",
              sub_section: [
                {desc: "Extent to which he/she observes the Authority's dress code", key_value: "", line: 13},
                // {desc: "Ability to ahcieve balance between job quality and quantity", key_value: ""},
                // {desc: "Efficiency on input/output on time basis", key_value: ""},
                // {desc: "Safely conciousness, ability to enforce regulations, firmness and fairness in dealing with issues and breaches", key_value: ""},
              ]
            }
          ].map((item, index) => (
            <div key={index + "____performance_criteria"}>
              <p className="text-sm text-zinc-500">{item?.title}</p>
              <div className="md:ms-3 lg:ms-16">
                {
                  item?.sub_section?.map((sub_item, sub_index) => (
                  <div key={sub_index+"___sub_section"} className="rid rid-cols-2 flex flex-col gap-2 my-5">
                    <p className="text-zinc-500">{sub_item?.desc}</p>
                    <Radio.Group 
                    onChange={(e) => handleTextAreaChange(sub_item.line, e.target.value)}
                    value={watch("report_rating_ranks")[sub_item.line]}
                    disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                      >
                  {[
                    { label: "Poor", value: "Poor", Numeric: "1" },
                    { label: "Fair", value: "Fair", Numeric: "2" },
                    { label: "Good", value: "Good", Numeric: "3" },
                    { label: "Very Good", value: "Very Good", Numeric: "4" },
                    { label: "Excellent", value: "Excellent", Numeric: "5" },
                  ]?.map((item, index) => (
                    <Radio
                      key={index + "___grade" + item?.value}
                      value={item?.Numeric}
                    >
                      {item?.label}
                    </Radio>
                  ))}
                </Radio.Group>
                  </div>
                  ))
                }
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </>
  );
};

T4_PerformanceCriteriaSection.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  watch: PropTypes.func,
  current_level:PropTypes.any , 
  isApprovalPage: PropTypes.any
};

export default T4_PerformanceCriteriaSection;
