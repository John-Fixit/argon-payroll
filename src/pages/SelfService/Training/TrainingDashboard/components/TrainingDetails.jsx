/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, SelectItem, Textarea } from "@nextui-org/react";
import { DatePicker } from "antd";
import Label from "../../../../../components/forms/FormElements/Label";
import Input from "../../../../../components/forms/FormElements/Input";
import toast from "react-hot-toast";
import Select from "react-tailwindcss-select";
import { useState } from "react";

const TrainingDetails = () => {
  return (
    <form className="p-4 bg-white rounded shadow">
    <div className="my-4 grid grid-cols-1 md:grid-cols-3 items- gap-1 border-b pb-4">
      <Label htmlFor="duration font-bold">Name</Label>
      <div className="w-full md:col-span-2">
        <span>
            Amazon web services training for flight dispatch
        </span>
      </div>
    </div>
    <div className="my-4 grid grid-cols-1 md:grid-cols-3 items- gap-1 border-b pb-4">
      <Label htmlFor="duration font-bold">Name</Label>
      <div className="w-full md:col-span-2">
        <span>
            Amazon web services training for flight dispatch
        </span>
      </div>
    </div>
    <div className="my-4 grid grid-cols-1 md:grid-cols-3 items- gap-1 border-b pb-4">
      <Label htmlFor="duration font-bold">Name</Label>
      <div className="w-full md:col-span-2">
        <span>
            Amazon web services training for flight dispatch
        </span>
      </div>
    </div>












   

    


    <div className="flex mt-4 gap-4">
    
      <Button
        type="button"
        size="sm"
        
        // color="primary"
        className="text-white rounded font-helvetica bg-btnColor"
      >
        OK
      </Button>
    </div>
  </form>
  )
}

export default TrainingDetails













