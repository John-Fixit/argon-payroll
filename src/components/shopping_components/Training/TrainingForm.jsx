/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Select, SelectItem,Input, Textarea } from "@nextui-org/react";
import { DatePicker } from "antd";

const TrainingForm = ({newTraining, setNewTraining,}) => {

const status=[
{name:'active'},
{name:'inactive'},
]
const trainingType=[
{name:'Node Training'},
{name:'Swift Training'},
{name:'Git Training'},
]
const trainers=[
{name:'Olaitan Okunade'},
{name:'Adeoye John'},
{name:'Emmanuel Oluwatayese'},
{name:'Akeem AbdulAzeez'},
]
const employees=[
{name:'Olaitan Okunade'},
{name:'Adeoye John'},
{name:'Emmanuel Oluwatayese'},
{name:'Akeem AbdulAzeez'},
{name:'John Doe'},
{name:'Alexis Nathan'},
{name:'Williams Beggar'},
{name:'Alexandra Nuel'},
]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTraining.type == ""||newTraining.description == ""||newTraining.trainer == ""||newTraining.cost == ""||newTraining.from == ""||newTraining.to == ""||newTraining.status == "") {
      alert("Every input in this field must be filled");
    } 
    else{
      // console.log(newTraining);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 m-6 md:m-8 md:px-6 pt-4">
   
                          <Select
            label='Training Type'
            labelPlacement='outside'
            placeholder='type'
            className='w-full rounded-[0.375rem]'
            value={[newTraining.type]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, type: e.target.value };
              });
            }}
          >
            {trainingType.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
   
                          <Select
            label='Trainer'
            labelPlacement='outside'
            placeholder='trainer'
            className='w-full rounded-[0.375rem]'
            value={[newTraining.trainer]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, trainer: e.target.value };
              });
            }}
          >
            {trainers.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
    
                          <Select
            label='Employees'
            labelPlacement='outside'
            placeholder='employees'
            className='w-full rounded-[0.375rem]'
            selectionMode="multiple"
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, employees: e.target.value };
              });
            }}
          >
            {employees.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
          
          <Input
            type="text"
            className=""
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            label="Cost"
            labelPlacement="outside"
            placeholder="cost"
            value={newTraining.cost}
            onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, cost: e.target.value };
              });
            }}
          />
          <div>
            <label className=" text-sm mb-2" htmlFor="from">
              Start Date
            </label>
            <DatePicker
              onChange={(e) => {
                setNewTraining((prev) => {
                  return { ...prev, from: e.$d };
                });
              }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
          </div>
          <div>
            <label className=" text-sm mb-2" htmlFor="from">
              End Date
            </label>
            <DatePicker
              onChange={(e) => {
                setNewTraining((prev) => {
                  return { ...prev, to: e.$d };
                });
              }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
          </div>
          <Textarea
          minRows={6}
            label="Description"
            className="md:col-span-2"
            placeholder="description"
            value={newTraining.description}
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
            labelPlacement="outside"
          />

                            <Select
            label='Status'
            labelPlacement='outside'
            placeholder='status'
            className='w-full rounded-[0.375rem] md:col-span-2'
            value={[newTraining.status]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, status: e.target.value };
              });
            }}
          >
            {status.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>

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

export default TrainingForm;
