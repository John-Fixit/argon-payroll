/* eslint-disable no-unused-vars */
import {
    Button,
  } from "@nextui-org/react";
  import { useState } from "react";
  import PeriodSection from "./components/PeriodSection";
  import PreliminaryAssessmentSection from "./components/PreliminaryAssessmentSection";
  import PerformanceCriteriaSection from "./components/PerformanceCriteriaSection";
  import EmployeePotentialSection from "./components/EmployeePotentialSection";
  import ReportingOfficer from "../../../core/performance/ReportingOfficer";
  
  export default function AppraisalTemplate1Form() {
    const [jobKnowledge, setJobKnowledge] = useState("");
  
    const handleJobKnowledgeChange = (value) => {
      setJobKnowledge(value);
    };
  
    const officers = [
      { label: "ADEBISI OLADIPUPO", value: "ADEBISI OLADIPUPO" },
      { label: "AARON DANIEL", value: "AARON DANIEL" },
      { label: "MOHAMMED ODUNOWO ", value: "MOHAMMED ODUNOWO " },
      { label: "ABDUL NASSA", value: "ABDUL NASSA" },
    ];


  
    return (
      <div className="grid  gap-2 w-full py-8 ">
        <h2 className="text-[22px] font-normal text-[#212529] ">NEW APPRAISAL TEMPLATE 1</h2>
        <form action="  gap-4">
          {/* section 1 */}
          <PeriodSection />

          {/* section 2 */}
          <PerformanceCriteriaSection
            jobKnowledge={jobKnowledge}
            handleJobKnowledgeChange={handleJobKnowledgeChange}
          />

          {/* section 3 */}  
          <PreliminaryAssessmentSection />


            {/* section 4 */}
          <EmployeePotentialSection
            jobKnowledge={jobKnowledge}
            handleJobKnowledgeChange={handleJobKnowledgeChange}
          />

          <ReportingOfficer />
  
          <div className="flex justify-end gap-3">
            <Button
              className="my-4 bg-red-500 text-white rounded"
              // onClick={handleAddNote}
            >
              Cancel
            </Button>
            <Button
              color="success"
              className="my-4  text-white rounded"
              // onClick={handleAddNote}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
  