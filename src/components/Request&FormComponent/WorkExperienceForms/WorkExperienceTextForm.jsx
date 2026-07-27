// import 'react-datepicker/dist/react-datepicker.css'
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { DatePicker } from "antd";

export default function WorkExperienceTextForm() {
  const [value, setValue] = useState("");

  const workTypes = [
    {
      label: "Regular",
      value: "Regular",
    },
    {
      label: "Armed Forces",
      value: "Armed Forces",
    },
  ];

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="grid gap-2 w-full p-8 ">
      <h2 className="text-[22px] font-normal text-[#212529] mb-4">
        Add Work Experience
      </h2>
      <form action="" className="z-[9999]">
        <div className="grid grid-cols-1 md:grid-cols-2 my-2">
          <label htmlFor="workType">Work Type</label>
          <Select
            id="workType"
            labelPlacement="outside"
            placeholder="Work Type"
            selectedKeys={[value]}
            className="max-w-xs rounded-sm"
            onChange={handleSelectionChange}
          >
            {workTypes.map((workType) => (
              <SelectItem key={workType.value} value={workType.value}>
                {workType.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="my-3">
          <label htmlFor="organisation">Organisation</label>
          <Input
            id="organisation"
            type="text"
            className="rounded-sm"
            labelPlacement="ouside"
          />
        </div>
        <div className="my-3">
          <label htmlFor="designation">Designation</label>
          <Input
            id="designation"
            type="text"
            className="rounded-sm"
            labelPlacement="ouside"
          />
        </div>
       <div className="my-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <label>Start Date</label>
        <DatePicker
              className=' w-full border-none bg-gray-100 hover:bg-gray-200 h-10 rounded-lg focus:outline-none'
            />
        </div>
        <div className="">
          <label>End Date</label>

         <DatePicker
              className=' w-full border-none bg-gray-100 hover:bg-gray-200 h-10 rounded-lg focus:outline-none'
            />
        </div>
       </div>
        <div className="  ">
          <Button
            color="success"
            className="my-4  text-white rounded"
            // onClick={handleAddNote}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
