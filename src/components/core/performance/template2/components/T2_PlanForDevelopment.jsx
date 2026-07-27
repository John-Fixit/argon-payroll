/* eslint-disable no-unused-vars */


import { Card, CardBody } from '@nextui-org/react'
import { Input } from 'antd';
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react';
import useCurrentUser from '../../../../../hooks/useCurrentUser';

const T2_PlanForDevelopment = ({
  register, setValue, getValues, watch, formState, onNext, current_level, isApprovalPage
  
}) => {
  const {userData} = useCurrentUser()
  // const [strenghtWeekness, setStrenghtWeekness] = useState(watch("strenghtAndWeekness") || {
  //   weakness: "",
  //   strenght: "",
  //   course: "",
  //   training_recommendation_purpose: "",
  // });

  // console.log(getValues("strenghtAndWeekness"))


  // // Sync local state with react-hook-form on mount
  // useEffect(() => {
  //   setValue("strenghtAndWeekness", strenghtWeekness, { shouldValidate: true });
  // }, [setValue, strenghtWeekness]);

  // // Sync watch updates with local state (optional for external updates)
  // useEffect(() => {
  //   const currentValues = watch("strenghtAndWeekness") || [];
  //   setStrenghtWeekness(currentValues);
  // }, [watch]);


  const handleTextAreaChange = (key, value) => {
    setValue(key, value, { shouldValidate: true });
  };


  return (
    <>
        <Card className="shadow-sm my-4">
          <div className="p-2">
            {/* <p className="text-[17px] font-medium my-auto px-4 text-zinc-500">
              PART 4
            </p> */}
            <p className="text-[15px] my-auto font-normal text-default-600 px-4">
            PLAN FOR DEVELOPMENT
              </p>
          </div>
          <hr />
          <CardBody className=" w-full p-4">
            {[
              {
                text: "What steps do you think shoulld be taken to help the appraisee to build on the strengths.",
                key: "strength_help",
              },
              {
                text: "What steps do you think shoulld be taken to help the appraisee to build on the weakness.",
                 key: "steps_to_overcome_weakness",
       
              },
              {
                text: "What training or development would you recomment to enable this employee to become more proficient in his/her present position or to carry wider or higher responsibilities?. Be specific and practical please.",
                  key: "training_recommendation",
              },
              {
                text: "What is the objective of the training and when do you think the employee should undergos the training?",
                key: "training_objective",
    
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
                  {
                    ...register(item.key, {
                      required:  "This field is required"
                    })
                  }
                  value={watch(item.key)}
                  status={formState.errors?.[item.key] === ""?  "error": ""}
                  onChange={(e) => {
                    handleTextAreaChange(item.key, e.target.value)}
                  } 
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                />
                </div>
              </div>
            ))}
          </CardBody>
        </Card>
    </>
  )
}

T2_PlanForDevelopment.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  current_level:PropTypes.any, 
  isApprovalPage: PropTypes.any
}
export default T2_PlanForDevelopment