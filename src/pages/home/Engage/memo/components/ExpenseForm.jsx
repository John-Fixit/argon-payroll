/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Input,
  Button,
  Select,
  SelectItem,
  Checkbox,
  Tooltip,
  Textarea,
} from "@nextui-org/react";
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

export default function ExpenseForm() {
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

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const handleSubmitExpose = () => {
    // console.log("This submit the expose");
  };

  return (
    <>
      <div className="pr-3">
        <Separator separator_text={"Expense"} />
        <form className="my-4">
          <div className="my-2">
            <Textarea
              variant={"bordered"}
              label="Description"
              radius="sm"
              labelPlacement="outside"
              placeholder=""
              className="col-span-12 md:col-span-6"
              classNames={{
                inputWrapper: [
                  "outline-none",
                  "border-1",
                  "shadow-none",
                ],
              }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="my-[1rem]">
              <Input
                type="text"
                variant="underlined"
                label="Amount"
                classNames={{
                  inputWrapper: [
                    "outline-none",
                    "border-b-[1.999px]",
                    "shadow-none",
                  ],
                }}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="my-2 flex flex-col my-2 gap-1">
              <label htmlFor="">Date</label>
              <DatePicker
                onChange={onChange}
                className="w-full border-b border-0 py-2 rounded-none focus:outline-none"
              />
            </div>
          </div>
          {/* add expense */}
          <div className="_compose_submit flex justify-end mt-3">
            <Button
              color="primary"
              radius="sm"
              size={"sm"}
              isLoading={isLoading}
              className="font-Exotic"
              onClick={handleAddExpense}
              startContent={<HiMiniPlus size="1.2rem" />}
            >
              Add
            </Button>
          </div>

          {/* Expense table */}
          {expenses?.length ? <ExpenseTable rows={expenses} /> : ""}

          {expenses?.length ? (
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
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
}
