/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import { options, reasons } from "./data";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  Textarea,
} from "@nextui-org/react";
import { DatePicker } from "antd";
import Label from "../forms/FormElements/Label";
import Input from "../forms/FormElements/Input";
import Select from "react-tailwindcss-select";

const DisciplineForm = ({
  disciplineInformation,
  setDisciplineInformation,
  setSelectedTab,
  isOpen,
  setIsOpen,
}) => {
  const [hasToReport, setHasToReport] = useState(false);

  const handleReportDateChange = (date) => {
    // console.log(date);
    setDisciplineInformation((prev) => {
      return { ...prev, report_date: date };
    });
  };

  //Submitting DisciplineForm
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      disciplineInformation.title == "" ||
      disciplineInformation.description == "" ||
      disciplineInformation.status == "" ||
      disciplineInformation.employee == ""
    ) {
      alert("The first part of this field must be filled");
    } else {
      // console.log(disciplineInformation);
      setDisciplineInformation({
        title: "",
        description: "",
        status: "",
        employee: "",
        official: "",
        report_date: "",
        attachments: [],
        note: "",
      });
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className="w-full bg-white p-8">
        {/* <input type="text" className="border rounded-md  flex-1  focus:border-transparent px-2 py-2 border-slate-200 focus:outline-none focus:ring-1 my-4" /> */}
        <div className="py-4">
         <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
                <Label htmlFor="duration">
                  Title
                </Label>
                <div className="w-full rounded-sm md:col-span-2">
            <Select
              className="w-full rounded-sm md:col-span-2"
              options={options}
              value={[disciplineInformation.title]}
              onChange={(value) => {
                setDisciplineInformation((prev) => {
                  return { ...prev, title: value };
                });
              }}
            />
                </div>
              </div>
              <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-1 border-b pb-4">
          <Label>Description</Label>
            <Textarea
              radius="sm"
              minRows={5}
              className="w-full md:col-span-2"
              value={[disciplineInformation.description]}
              classNames={{
                inputWrapper:
                  "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
              }}
              onChange={(e) => {
                setDisciplineInformation((prev) => {
                  return { ...prev, description: e.target.value };
                });
              }}
            ></Textarea>
              </div>

<div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
                <Label htmlFor="duration">
                  Status
                </Label>
                <div className="w-full rounded-sm md:col-span-2">
            <Select
              options={options}
              value={disciplineInformation.status}
              onChange={(value) => {
                setDisciplineInformation((prev) => {
                  return { ...prev, status: value };
                });
              }}
            />
                </div>
              </div>
<div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
                <Label htmlFor="duration">
                  Employee
                </Label>
                <div className="w-full rounded-sm md:col-span-2">
            <Select
              options={options}
              placeholder="Select"
              value={disciplineInformation.employee}
              onChange={(value) => {
                setDisciplineInformation((prev) => {
                  return { ...prev, employee: value };
                });
              }}
            />
                </div>
              </div>
          <div className="flex items-center my-6">
            <Checkbox size="sm" onValueChange={() => setHasToReport(!hasToReport)} />
            <p className="text-sm text-gray-400">Check if the person will have to report</p>
          </div>
          {hasToReport && (
            <div className="">
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
                <Label htmlFor="duration">
                  Official
                </Label>
                <div className="w-full rounded-sm md:col-span-2">
            <Select
              options={options}
              placeholder="Select whom to report to"
              value={disciplineInformation.official}
              onChange={(value) => {
                setDisciplineInformation((prev) => {
                  return { ...prev, official: value };
                });
              }}
            />
                </div>
              </div>
              <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
                <Label htmlFor="duration">
                  Report Date
                </Label>
          
                <DatePicker
                  onChange={(e) => handleReportDateChange(e.$d)}
                  className="w-full border md:col-span-2 outline-none focus:border-transparent h-10 rounded-md focus:outline-none mt-2"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" size="sm" className="rounded-sm shadow font-helvetica" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default DisciplineForm;

DisciplineForm.propTypes = {
  setDisciplineInformation: PropTypes.func,
  disciplineInformation: PropTypes.object,
  // setSelectedTab:PropTypes.func,
  // isOpen:PropTypes.bool,
  // setIsOpen: PropTypes.func
};
