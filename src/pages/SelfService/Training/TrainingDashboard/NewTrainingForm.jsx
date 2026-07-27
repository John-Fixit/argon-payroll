/* eslint-disable no-unused-vars */
import { useState } from "react";
// import Select from "react-tailwindcss-select";
import PropType from "prop-types";
import Input from "../../../../components/forms/FormElements/Input";
import Label from "../../../../components/forms/FormElements/Label";
import { DatePicker, Space, Select } from 'antd';
// import { Button } from "flowbite-react";

const options = [
  { value: "staff_origination", label: "Staff origination" },
  { value: "pick_from_marketplace", label: "Pick from marketplace" },
];

export default function NewTrainingForm() {
  const [trainingMethod, setTrainingMethod] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const handleChange = (value) => {
    // console.log("value:", value);
    setTrainingMethod(value);
  };


  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };
  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
              <Label>Training Method</Label>
              <div className="col-span-2">
                {/* <Select
                  variant="bordered"
                  labelPlacement="outside"
                  value={trainingMethod}
                  onChange={handleSelectionChange}
                  radius="sm"
                  label="Training Method"
                >
                  <SelectItem value={"staff_origination"}>
                    Staff origination
                  </SelectItem>
                  <SelectItem value={"pick_from_marketplace"}>
                    Pick from marketplace
                  </SelectItem>
                </Select> */}

                <Select
                  value={trainingMethod}
                  onChange={handleChange}
                  options={options}
                  style={{
                    width: "100%"
                  }}
                  placeholder="Select Training method"
                />
              </div>
            </div>

            {trainingMethod === "staff_origination" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>Training Location</Label>
                  <div className="col-span-2">
                    <Input type="text" placeholder="training location" />
                  </div>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>Training Location</Label>
                  <div className="col-span-2">
                    <Input type="text" placeholder="training location"/>
                  </div>
                </div> */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>
                    Training Type
                  </Label>
                  <div className="col-span-2">
                    <Select options={[
                      {label: "Seminar", value: "Seminar"},
                      {label: "Workshop", value: "Workshop"},
                      {label: "Conference", value: "Conference"},
                      {label: "Fellowship", value: "Fellowship"}
                    ]}
                    placeholder="Select Training Type"
                    style={{
                      width: "100%"
                    }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>Course Name</Label>
                  <div className="col-span-2">
                    <Input type="text" placeholder="Enter the course name"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>Training Venue</Label>
                  <div className="col-span-2">
                    <Input type="text" placeholder="Enter the training venue"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>
                    Training State
                  </Label>
                  <div className="col-span-2">
                    <Select isSearchable={true} options={[
                      {label: "Seminar", value: "Seminar"},
                      {label: "Workshop", value: "Workshop"},
                      {label: "Conference", value: "Conference"},
                      {label: "Fellowship", value: "Fellowship"},
                      {label: "Seminar", value: "Seminar"},
                      {label: "Workshop", value: "Workshop"},
                      {label: "Conference", value: "Conference"},
                      {label: "Fellowship", value: "Fellowship"},
                      {label: "Seminar", value: "Seminar"},
                      {label: "Workshop", value: "Workshop"},
                      {label: "Conference", value: "Conference"},
                      {label: "Fellowship", value: "Fellowship"}
                    ]} 
                    style={{
                      width: "100%"
                    }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>Start Date</Label>
                  <div className="col-span-2">
                  <DatePicker onChange={onChange} className="w-full py-[8px]"/>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                  <Label>End Date</Label>
                  <div className="col-span-2">
                  <DatePicker onChange={onChange} className="w-full py-[8px]"/>
                  </div>
                </div>
              </>
            ) : (
              trainingMethod === "pick_from_marketplace" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b py-[1rem] border-b-[rgb(233, 237, 242)]">
                    <Label>
                      Market Place
                    </Label>
                    <div className="col-span-2">
                      <Select options={options} style={{
                    width: "100%"
                  }}/>
                    </div>
                  </div>
                </>
              )
            )}
          </form>
        </div>
      </div>
    </>
  );
}
