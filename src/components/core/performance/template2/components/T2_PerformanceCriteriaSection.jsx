/* eslint-disable react/prop-types */
import { Card, CardBody, } from "@nextui-org/react"
import { Radio } from "antd";
import PropTypes from "prop-types";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
// import { useEffect, useState } from "react";
const T2_PerformanceCriteriaSection = ({
  setValue,
  getValues,
  watch,
  isApprovalPage,
   current_level
  
}) => {

  const {userData} = useCurrentUser()
  // const [jobPerformanceAppraisalRanks, setJobPerformanceAppraisalRanks] = useState(watch("job_performance_appraisal_ranks") || Array(10).fill(""));

  // console.log(getValues("job_performance_appraisal_ranks"))

  // useEffect(() => {
  //   setValue("job_performance_appraisal_ranks", jobPerformanceAppraisalRanks, { shouldValidate: true, shouldTouch: true });
  // }, [setValue, jobPerformanceAppraisalRanks]);


  // useEffect(() => {
  //   const currentValues = watch("job_performance_appraisal_ranks") || [];
  //   setJobPerformanceAppraisalRanks(currentValues);
  // }, [watch]);



const handleRanksTextAreaChange = (index, value) => {
  const updatedAssessment = getValues("report_rating_ranks");
  updatedAssessment[index] = value;

    setValue("report_rating_ranks", updatedAssessment, { shouldValidate: true, });
  };


  const sections = [
    { title: "A.  JOB KNOWLEDGE/EXPERIENCE",
      subtitle: "Consider the extent to which the employee possesses the experience  required for the job. Overall knowledge of job routine, competence and/or technical ability."
    },
    { 
      title: "JOB PERFORMANCE",
      subtitle: "Consider proficiency in major related skills and work output, especially quality of work and ability to keep to deadlines. "
    },
    { 
      title: "ATTITUDE TO WORK",
      subtitle: "Consider willingness and promptness in carrying out assigned work."
    },
    { 
      title: "TEAM WORK",
      subtitle: "Consider how well the appraisal relates to his/her colleagues and supervisors."
    },
    { 
      title: "HUMAN RELATIONS",
      subtitle: "Consider ability to relate well with both internal and external parties."
    },
    // { 
    //   title: "JOB KNOWLEDGE",
    //   subtitle: "Consider his/her grasp and overall knowledge of the organization/authority as it relates to his/her assignment."
    // },
    // { 
    //   title: "LEVEL OD KNOWLEDGE",
    //   subtitle: "Consider his/her knowledge, his/her fundamentals and skills on the job."
    // },
    { 
      title: "SAFETY CONSCIOUSNESS",
      subtitle: "Consider ability to take measures for own and others' safety, company's property, mails and packages and equipments. Ability to follow techinical rules and instructions."
    },
    { 
      title: "COST CONSCIOUSNESS",
      subtitle: "Ability to keep down expenditure and maintain quality without impairing efficiency."
    },
    { 
      title: "INITIATIVE & MENTAL ALERTNESS",
      subtitle: "Consider ability to learn quickly, develop a retentive memory, solve problems with imagination and vision and to try out new ideas and procedures. Also consider ability to take independent actions as required by the job"
    },
    // { 
    //   title: "COPERATION",
    //   subtitle: "Consider how good his/her ability to exercise reasonable care at all times."
    // },
    // { 
    //   title: "MENTAL ALERTNESS",
    //   subtitle: "Consider ability to learn quickly, develop a retentive memory, solve problems with imagination and vision and to try out new ideas and procedures."
    // },
    { 
      title: "PUNCTUALITY",
      subtitle: "Consider the extent to which this employee observe the company hours of work."
    },
    { 
      title: "REGULARITY AT WORK",
      subtitle: "Consider number of times employee is absent from work and frequency of sick leave."
    },
    { 
      title: "DRESSING AND GROOMING",
      subtitle: "Neatness and decency in dressing."
    },
    { 
      title: "SUPERVISORY ABILITY",
      subtitle: "Consider ability to secure higher productivity from subordinates and ability to work effectively with little or no supervision."
    },
  ]



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
                    <div className="rid rid-cols-2 flex flex-col gap-2 my-5">
                    <p className="text-zinc-500">{item?.subtitle}</p>
                  <Radio.Group
                  classNames={{
                    wrapper: ["flex justify- gap-5 ms-2"]
                  }}
                  className="flex space-x-4" orientation="horizontal"
                  onChange={(e) => handleRanksTextAreaChange(index, e.target.value)}
                  disabled={(isApprovalPage && current_level !== "reporting officer" && getValues("appa_r_officer") !== userData?.data?.STAFF_ID) || current_level !== "reporting officer" }
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

T2_PerformanceCriteriaSection.propTypes = {
  register: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onNext: PropTypes.func,
};

export default T2_PerformanceCriteriaSection