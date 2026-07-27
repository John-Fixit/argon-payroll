/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Input, Button, Select, SelectItem, Chip } from "@nextui-org/react";
import Separator from "../../../../../components/payroll_components/Separator";
import { MdOutlineAttachment } from "react-icons/md";
import ExpenseTable from "./ExpenseTable";
import { HiMiniPlus } from "react-icons/hi2";
import { DatePicker, Space } from "antd";

const data = [
  {
    _id: 1,
    desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
    date: "2024-09-02",
    amount: "₦450,000",
  },
  {
    _id: 2,
    desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
    date: "2024-09-02",
    amount: "₦450,000",
  },
  {
    _id: 3,
    desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
    date: "2024-09-14",
    amount: "₦450,000",
  },
  {
    _id: 4,
    desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
    date: "2024-09-02",
    amount: "₦450,000",
  },
  {
    _id: 5,
    desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
    date: "2024-09-02",
    amount: "₦450,000",
  },
];

export default function TravelForm() {
  const employeeDept = [
    "Stella Ogbuefi 1",
    "Stella Ogbuefi 2",
    "Stella Ogbuefi 3",
  ];
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]); // [desc, amount, date]

  const handleAddExpense = () => {
    setIsLoading(true);
    // console.log(desc, amount, date);
    setExpenses([...expenses, { _id: expenses.length, desc, amount, date }]);
    setTimeout(() => {
      setIsLoading(false);
      setDesc("");
      setAmount("");
      setDate("");
    }, 500);
  };

  const handleSubmitExpose = () => {
    // console.log("This submit the expose");
  };

  return (
    <>
      <div className="pr-3">
        <Separator separator_text={"Travel Invoice"} />
        <form className="my-4">
          <div className="my-2">
            <Select
              label="Employee ID"
              variant="underlined"
              isRequired
              radius="none"
              classNames={{
                trigger: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "border-b-gray",
                  "shadow-none",
                ],
              }}
            >
              <SelectItem value={"1"}>Stella Ogbuefi 1</SelectItem>
              <SelectItem value={"2"}>Stella Ogbuefi 2</SelectItem>
              <SelectItem value={"3"}>Stella Ogbuefi 3</SelectItem>
            </Select>
          </div>
          <div className="my-2">
            <Select
              label="Employee Department"
              variant="underlined"
              selectionMode="multiple"
              radius="none"
              classNames={{
                trigger: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "border-b-gray",
                  "shadow-none",
                ],
              }}
            >
              {employeeDept.map((dept, index) => (
                <SelectItem key={index} textValue={dept}>
                  {dept}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid grid-cols md:grid-cols-2 gap-4 my-2">
            <div className="flex flex-col gap-1">
              <Input
              type="text"
              variant="underlined"
              label="Place of Visit"
              classNames={{
                inputWrapper: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "shadow-none",
                ],
              }}
            />
            </div>
            <div className="flex flex-col gap-1">
              <Input
              type="text"
              variant="underlined"
              label="Expected duration in days"
              classNames={{
                inputWrapper: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "shadow-none",
                ],
              }}
            />
            </div>
          </div>
          <div className="grid grid-cols md:grid-cols-2 gap-4 my-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Expected Date of departure</label>
              <DatePicker className="w-full border-b border-0 py-2 rounded-none focus:outline-none" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Expected Date of arrival</label>
              <DatePicker className="w-full border-b border-0 py-2 rounded-none focus:outline-none" />
            </div>
          </div>
          

          <div className="my-2">
            <Input
              type="text"
              variant="underlined"
              label="Expected duration in days"
              classNames={{
                inputWrapper: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "shadow-none",
                ],
              }}
            />
          </div>
          <div className="my-2">
            <Input
              type="text"
              variant="underlined"
              label="Purpose of Visit"
              classNames={{
                inputWrapper: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "shadow-none",
                ],
              }}
            />
          </div>
          <div className="my-2">
            <Input
              type="text"
              variant="underlined"
              label="Customer name"
              classNames={{
                inputWrapper: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "shadow-none",
                ],
              }}
            />
          </div>
          <div className="my-2">
            <Select
              label="Is billable to customer"
              variant="underlined"
              selectionMode="multiple"
              radius="none"
              classNames={{
                trigger: [
                  "outline-none",
                  "border-b-[1.999px]",
                  "border-b-gray",
                  "shadow-none",
                ],
              }}
            >
              {employeeDept.map((dept, index) => (
                <SelectItem key={index} textValue={dept}>
                  {dept}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="_compose_submit flex gap-3 justify-start mt-5">
            <Button
              color="primary"
              radius="sm"
              isLoading={isLoading}
              className="px-3 font-Exotic"
              onClick={handleSubmitExpose}
            >
              Submit
            </Button>
            <Button
              radius="sm"
              variant={"bordered"}
              isLoading={isLoading}
              className="px-3 font-Exotic"
              onClick={handleSubmitExpose}
            >
              Save Draft
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
