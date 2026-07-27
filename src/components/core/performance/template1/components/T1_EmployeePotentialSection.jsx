/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Input, Radio } from "antd";
import { Card, CardBody } from "@nextui-org/react";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
// import { useEffect, useState } from "react";

const T1_EmployeePotentialSection = ({
  appraisee,
  register,
  setValue,
  getValues,
  watch,
  formState,
  onNext,
  current_level,
  isApprovalPage,
}) => {
  const { userData } = useCurrentUser();

  // const [overAllRating, setOverAllRating] = useState(watch("overall_rating") || {
  //   overall_evaluation: "",
  //   assessor_comment: "",
  //   promotability: "",
  //   reporting_officer_comment: "",
  //   countersigning_comment: "",
  //   appraisee_comment: "",
  // });

  // useEffect(() => {
  //   setValue("overall_rating", overAllRating, { shouldValidate: true,  });
  // }, [setValue, overAllRating]);

  // // Sync watch updates with local state (optional for external updates)
  // useEffect(() => {
  //   const currentValues = watch("overall_rating") || [];
  //   setOverAllRating(currentValues);
  // }, [watch]);

  // const handleTextAreaChange = (index, value) => {
  //   const updatedAssessment = {...overAllRating};
  //   updatedAssessment[index] = value;
  //   setOverAllRating(updatedAssessment);
  //   setValue("training", updatedAssessment, { shouldValidate: true,  });
  // };

  // console.log(getValues("appa_r_officer"), userData?.data?.STAFF_ID)

  return (
    <>
      <Card className="shadow-sm my-4">
        <div className="p-4">
          {/* <p className="text-[17px] font-medium text-zinc-500">PART 4</p> */}

          <p className="text-[15px] my-auto font-normal text-default-600">
            Summary:Overall rating by the Assessor.
          </p>
        </div>
        <hr />
        <CardBody className="px-6 w-full rid md:rid-cols2 gap-3">
          {(isApprovalPage || !appraisee) && (
            <>
              <div className="col-span-7">
                <div className="mt-6 mb-3 ">
                  <div className="flex  gap-2 flex-wrap">
                    <p className="text-sm text-zinc-500">OVERALL EVALUATION</p>
                    <small>(Tick the appropriate box)</small>
                  </div>
                  <>
                    <Radio.Group
                      disabled={
                        (isApprovalPage &&
                          current_level !== "reporting officer" &&
                          getValues("appa_r_officer") !==
                            userData?.data?.STAFF_ID) ||
                        current_level !== "reporting officer"
                      }
                      value={watch("overall_evaluation")}
                      // {...register("overall_evaluation", {
                      //   required: "overall evaluation  is required",
                      // })}
                      onChange={(e) =>
                        setValue("overall_evaluation", e.target.value)
                      }
                    >
                      {[
                        { label: "Poor", value: "Poor", Numeric: "1" },
                        { label: "Fair", value: "Fair", Numeric: "2" },
                        { label: "Good", value: "Good", Numeric: "3" },
                        {
                          label: "Very Good",
                          value: "Very Good",
                          Numeric: "4",
                        },
                        {
                          label: "Excellent",
                          value: "Excellent",
                          Numeric: "5",
                        },
                      ]?.map((item, index) => (
                        <Radio
                          key={index + "___grade" + item?.value}
                          value={item?.Numeric}
                        >
                          {item?.label}
                        </Radio>
                      ))}
                    </Radio.Group>
                    {formState.errors?.overall_evaluation && (
                      <p className="text-red-500 text-[0.825rem]">
                        {formState.errors?.overall_evaluation?.message}
                      </p>
                    )}
                  </>
                </div>
              </div>
              <div className="col-span-8 mt-3">
                <div className="rid rid-cols-8 gap-4">
                  <div className="col-span-3">
                    <p className="text-zinc-500">
                      Assessor&apos;s comment on the above should include
                      justification for this rating if you rate the exployee
                      Excellent or Poor{" "}
                    </p>
                  </div>
                  <div className="col-span-5">
                    <Input.TextArea
                      disabled={
                        (isApprovalPage &&
                          current_level !== "reporting officer" &&
                          getValues("appa_r_officer") !==
                            userData?.data?.STAFF_ID) ||
                        current_level !== "reporting officer"
                      }
                      placeholder="Comment here...."
                      {...register("rating_comment", {
                        required: "This field  is required",
                      })}
                      value={watch("rating_comment")}
                      status={
                        formState.errors?.rating_comment === "" ? "error" : ""
                      }
                      onChange={(e) =>
                        setValue("rating_comment", e.target.value)
                      }
                    />
                     {formState.errors?.rating_comment && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.rating_comment?.message}
                    </p>
                  )}
                  </div>
                </div>
              </div>
              <div className="col-span-8 mt-3">
                <div className="rid rid-cols-8 gap-4">
                  <div className="col-span-3">
                    <p className="text-zinc-500">
                      Promotability: Specify the next likely promotion
                    </p>
                  </div>
                  <div className="col-span-5">
                    <Input.TextArea
                      disabled={
                        (isApprovalPage &&
                          current_level !== "reporting officer" &&
                          getValues("appa_r_officer") !==
                            userData?.data?.STAFF_ID) ||
                        current_level !== "reporting officer"
                      }
                      placeholder="Comment here...."
                      value={watch("promotability")}
                      {...register("promotability", {
                        required: "This field  is required",
                      })}
                      status={
                        formState.errors?.promotability === "" ? "error" : ""
                      }
                      onChange={(e) =>
                        setValue("promotability", e.target.value)
                      }
                    />
                     {formState.errors?.promotability && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.promotability?.message}
                    </p>
                  )}
                  </div>
                </div>
              </div>

              <div className="col-span-8 mt-3">
                <div className="rid rid-cols-8 gap-4">
                  <div className="col-span-3">
                    <p className="text-zinc-500">
                      Comments by the Reporting Officer
                    </p>
                  </div>
                  <div className="col-span-5">
                    <Input.TextArea
                      disabled={
                        (isApprovalPage &&
                          current_level !== "reporting officer" &&
                          getValues("appa_r_officer") !==
                            userData?.data?.STAFF_ID) ||
                        current_level !== "reporting officer"
                      }
                      placeholder="Comment here...."
                      value={watch("reporting_officer_comment")}
                      status={
                        formState.errors?.reporting_officer_comment
                          ? "error"
                          : ""
                      }
                      {...register("reporting_officer_comment", {
                        required: "This field is required",
                      })}
                      onChange={(e) =>
                        setValue("reporting_officer_comment", e.target.value, {
                          shouldValidate: true,
                        })
                      }
                      // {...register("reporting_officer_comment")}
                      // {
                      //   ...register("reporting_officer_comment", {
                      //     required: "This field is required"
                      //   })
                      // }
                    />
                     {formState.errors?.reporting_officer_comment && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.reporting_officer_comment?.message}
                    </p>
                  )}
                    
                  </div>
                </div>
              </div>
              <div className="col-span-8 mt-3">
                <div className="rid rid-cols-8 gap-4">
                  <div className="col-span-3">
                    <p className="text-zinc-500">
                      Comments by Countersigning Officer
                    </p>
                  </div>
                  <div className="col-span-5">
                    <Input.TextArea
                      disabled={
                        isApprovalPage && current_level !== "counter officer"
                      }
                      placeholder="Comment here...."
                      status={
                        formState.errors?.countersigning_comment
                          ? "error"
                          : ""
                      }
                      {...register("countersigning_comment", {
                        required: "This field is required",
                      })}
                      onChange={(e) =>
                        setValue("countersigning_comment", e.target.value)
                      }
                      value={watch("countersigning_comment")}
                    />
                    {formState.errors?.countersigning_comment && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.countersigning_comment?.message}
                    </p>
                  )}
                  </div>
                </div>
              </div>
            </>
          )}
          {(isApprovalPage || appraisee) && (
            <>
              <div className="col-span-8 mt-3">
                <div className="rid rid-cols-8 gap-4">
                  <div className="col-span-3">
                    <p className="text-zinc-500">
                      Appraisee&apos;s comments/Discusions
                    </p>
                  </div>
                  <div className="col-span-5">
                    <Input.TextArea
                      disabled={isApprovalPage && current_level !== "staff"}
                      placeholder="Comment here...."
                      status={
                        formState.errors?.appraisee_comment
                          ? "error"
                          : ""
                      }
                      {...register("appraisee_comment", {
                        required: "This field is required",
                      })}
                      onChange={(e) =>
                        setValue("appraisee_comment", e.target.value)
                      }
                      value={watch("appraisee_comment")}
                    />
                    {formState.errors?.appraisee_comment && (
                    <p className="text-red-500 text-[0.825rem]">
                      {formState.errors?.appraisee_comment?.message}
                    </p>
                  )}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default T1_EmployeePotentialSection;
