/* eslint-disable no-unused-vars */
import TextArea from "../../../forms/FormElements/TextArea";
import { Card, CardBody } from "@nextui-org/react";
import { Input } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const T3_TrainingNeedSection = ({
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
  // const [training, setTraining] = useState(
  //   watch("strenghtAndWeekness") || {
  //     course: "",
  //     training_recommendation: "",
  //     training_recommendation_purpose: "",
  //     reporting_officer_coment: "",
  //   }
  // );

  // useEffect(() => {
  //   setValue("training", training, { shouldValidate: true });
  // }, [setValue, training]);

  // // Sync watch updates with local state (optional for external updates)
  // useEffect(() => {
  //   const currentValues = watch("training") || [];
  //   setTraining(currentValues);
  // }, [watch]);

  const handleTextAreaChange = (key, value) => {
    // const updatedAssessment = { ...training };
    // updatedAssessment[index] = value;
    // setTraining(updatedAssessment);
    // setValue("training", updatedAssessment, { shouldValidate: true });
    setValue(key, value, { shouldValidate: true });
  };

  return (
    <>
      <Card className="shadow-sm my-4">
        <div className="px-4 pt-4">
          <p className="text-[17px] font-medium text-zinc-500">
            PART 10 (to be carbonized and copy is to be sent to Training
            Department)
          </p>

          <p className="text-[15px] my-auto font-normal text-default-600">
            TRAINING NEEDS
          </p>
        </div>
        <hr />
        <CardBody>
          {(isApprovalPage || appraisee) && (
            <div className="my-4">
              <label htmlFor="" className="text-zinc-500">
                Courses attended during period under review:
              </label>
              <Input.TextArea
              disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                value={watch("training_response")}
                onChange={(e) => setValue("training_response", e.target.value)}
              />
            </div>
          ) }
          {(isApprovalPage || !appraisee) && (
            <>
              <div className="my-4">
                <label htmlFor="" className="text-zinc-500">
                  Training Recommendation: (To be completed by the Reporting
                  Officer)
                </label>
                <Input.TextArea
                disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  placeholder="..."
                  value={watch("training_recommendation")}
                  status={
                    formState.errors?.training_recommendation === ""
                      ? "error"
                      : ""
                  }
                  {...register("training_recommendation", {
                    required: "This field is required",
                  })}
                 
                  onChange={(e) =>
                    handleTextAreaChange(
                      "training_recommendation",
                      e.target.value
                    )
                  }
                />
                {formState.errors?.training_recommendation && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.training_recommendation?.message}
                    </p>
                  )}
              </div>
              <div className="my-4">
                <label htmlFor="" className="text-zinc-500">
                  What Performance Improvement or corporate objective will be
                  achieved by the Recommended Training?
                </label>
                <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  value={watch("training_recommendation_purpose")}
                  status={
                    formState.errors?.training_recommendation_purpose === ""
                      ? "error"
                      : ""
                  }

                  {...register("training_recommendation_purpose", {
                    required: "This field is required",
                  })}
                 
                  onChange={(e) =>
                    handleTextAreaChange(
                      "training_recommendation_purpose",
                      e.target.value
                    )
                  }
                />
                 {formState.errors?.training_recommendation_purpose && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.training_recommendation_purpose?.message}
                    </p>
                  )}
              </div>
             
              
              <div className="my-4 rid rid-cols-3 gap-8">
                <p>REPORTING OFFICER COMMENT:</p>
                <div className="col-span-2">
                  <Input.TextArea
                    placeholder="..."
                    disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                    value={watch("reporting_officer_comment")}
                    status={
                      formState.errors?.reporting_officer_comment === ""
                        ? "error"
                        : ""
                    }

                    {...register("reporting_officer_comment", {
                      required: "This field is required",
                    })}
                    
                    onChange={(e) =>
                      handleTextAreaChange(
                        "reporting_officer_comment",
                        e.target.value
                      )
                    }
                  />
                   {formState.errors?.reporting_officer_comment && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.reporting_officer_comment?.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

T3_TrainingNeedSection.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  watch: PropTypes.func,
  current_level: PropTypes.any, 
  isApprovalPage: PropTypes.any,
  appraisee:PropTypes.any
};

export default T3_TrainingNeedSection;
