/* eslint-disable no-unused-vars */
import { Card, CardBody } from "@nextui-org/react"
import TextArea from "../../../forms/FormElements/TextArea"
import PropTypes from 'prop-types'
import { Input } from "antd"
import { useEffect, useState } from "react"
import useCurrentUser from "../../../../hooks/useCurrentUser"


const T4_StrengthAndWeaknessSection = ({
  register, setValue, getValues, watch, formState, onNext, current_level, isApprovalPage}) => {

    const {userData} = useCurrentUser()
  // const [strenghtWeekness, setStrenghtWeekness] = useState(watch("strenghtAndWeekness") || {
  //   weakness: "",
  //   weaknessCorrection: "",
  //   strenght: "",
  //   strenghtSuggestion: "",
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
        <div className="p-4">
          <p className="text-[17px] font-medium text-zinc-500">PART 5</p>
        
            <p className="text-[15px] my-auto font-normal text-default-600">
            EMPLOYEE’S STRENGTHS AND WEAKNESSES (To be completed by Reporting Officer)
              </p>
        
          </div>
          <hr />
          <CardBody className="px-6 w-full rid md:rid-cols2 gap-3">

              <div className="rid rid-cols-3 my-3">
                <div className="py-3">
                  <p className="text-gray-500">A. WEAKNESS(ES)</p>
                </div>
                <div className="col-span-2">
                <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  {
                    ...register("staff_weakness", {
                      required:  "This field is required"
                    })
                  } 
                  value={watch('staff_weakness')}
                  status={formState.errors?.staff_weakness === ""?  "error": ""}
                  onChange={(e) => {
                    register("staff_weakness").onChange(e);
                    handleTextAreaChange("staff_weakness", e.target.value)}
                  } 
                />
                </div>
              </div>
              <div className="rid rid-cols-3 my-3">
                <div className="py-3">
                  <p className="text-gray-500">And these can be corrected by doing the following:</p>
                </div>
                <div className="col-span-2">
                <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  value={watch('staff_weakness_correction')}
                  status={formState.errors?.staff_weakness_correction === ""?  "error": ""}
                  {
                    ...register("staff_weakness_correction", {
                      required: "This field is required"
                    })
                  }
                  onChange={(e) => handleTextAreaChange("staff_weakness_correction", e.target.value)}
                />
                </div>
              </div>
              <div className="rid rid-cols-3 my-3">
                <div className="py-3">
                  <p className="text-gray-500">B. STRENGTHS</p>
                </div>
                <div className="col-span-2">
                <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  value={watch('staff_strength')}
                  status={formState.errors?.staff_strength === ""?  "error": ""}
                  {
                    ...register("staff_strength", {
                      required: "This field is required"
                    })
                  }
                  onChange={(e) => handleTextAreaChange("staff_strength", e.target.value)}
                />
                </div>
              </div>
              <div className="rid rid-cols-3 my-3">
                <div className="py-3">
                  <p className="text-gray-500">And these can be further strengthened by doing the following;</p>
                </div>
                <div className="col-span-2">
                <Input.TextArea
                  placeholder="..."
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                  value={watch('staff_strength_enhancement')}
                  status={formState.errors?.staff_strength_enhancement === ""?  "error": ""}
                  {
                    ...register("staff_strength_enhancement", {
                      required: "This field is required"
                    })
                  }
                  onChange={(e) => handleTextAreaChange("staff_strength_enhancement", e.target.value)}
                />
                </div>
              </div>


          </CardBody>
        </Card>
    </>
  )
}
T4_StrengthAndWeaknessSection.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  watch: PropTypes.func.isRequired,
  onNext: PropTypes.func,
  current_level:PropTypes.any, 
  isApprovalPage:PropTypes.any
}
export default T4_StrengthAndWeaknessSection