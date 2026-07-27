/* eslint-disable no-unused-vars */

import TextArea from '../../../../forms/FormElements/TextArea'
import { Card, CardBody } from '@nextui-org/react'
import { Input } from 'antd';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import useCurrentUser from '../../../../../hooks/useCurrentUser';

const T2_PreliminaryAssessmentSection = ({register, setValue,  getValues, formState, watch, onNext, current_level, isApprovalPage}) => {
  // let sectionTwo = watch("section_two") || Array(4).fill("");
  const [sectionTwo, setSectionTwo] = useState(watch("section_two") || Array(4).fill(""));
  const {userData} = useCurrentUser()

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
      setValue(key, value, { shouldValidate: true });
    };




  return (
    <>
        <Card className="shadow-sm my-4">
          <div className="p-2">
            {/* <p className="text-[17px] font-medium my-auto px-4 text-zinc-500">
              PART 3
            </p> */}
            <p className="text-[15px] my-auto font-normal  px-4 text-default-600">
              PRELIMINARY ASSESSMENT
            </p>
          </div>
          <hr />
          <CardBody className=" w-full p-4">
            {[
              {
                text: "Include any other information, which is considered important in assessing the employees's performance, e.g character, interests, special abilities, health, training and educational courses taken on own initiative, etc",
                key:"employee_performance"
              },
              {
                text: "Discuss strengths displayed by appraisee and mention weaknesses identified.",
                    key:"employee_strength"
              },
              {
                text: "Did you raise these points (weakness & strengths) or the appraisee raised them?",
                         key:"employee_awareness"
              },
              {
                text: "What was the employee's reaction to your comments on these points?",
                key: "employee_reaction"
              },
              
            ]?.map((item, index) => (
              <div
                key={index + "___part_2"}
                className=" gap-4 my-4"
              >
                <div className="col-span-2">
                  <p className="ms-2 font-Roboto">
                    <span className="mr-2">2.{index + 1}</span>
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

T2_PreliminaryAssessmentSection.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  watch: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  current_level:PropTypes.any, 
  isApprovalPage: PropTypes.any
}
export default T2_PreliminaryAssessmentSection