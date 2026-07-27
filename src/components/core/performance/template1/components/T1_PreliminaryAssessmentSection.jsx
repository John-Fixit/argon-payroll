/* eslint-disable react/prop-types */

import { Input } from 'antd'
import { Card, CardBody } from '@nextui-org/react'
import { useEffect, useState } from 'react';
import useCurrentUser from '../../../../../hooks/useCurrentUser';

const T1_PreliminaryAssessmentSection = ({formState, getValues, setValue, watch, current_level, isApprovalPage}) => {
  //This will be filled by reporting officer
  const {userData} = useCurrentUser()

  const [sectionTwo, setSectionTwo] = useState(watch("section_two") || Array(4).fill(""));

  // Sync local state with react-hook-form on mount
  useEffect(() => {
    setValue("section_two", sectionTwo, { shouldValidate: true });
  }, [setValue, sectionTwo]);

  // Sync watch updates with local state (optional for external updates)
  useEffect(() => {
    const currentValues = watch("section_two") || [];
    setSectionTwo(currentValues);
  }, [watch]);


  const handleTextAreaChange = (key, value) => {
    // const updatedAssessment = [...sectionTwo];
    // updatedAssessment[index] = value;
    // setSectionTwo(updatedAssessment);
    // setValue("section_two", updatedAssessment, { shouldValidate: true });
    setValue(key, value, { shouldValidate: true });
  };

  console.log(current_level)
  console.log(getValues("appa_r_officer") !== userData?.data?.STAFF_ID)
  return (
    <>
        <Card className="shadow-sm my-4">
          <div className="p-2">
          <p className="text-[15px] my-auto font-normal  px-4 text-default-600">
              PRELIMINARY ASSESSMENT
            </p>
          </div>
          <hr />
          <CardBody className=" w-full p-4">
            {[
              {
                text: "Discuss strengths displayed by appraisee and mention weakness identified",
                  key:"employee_strength"
              },
              {
                text: "Did you raise these points or the appraisee raised them?",
                   key:"employee_awareness"
              },
              {
                text: "What was the employee's reaction to your comments on these points?",
                 key: "employee_reaction"
              },
              {
                text: "What steps do you think should be taken to help the appraisee overcome the identified weakness and build on the identified strengths?",
                 key:"help_appraisee"
              },
            ]?.map((item, index) => (
              <div
                key={index + "___part_2"}
                className="rid md:rid-cols-5 items-cente gap-4 my-4"
              >
                <div className="col-span-2">
                  <p className="ms-2 font-Roboto">
                    <span className="mr-2">{index + 1}.</span>
                    <span>{item?.text}</span>
                  </p>
                </div>
                <div className="col-span-3">
                <Input.TextArea
                  placeholder="..."
                  value={watch(item.key)}
                  onChange={(e) => handleTextAreaChange(item.key, e.target.value)}
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  status={formState.errors?.[item.key] === ""?  "error": ""}
                />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
    </>
  )
}

export default T1_PreliminaryAssessmentSection