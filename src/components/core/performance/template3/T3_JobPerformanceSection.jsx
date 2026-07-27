/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, CardBody } from "@nextui-org/react";

import { Input, Radio } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const T3_JobPerformanceSection = ({
  register,
  setValue,
  getValues,
  formState,
  watch,
  appraisee,
  onNext,
  current_level, isApprovalPage
}) => {

  const {userData} = useCurrentUser()

  const [jobPerformance, setJobPerformance] = useState(watch("job_performance") || Array(15).fill(""));

  const [jobPerformanceAppraisalRanks, setJobPerformanceAppraisalRanks] = useState(watch("job_performance_appraisal_ranks") || Array(15).fill(""));



  // console.log(getValues("job_performance_appraisal_ranks"))
 
     // Sync local state with react-hook-form on mount
     useEffect(() => {
       setValue("job_performance", jobPerformance, { shouldValidate: true });
     }, [setValue, jobPerformance]);

     useEffect(() => {
       setValue("job_performance_appraisal_ranks", jobPerformanceAppraisalRanks, { shouldValidate: true, shouldTouch: true });
     }, [setValue, jobPerformanceAppraisalRanks]);
   
     // Sync watch updates with local state (optional for external updates)
     useEffect(() => {
       const currentValues = watch("job_performance") || [];
       setJobPerformance(currentValues);
     }, [watch]);

     useEffect(() => {
       const currentValues = watch("job_performance_appraisal_ranks") || [];
       setJobPerformanceAppraisalRanks(currentValues);
     }, [watch]);
 
 
     const handleTextAreaChange = (index, value) => {
       const updatedAssessment = [...jobPerformance];
       updatedAssessment[index] = value;
       setJobPerformance(updatedAssessment);
       setValue("job_performance", updatedAssessment, { shouldValidate: true , shouldTouch: true});
     };

     const handleRanksTextAreaChange = (index, value) => {
       const updatedAssessmentranks = [...jobPerformanceAppraisalRanks];
       updatedAssessmentranks[index] = value;
       setJobPerformanceAppraisalRanks(updatedAssessmentranks);
       setValue("job_performance_appraisal_ranks", updatedAssessmentranks, { shouldValidate: true, shouldTouch: true });
     };











  return (
    <>
      <Card className="shadow-sm my-4">
        <div className="px-4">
          {/* <p className="text-[17px] font-medium text-zinc-500">PART 3</p> */}
          <div className="text-[17px] font-medium text-zinc-500">
            JOB PERFORMANCE
            <ol className="list-decimal pl-2">
              <li
                className="ml-2 text-sm tracking-wider mt-1"
                style={{ listStyleType: "lower-roman", fontWeight: 300 }}
              >
                The Appraisee should list the tasks and targets agreed upon
                during the period under review in the ‘A’section of the table
                below
              </li>
              <li
                className="ml-2 text-sm tracking-wider mt-1"
                style={{ listStyleType: "lower-roman", fontWeight: 300 }}
              >
                The reporting Officer will assess the degree of their
                accomplishment in the ‘B’ section
              </li>
            </ol>
          </div>

          <div className="grid grid-cols- gap-4 my-5">
            <div className="text-[1rem] font-[300]">
              A. RESPONSIBILITIES: TASKS AND TARGETS <br />
              <span className="text-sm">
                Briefly list your major responsibilities, in order of importance
                and for each responsibility, note specific goals set during
                period under review.
              </span>
            </div>
            <div className="text-[1rem] font-[300]">
              B. GENERAL ASSESSMENT <br />
              <span className="text-sm">
                Rate the employee on each task and target by ticking the column
                that most accurately describe your rating
              </span>
            </div>
          </div>
        </div>
        <hr />

        <CardBody className=" w-full px-4">
          {Array.from({ length: 15 }, (_, index) => (
            <div
              key={index + "___job_performance"}
              className="rid md:rid-cols-2 items-cente gap-4 my-3"
            >
              <div className="flex gap-4">
                <span className="-4">{index + 1}.</span>
                <Input.TextArea
                  placeholder="Task and Target"
                  value={watch("job_performance")?.[index]}
                  status={formState.errors?.job_performance?.[0] === ""?  "error": ""}
                  {
                    ...register("job_performance", {
                      required: index===0 && "This field is required"
                    })
                  }
                  onChange={(e) => handleTextAreaChange(index, e.target.value)}
                  disabled={isApprovalPage}
                />
              </div>
              {(isApprovalPage || !appraisee) && (
                <div className="mt-3">
                  <Radio.Group onChange={(e) => handleRanksTextAreaChange(index, e.target.value)}
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  value={watch("job_performance_appraisal_ranks")[index]}
                    >
                    {[
                      { label: "Poor", value: "Poor", NumericValue: "1" },
                      { label: "Fair", value: "Fair", NumericValue: "2" },
                      { label: "Good", value: "Good", NumericValue: "3" },
                      { label: "Very Good", value: "Very Good", NumericValue: "4" },
                      { label: "Excellent", value: "Excellent", NumericValue: "5" },
                    ]?.map((item, index) => (
                      <Radio
                        key={index + "___grade" + item?.value}
                        value={item?.NumericValue}
                      >
                        {item?.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </div>
              )}
            </div>
          ))}
        </CardBody>
        {/* <div className="flex justify-end py-3">
          <button
            onClick={onNext}
            className="bg-btnColor px-4 py-1 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            Next
          </button>
        </div> */}
      </Card>
    </>
  );
};

T3_JobPerformanceSection.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  current_level:PropTypes.any ,
   isApprovalPage: PropTypes.any
};

export default T3_JobPerformanceSection;
