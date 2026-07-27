/* eslint-disable no-unused-vars */
import {
  Input,
  Button,
  Card,
  CardBody,
  RadioGroup,
  Radio,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Book } from "lucide-react";
import { useState } from "react";
import { DatePicker } from "antd";

import Label from "../../forms/FormElements/Label";
import TextArea from "../../forms/FormElements/TextArea";
import PeriodSection from "../../core/performance/template3/T3_PeriodSection";
import PreliminaryAssessmentSection from "../../core/performance/template3/T3_PreliminaryAssessmentSection";
import JobPerformanceSection from "../../core/performance/template3/T3_JobPerformanceSection";
import PerformanceCriteriaSection from "../../core/performance/template3/T3_PerformanceCriteriaSection";
import EmployeePotentialSection from "../../core/performance/template3/T3_EmployeePotentialSection";
import CommentByAppraiseOfficer from "../../core/performance/template3/T3_CommentByAppraiseOfficer";
import CounterSigningComment from "../../core/performance/template3/T3_CounterSigningComment";
import ReviewCommitee from "../../core/performance/template3/T3_ReviewCommitee";
import TrainingNeedSection from "../../core/performance/template3/T3_TrainingNeedSection";
import ReportingOfficer from "../../core/performance/ReportingOfficer";

export default function ApprasealForm() {
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
      <h2 className="text-[22px] font-normal text-[#212529] ">NEW APPRAISAL</h2>
      <form action="  gap-4">
        {/* section 1 */}
        <PeriodSection />
        {/* section 2 */}
        {/* <Card className="shadow-sm my-4">
          <h2 className="text-[17px] font-normal  px-4 text-[#212529] border-b">
            Highest Educational/Professional Qualification(s) with Dates.
          </h2>
          <CardBody className="p-4 w-full   ">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div
                key={index + "___qualifications"}
                className="grid md:grid-cols-2 gap-3"
              >
                <div className="p-2">
                  <Label>Qualification</Label>
                  <Input
                    type="text"
                    variant={"bordered"}
                    size="sm"
                    className="text-[rgb(33, 37, 41)] bg-[rgb(255, 255, 255)] font-[400] text-[15px]"
                    classNames={{
                      inputWrapper: [
                        "outline-none",
                        "border-[1px]",
                        "shadow-none",
                        "rounded-[0.375rem]",
                        "bg-white",
                        "py-0",
                        "h-[40px]",
                      ],
                      label: "z-1",
                    }}
                    startContent={
                      <Book
                        size={"20px"}
                        className="text-sm text-default-400 pointer-events-none flex-shrin"
                      />
                    }
                  />
                </div>
                <div className="w-full p-2">
                  <Label>Date:</Label>
                  <DatePicker size="large" className="w-full" />
                </div>
              </div>
            ))}
          </CardBody>
        </Card> */}

        <PreliminaryAssessmentSection />
        {/* section 3 */}
        <JobPerformanceSection
          jobKnowledge={jobKnowledge}
          handleJobKnowledgeChange={handleJobKnowledgeChange}
        />

        {/* section 4 */}
        <PerformanceCriteriaSection
          jobKnowledge={jobKnowledge}
          handleJobKnowledgeChange={handleJobKnowledgeChange}
        />

        {/* <StregnthAndWeaknessSection /> */}

        <EmployeePotentialSection
          jobKnowledge={jobKnowledge}
          handleJobKnowledgeChange={handleJobKnowledgeChange}
        />

        <CommentByAppraiseOfficer />
        <CounterSigningComment />
        <ReviewCommitee />
        <TrainingNeedSection />

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
