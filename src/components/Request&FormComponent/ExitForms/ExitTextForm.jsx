/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import 'react-datepicker/dist/react-datepicker.css'
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { DatePicker, Select as AntSelect } from "antd";
import { leaveReasons } from "./data";
import Label from "../../forms/FormElements/Label";
import Select from "react-tailwindcss-select";

export default function ExitTextForm({ exitInformation, setExitInformation }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (exitInformation.type == "" || exitInformation.date == "") {
      alert("Every input in this field must be filled");
    } else {
      // console.log(exitInformation);
    }
  };

  return (
    <div className="grid gap-2 w-full p-8 bg-white rounded shadow">
      {/* <h2 className="text-[22px] font-normal text-[#212529] mb-4">
        Add
      </h2> */}
      {/* <form action="" onSubmit={handleSubmit} className="z-[9999]"> */}
      <div className="z-[9999]">
        <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
          <Label htmlFor="name">Reason for leaving</Label>
          <div className="w-full md:col-span-2">
          
            <Select
              options={leaveReasons}
              value={exitInformation.reason}
              isSearchable={true}
              

              onChange={(value) => {
                setExitInformation((prev) => {
                  return { ...prev, reason: value };
                });
              }}
            />
          </div>
        </div>
        <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
          <Label>Exit Date</Label>
          <DatePicker
            className=" md:col-span-2 w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            onChange={(e) => {
              setExitInformation((prev) => {
                return { ...prev, date: e.$d };
              });
            }}
          />
        </div>
        {/* <div className="flex justify-end">
          <Button
          type='submit'
            color="primary"
            className="rounded-md font-helvetica shadow"
          >
            Submit
          </Button>
        </div> */}
      </div>
    </div>
  );
}
