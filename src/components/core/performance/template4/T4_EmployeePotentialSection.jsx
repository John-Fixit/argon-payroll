/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Input, Radio } from "antd";
import TextArea from "../../../forms/FormElements/TextArea";
import { Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const growthPotential = [
  {
    title: "A. Employees potential for growth",
    hasRank : true,
    commentRemarkTitle: "If unsatisfactory, please comment and make recommendation(s)"
  },
  {
    title: "A. OVERALL EVALUATION",
    hasRank : true,
    commentRemarkTitle: "If you rate the employee ‘Excellent’ show below, the results  which exceed the normal requirement of the job e.g.initiation of new ideas or procedures, creativity, etc."
  },
  {
    title: "",
    hasRank : false,
    commentRemarkTitle: "If you rate the employee ‘Poor’ state briefly the reason and your recommendations. Where appropriate state what you (as his immediate boss intends to do to effect improvement in his performances"
  },
] 

const T4_EmployeePotentialSection = ({
    register, getValues, setValue, formState, onNext,watch, current_level, isApprovalPage
}) => {

  const {userData} = useCurrentUser()
  // const [growthPotential, setGrowthPotential] = useState(watch("growthPotential") || {
  //   employeePotentialRank: "",
  //   employeePotentialComment: "",
  //   overallEvaluationRank: "",
  //   overallEvaluationComment: "",
  //   finalComment: "",
  // });

  // // console.log(getValues("growthPotential"))


  // // Sync local state with react-hook-form on mount
  // useEffect(() => {
  //   setValue("growthPotential", growthPotential, { shouldValidate: true });
  // }, [setValue, growthPotential]);

  // // Sync watch updates with local state (optional for external updates)
  // useEffect(() => {
  //   const currentValues = watch("growthPotential") || [];
  //   setGrowthPotential(currentValues);
  // }, [watch]);



  const handleTextAreaChange = (key, value) => {
    // const updatedAssessment = {...growthPotential};
    // updatedAssessment[index] = value;
    // setGrowthPotential(updatedAssessment);
    setValue(key, value, { shouldValidate: true, });
  };









  return (
    <>
      <Card className="shadow-sm my-4">
        <div className="p-4">
          {/* <p className="text-[17px] font-medium text-zinc-500">PART 6</p> */}

          <p className="text-[15px] my-auto font-normal text-default-600">
            ASSESSMENT OF EMPLOYEE’S POTENTIAL FOR GROWTH
          </p>
        </div>
        <span className="px-4 pb-1">(Tick as appropriate)</span>
        <hr />
        <CardBody className="px-6 w-full rid md:rid-cols2 gap-3">
          <div className="rid rid-cols-8">
            <div></div>
            <div className="col-span-7">
              <p className="">GROWTH POTENTIAL</p>
              <div className="flex flex-col gap-y-2 ustify-betwee mt-6 mb-3">
                <p className="text-sm text-zinc-500">
                  A. Employees potential for growth
                </p>
                <Radio.Group onChange={(e) => handleTextAreaChange("staff_growth_potential", e.target.value)}
                 value={watch('staff_growth_potential')}
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
            </div>
            <div className="col-span-8 mt-3">
              <div className="rid rid-cols-8 gap-4">
                <div className="col-span-3">
                  <p className="text-zinc-500">
                    If unsatisfactory, please comment and make recommendation(s)
                  </p>
                </div>
                <div className="col-span-5">
                  <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  {
                    ...register("unsatisafactory_comment", {
                      required: "This field is required"
                    })
                  }
                  value={watch('unsatisafactory_comment')}
                  status={formState.errors?.unsatisafactory_comment === ""?  "error": ""}
                  onChange={(e) => {
                    register("unsatisafactory_comment").onChange(e);
                    handleTextAreaChange("unsatisafactory_comment", e.target.value)}

                  }
                    
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="rid rid-cols-8">
            <div></div>
            <div className="col-span-7">
              <div className="flex flex-col gap-y-2 ustify-between mt-6 mb-3">
                <div>
                  <p className="text-sm text-zinc-500">A. OVERALL EVALUATION</p>
                  <small>(Tick the appropriate box)</small>
                </div>
                <Radio.Group  onChange={(e) => handleTextAreaChange("overall_evaluation", e.target.value)}
                  value={watch('overall_evaluation')}
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
            </div>
            <div className="col-span-8 mt-3">
              <div className="rid rid-cols-8 gap-4">
                <div className="col-span-3">
                  <p className="text-zinc-500">
                    If you rate the employee ‘Excellent’ show below, the results
                    which exceed the normal requirement of the job e.g.
                    initiation of new ideas or procedures, creativity, etc.
                  </p>
                </div>
                <div className="col-span-5">
                <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  {
                    ...register("overall_evaluation_comment", {
                      required: "This field is required"
                    })
                  }
                  value={watch('overall_evaluation_comment')}
                  status={formState.errors?.overall_evaluation_comment === ""?  "error": ""}
                  onChange={(e) => {
                    register("overall_evaluation_comment").onChange(e);
                    handleTextAreaChange("overall_evaluation_comment", e.target.value)}
                  } 
                  />
                </div>
              </div>
            </div>
            <div className="col-span-8 mt-3">
              <div className="rid rid-cols-8 gap-4">
                <div className="col-span-3">
                  <p className="text-zinc-500">
                    If you rate the employee ‘Poor’ state briefly the reason and
                    your recommendations. Where appropriate state what you (as
                    his immediate boss intends to do to effect improvement in
                    his performances
                  </p>
                </div>
                <div className="col-span-5">
                <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  {
                    ...register("steps_to_overcome_weakness", {
                      required: "This field is required"
                    })
                  }
                  value={watch('steps_to_overcome_weakness')}
                  status={formState.errors?.steps_to_overcome_weakness === ""?  "error": ""}
                  onChange={(e) => {
                    register("steps_to_overcome_weakness").onChange(e);
                    handleTextAreaChange("steps_to_overcome_weakness", e.target.value)
                  }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default T4_EmployeePotentialSection;
