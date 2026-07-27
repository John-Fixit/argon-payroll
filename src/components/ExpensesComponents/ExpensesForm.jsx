/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Textarea } from "@nextui-org/react";
import { DatePicker } from "antd";
import Label from '../forms/FormElements/Label';
import Input from '../forms/FormElements/Input';
import Select from 'react-tailwindcss-select';

const ExpensesForm = ({newExpenses, setNewExpenses,}) => {

const paymentMethods=[
{label:'Cheque',value:'Cheque'},
{label:'Cash',value:'Cash'},
{label:'Transfer',value:'Transfer'},
]
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newExpenses.item == ""||newExpenses.description == ""||newExpenses.amount == ""||newExpenses.date == ""||newExpenses.purchased_from == ""||newExpenses.purchased_by == ""||newExpenses.paid_by == "") {
      alert("Every input in this field must be filled");
    } 
    else{
      // console.log(newExpenses);
    }
    //  if(newExpenses.approvals.length>1) {
    // if(confirmApproval){
    //   setSelectedTab(3)
    // }
    // }
    //  if(newExpenses.note=='') {
    // if(confirmNote){
    //   setSelectedTab(2)
    // }
    // }
    //  if(newExpenses.attachments.length>1) {
    // if(confirmAttachment){
    //   setSelectedTab(1)
    // }
    // }
  };

  return (
    // <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 md:p-8">
  //   <div className="bg-white shadow rounded p-6 md:p-8">
  //  <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
  //         <Label htmlFor="name">Item Name</Label>       
  //         <Input
  //           type="text"
  //           className='w-full md:col-span-2'
  //           value={newExpenses.item}
  //           onChange={(e) => {
  //             setNewExpenses((prev) => {
  //               return { ...prev, item: e.target.value };
  //             });
  //           }}
  //         />
  //       </div>
  //  <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
  //         <Label htmlFor="name">Purchased from</Label>       
  //         <Input
  //           type="text"
  //           className="w-full md:col-span-2"
  //           value={newExpenses.purchased_from}
  //           onChange={(e) => {
  //             setNewExpenses((prev) => {
  //               return { ...prev, purchased_from: e.target.value };
  //             });
  //           }}
  //         />
  //       </div>
          
  //         <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
  //           <Label>
  //             Purchase Date
  //           </Label>
  //           <div className="w-full md:col-span-2">
  //           <DatePicker
  //             onChange={(e) => {
  //               setNewExpenses((prev) => {
  //                 return { ...prev, date: e.$d };
  //               });
  //             }}
  //             className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
  //           />
  //           </div>
  //         </div>
  //         <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
  //         <Label>
  //         Purchased by
  //         </Label>
  //         <Input
  //           type="text"
  //           className='w-full md:col-span-2'
  //           value={newExpenses.purchased_by}
  //           onChange={(e) => {
  //             setNewExpenses((prev) => {
  //               return { ...prev, purchased_by: e.target.value };
  //             });
  //           }}
  //         />
  //         </div>
  //         <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
  //         <Label>
  //        Amount
  //         </Label>
  //         <Input
  //           type="number"
  //           className='w-full md:col-span-2'
  //           value={newExpenses.amount}
  //           onChange={(e) => {
  //             setNewExpenses((prev) => {
  //               return { ...prev, amount: e.target.value };
  //             });
  //           }}
          
  //         />
  //         </div>
  //         <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
  //         <Label>
  //        Paid by
  //         </Label>
  //         <div className='w-full md:col-span-2'>
  //                        <Select
  //                        options={paymentMethods}
  //           value={newExpenses.paid_by}
  //                 onChange={(value) => {
  //             setNewExpenses((prev) => {
  //               return { ...prev, paid_by: value };
  //             });
  //           }}
  //         />
  //         </div>
  //         </div>
  //         <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-1 border-b pb-4">
  //         <Label>Description</Label>
  //         <Textarea
  //         minRows={5}
  //           className="md:col-span-2"
  //           value={newExpenses.description}
  //                        classNames={{
  //                 inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
  //                 label: "z-1",
  //               }}
  //           onChange={(e) => {
  //             setNewExpenses((prev) => {
  //               return { ...prev, description: e.target.value };
  //             });
  //           }}
  //           labelPlacement="outside"
  //         />
  //         </div>

  //     {/* <div className="flex justify-end md:col-span-2">
  //      <Button
  //         type="submit"
  //         size="sm"
  //           color="primary"
  //           className='text-white rounded font-helvetica shadow'
  //         >
  //           Submit
  //         </Button>
  //     </div> */}
  //   </div>
    <div className="bg-white shadow rounded p-6 md:p-8">
   <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
          <Label htmlFor="name">Item Name</Label>
           <Input
            type="text"
            className='w-full md:col-span-2'
             value={newExpenses.item}
            onChange={(e) => {
              setNewExpenses((prev) => {
                return { ...prev, item: e.target.value };
              });
            }}
        />       
           {/* <div className='w-full md:col-span-2'>
                         <Select
                         options={paymentMethods}
            value={newExpenses.paid_by}
                  onChange={(value) => {
              setNewExpenses((prev) => {
                return { ...prev, expenses_type: value };
              });
            }}
          />
          </div> */}
        </div>

        <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
          <Label>
         Amount
          </Label>
          <Input
            type="number"
            className='w-full md:col-span-2'
            value={newExpenses.amount}
            onChange={(e) => {
              setNewExpenses((prev) => {
                return { ...prev, amount: e.target.value };
              });
            }}
          
          />
          </div>
          
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
            <Label>
              Date
            </Label>
            <div className="w-full md:col-span-2">
            <DatePicker
              onChange={(e) => {
                setNewExpenses((prev) => {
                  return { ...prev, date: e.$d };
                });
              }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
            </div>
          </div>

      <div className="flex justify-end md:col-span-2">
       <Button
          type="submit"
          size="sm"
            color="secondary"
            className='text-white rounded font-helvetica shadow'
            onClick={handleSubmit}
          >
            Submit
          </Button>
      </div>
    </div>
  );
};

export default ExpensesForm;
