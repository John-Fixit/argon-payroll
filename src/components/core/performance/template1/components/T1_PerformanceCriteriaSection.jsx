/* eslint-disable react/prop-types */
import { Card, CardBody, } from "@nextui-org/react"
import { Radio } from "antd";
import useCurrentUser from "../../../../../hooks/useCurrentUser";

const T1_PerformanceCriteriaSection = ({
  setValue,
  getValues,
  watch,
  current_level, isApprovalPage}) => {
  const sections = [
    { title: "A.  JOB KNOWLEDGE/EXPERIENCE",
      subtitle: "Consider the extent to which the employee possesses the experience  required for the job. Overall knowledge of job routine, competence and/or technical ability."
    },
    { 
      title: "JOB PERFORMANCE",
      subtitle: "Consider work output and quality of work and ability to keep to deadline."
    },
    { 
      title: "ATTITUDE TO WORK",
      subtitle: "Consider willingness and promptness in carrying out assigned work."
    },
    { 
      title: "TEAM WORK",
      subtitle: "Consider how well the appraisal relates to his/her colleagues and supervisors and the public."
    },
    { 
      title: "JOB KNOWLEDGE",
      subtitle: "Consider his/her grasp and overall knowledge of the organization/authority as it relates to his/her assignment."
    },
    { 
      title: "LEVEL OD KNOWLEDGE",
      subtitle: "Consider his/her knowledge, his/her fundamentals and skills on the job."
    },
    { 
      title: "SAFETY CONSCIOUSNESS",
      subtitle: "Consider ability to take measures for own and others' safety, company property, mails and packages and equipment. Ability to follow techinical rules and instructions."
    },
    { 
      title: "COPERATION",
      subtitle: "Consider how good his/her ability to exercise reasonable care at all times."
    },
    { 
      title: "MENTAL ALERTNESS",
      subtitle: "Consider ability to learn quickly, develop a retentive memory, solve problems with imagination and vision and to try out new ideas and procedures."
    },
    { 
      title: "PUNCTUALITY",
      subtitle: "Consider the extent to which this employee observe the company hours of work."
    },
    { 
      title: "REGULARITY AT WORK/HONESTY",
      subtitle: "Consider number of times employee is absent from work and frequency of sick leave. Also, consider his/her loyalty and forthrightness."
    },
    { 
      title: "DRESSING AND GROOMING",
      subtitle: "Neatness and decency in dressing."
    },
  ]

  const {userData} = useCurrentUser()




  const handleRanksTextAreaChange = (index, value) => {
    const updatedAssessment = getValues("report_rating_ranks");
    updatedAssessment[index] = value;
  
      setValue("report_rating_ranks", updatedAssessment, { shouldValidate: true, });
  };


  return (
    <>
          <Card className="shadow-sm my-4">
          <div className="p-4">
          {/* <p className="text-[17px] font-medium text-zinc-500">PART 2</p> */}
          
          <p className="text-[17px]  font-[400] text-zinc-500">
          RATING FACTORS: POOR(1), FAIR(2), GOOD(3), V. Good(4), EXCELLENT(5)
          </p>
          </div>
          <hr />
          <CardBody className=" w-full ">
              {
               sections?.map((item, index)=>(
                <div key={index+"____performance_criteria"}>
                  <p className="text-sm text-zinc-500">{item?.title}</p>
                  <div className="md:ms-3 lg:ms-16">
                     {/* //md:ms-3 */}
                    <div className="rid rid-cols-2  my-5">
                    {/* mb-10 mt-2 */}
                    <p className="text-zinc-500">{item?.subtitle}</p>
                    <Radio.Group disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" } onChange={(e) => handleRanksTextAreaChange(index, e.target.value)}
                        value={watch("report_rating_ranks")[index]}
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
                  </div>

                </div>
               ))
              }


          </CardBody>
        </Card>
    </>
  )
}

export default T1_PerformanceCriteriaSection