/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, CardBody } from "@nextui-org/react"
import PropTypes from "prop-types"
import { Radio } from "antd"
import useCurrentUser from "../../../../hooks/useCurrentUser"

const T3_PerformanceCriteriaSection = ({register, setValue, getValues, formState, onNext, jobKnowledge, watch, current_level, isApprovalPage}) => {
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
            JOB PERFORMANCE (Reporting Officer should omit factors not applicable and tick the column that most accurately suites his/her rating)
              </p>
          <p className="text-[17px]  font-[400] text-zinc-500">
          RATING FACTORS: POOR(1), FAIR(2), GOOD(3), V. Good(4), EXCELLENT(5)
          </p>
          </div>
          <hr />
          <CardBody className=" w-full ">
              {
               [
                {
                  title: "A.   JOB KNOWLEDGE/EXPERIENCE",
                  desc: "Possession of information, and understanding of job Requirement.",
                  key_value: ""
                },
                {
                  title: "B.   ORGANIZATION",
                  desc: "Effectiveness in planning, controlling and completing tasks according to priority.",
                  key_value: ""
                },
                {
                  title: "C.   JOB SKILLS",
                  desc: "Proficiency in major job related skills .",
                  key_value: ""
                },
                {
                  title: "D.   INITIATIVE",
                  desc: "Ability to take independent actions as required by the Job: Self activating.",
                  key_value: ""
                },
                {
                  title: "E.   LEADERSHIP",
                  desc: "Skills in supervising, coaching and developing others; willingness to delegate",
                  key_value: ""
                },
                {
                  title: "F.   WORK RELATIONSHIP",
                  desc: "Effective in working with Other employees to accomplish objectives.",
                  key_value: ""
                },
                {
                  title: "G.    RELIABILITY/INTEGRITY",
                  desc: "Punctuality and regularity; Ability to protect confidential Information.",
                  key_value: ""
                },
                {
                  title: "H.   COMMUNICATION SKILLS",
                  desc: "Ability to present ideas and Information concisely and effectively, orally and in writing. Ability to listen to others and understand their views",
                  key_value: ""
                },
                {
                  title: "I.   PROBLEM SOLVING",
                  desc: "Possession of analytical and conceptual skills, creativity; ability to identify new opportunities.",
                  key_value: ""
                },
                {
                  title: "J.   DECISION MAKING",
                  desc: "Possession of sound judgment as reflected in results",
                  key_value: ""
                },
                {
                  title: "K.   MANAGERIAL POTENTIAL",
                  desc: "Ability to organize, delegate, ontrol; being aware of the costs, safety and political implication of decisions.",
                  key_value: ""
                },
                {
                  title: "L.   APPEARANCE",
                  desc: "Assess the rate at which where applicable employee has conformed with the Authority’s dress code.",
                  key_value: ""
                },
                {
                  title: "J.   COST CONSCIOUSNESS",
                  desc: "Ability to keep down expenditure and maintain Quality without impairing efficiency.",
                  key_value: ""
                },

               ].map((item, index)=>(
                <div key={index+"____performance_criteria"}>
                  <p className="text-sm text-zinc-500">{item?.title}</p>
                  <div className="md:ms-3 lg:ms-16">
                    <div className="rid rid-cols-2 flex flex-col gap-2 my-5">
                    <p className="text-zinc-500">{item?.desc}</p>
                    <Radio.Group 
                    
                    onChange={(e) => handleTextAreaChange(index, e.target.value)}
                    disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
                    value={watch("report_rating_ranks")[index]}
          
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

                </div>
               ))
              }


          </CardBody>
        </Card>
    </>
  )
}

T3_PerformanceCriteriaSection.propTypes = {
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
  current_level:PropTypes.any , 
  isApprovalPage: PropTypes.any,
  watch: PropTypes.func
}

export default T3_PerformanceCriteriaSection