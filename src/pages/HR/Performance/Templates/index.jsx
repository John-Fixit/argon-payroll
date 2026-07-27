// import React from 'react'

import { Edit2Icon } from "lucide-react";
import Header from "../../../../components/HrOperationComponent/Performance/TemplateHeader";
import { Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { DatePicker } from "rsuite";
import TemplateDrawer from "../../../../components/HrOperationComponent/Performance/TemplateDrawer";
import { BsBriefcaseFill } from "react-icons/bs";

const Template = () => {
const [isOpen, setIsOpen] = useState(false);
const [templateChosen, setTemplateChosen] = useState(false);
  const [value, setValue] = useState("Vacancy Title");
  const Items = [
    {
      label: "Vacancy Title",
      value: "Vacancy Title",
    },
    {
      label: "Date posted",
      value: "Date posted",
    },
  ];

  const selectValue = (incoming) => {
    setValue(incoming);
  };

  const close=()=>{
if (templateChosen) {
  setTemplateChosen(false)
}
  }

  return (
    <div className="my-8 font-helvetica font-normal" onClick={close}>
      <Header setIsOpen={setIsOpen} templateChosen={templateChosen} setTemplateChosen={setTemplateChosen}/>
      <div className="grid grid-cols-1 md:grid-cols-3 my-8 gap-6">
        <div className="flex flex-col gap-4  md:col-span-2">
          <div className="flex justify-between px-4 py-6 bg-white shadow rounded">
          <div className="flex gap-2 items-center text-green-400">
          <BsBriefcaseFill/>
            <p>Customer Care Call Center</p>
          </div>
            <Edit2Icon size={18} className="cursor-pointer" onClick={()=>setIsOpen(true)} />
          </div>
          <div className="flex justify-between px-4 py-6 bg-white shadow rounded">
          <div className="flex gap-2 items-center text-green-400">
          <BsBriefcaseFill/>
            <p>Business Analysts</p>
          </div>
            <Edit2Icon size={18} className="cursor-pointer" onClick={()=>setIsOpen(true)} />
          </div>
       
        </div>
        <div className="bg-white shadow rounded">
          <p className=" border-b px-4 mt-2">Filter</p>
          <div className="px-4 py-2">
            <Select
              size="sm"
              labelPlacement="outside"
              placeholder="Select"
              value={value}
              className="rounded-sm"
            >
              {Items.map((item, i) => (
                <SelectItem key={i} value={item.value} onClick={()=>selectValue(item.value)}>
                  {item.label}
                </SelectItem>
              ))}
            </Select>

           {value=='Vacancy Title'? <div className="relative my-4">
              <input
                type="text"
                name=""
                className="w-full py-2 ps-2 pe-8 text-sm outline-none rounded border"
                placeholder="search"
              />
            </div>: <div className="my-4 flex flex-col gap-4">
              <div>
                <label className="block  font-semibold" htmlFor="from">
                  Date from
                </label>
                <DatePicker
                  id="from"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block  font-semibold" htmlFor="to">
                  Date to
                </label>
                <DatePicker
                id="to"
                className="w-full"
                />
              </div>
            </div>} 
          </div>
        </div>
      </div>

      <TemplateDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  );
};

export default Template;
