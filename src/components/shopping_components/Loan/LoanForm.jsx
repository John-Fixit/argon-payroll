/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Select, SelectItem,Input, Textarea } from "@nextui-org/react";
import { DatePicker } from "antd";

const LoanForm = ({newLoan, setNewLoan,}) => {

const loanType=[
{name:'Small Business Loans'},
{name:'Personal Loan'},
{name:'Debt Consolidation Loans'},
{name:'Home Equity Loans'},
{name:'Refinance Loans'},
]
const rates=[
{name:'10%'},
{name:'20%'},
{name:'30%'},
{name:'40%'},
{name:'50%'},
]
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newLoan.type == ""||newLoan.amount == ""||newLoan.interest_rate == ""||newLoan.cost == ""||newLoan.due_date == ""||newLoan.to == ""||newLoan.status == "") {
      alert("Every input in this field must be filled");
    } 
    else{
      // console.log(newLoan);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 m-6 md:m-8 md:px-6 pt-4">
   
                          <Select
            label='Loan Type'
            labelPlacement='outside'
            placeholder='type'
            className='w-full rounded-[0.375rem]'
            value={[newLoan.type]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewLoan((prev) => {
                return { ...prev, type: e.target.value };
              });
            }}
          >
            {loanType.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>

           <Input
            type="number"
            className=""
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            label="Amount"
            labelPlacement="outside"
            placeholder="amount"
            value={newLoan.amount}
            onChange={(e) => {
              setNewLoan((prev) => {
                return { ...prev, amount: e.target.value };
              });
            }}
          />
                          <Select
            label='Interest Rate'
            labelPlacement='outside'
            placeholder='rate'
            className='w-full rounded-[0.375rem]'
            value={[newLoan.interest_rate]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewLoan((prev) => {
                return { ...prev, interest_rate: e.target.value };
              });
            }}
          >
            {rates.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>

           <div>
            <label className=" text-sm mb-2" htmlFor="from">
              Due Date
            </label>
            <DatePicker
              onChange={(e) => {
                setNewLoan((prev) => {
                  return { ...prev, due_date: e.$d };
                });
              }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
          </div>
    

      <div className="flex justify-end md:col-span-2 mt-4">
       <Button
          type="submit"
          size="sm"
            color="success"
            className='text-white rounded'
          >
            Submit
          </Button>
      </div>
    </form>
  );
};

export default LoanForm;
