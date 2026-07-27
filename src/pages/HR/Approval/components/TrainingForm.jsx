/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Select, SelectItem,Input, Textarea } from "@nextui-org/react";
import { DatePicker } from "antd";

const TrainingForm = ({newTraining, setNewTraining,}) => {

const trainingLocations=[
{name:'Local'},
{name:'foreign'},
]
const trainingStates=[
{name:'FCT ABuja'},
{name:'ABIA'},
{name:'ADAMAWA'},
{name:'AKWA IBOM'},
{name:'ANAMBRA'},
{name:'BAUCHI'},
]
const trainingCourses=[
{name:'domain'},
{name:'domain'},
{name:'domain'},
{name:'domain'},
{name:'domain'},
{name:'domain'},
]
const departments=[
{name:'Legal Services'},
{name:'Company Secretary'},
{name:'Aviation Security'},
{name:'Navigational Aids Flight Inspection and Surveilence(NAFIS)'},
{name:'Internal Audit'},
{name:'Information Communication & Technology(ICT)'},
]
const grades=[
{name:'1'},
{name:'2'},
{name:'3'},
{name:'4'},
{name:'5'},
{name:'6'},
{name:'7'},
{name:'8'},
{name:'9'},
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
const staff=[
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
            label='Training Location'
            labelPlacement='outside'
            placeholder='location'
            className='w-full rounded-[0.375rem]'
            value={[newTraining.location]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, location: e.target.value };
              });
            }}
          >
            {trainingLocations.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
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
            label='Course Name'
            labelPlacement='outside'
            placeholder='course'
            className='w-full rounded-[0.375rem]'
            value={[newTraining.course]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, course: e.target.value };
              });
            }}
          >
            {trainingCourses.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
   
                          <Select
            label='Training Organiser'
            labelPlacement='outside'
            placeholder='organiser'
            className='w-full rounded-[0.375rem]'
            value={[newTraining.organiser]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, organiser: e.target.value };
              });
            }}
          >
            {trainers.map((method) => (
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
            label="Training Objective"
            labelPlacement="outside"
            placeholder="objective"
            value={newTraining.objective}
            onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, objective: e.target.value };
              });
            }}
          />
            <Input
            type="text"
            className=""
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            label="Training Venue"
            labelPlacement="outside"
            placeholder="venue"
            value={newTraining.venue}
            onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, venue: e.target.value };
              });
            }}
          />
            <Input
            type="text"
            className=""
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            label="training Fee"
            labelPlacement="outside"
            placeholder="fee"
            value={newTraining.fee}
            onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, fee: e.target.value };
              });
            }}
          />

                            <Select
            label='Training State'
            labelPlacement='outside'
            placeholder='state'
            className='w-full rounded-[0.375rem]'
            value={[newTraining.state]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, state: e.target.value };
              });
            }}
          >
            {trainingStates.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>

                            <Select
            label='Within Premises'
            labelPlacement='outside'
            placeholder='premises'
            className='w-full rounded-[0.375rem]'
            value={[newTraining.premises]}
             radius="sm"
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, premises: e.target.value };
              });
            }}
          >
              <SelectItem value='yes'>
               Yes
              </SelectItem>
              <SelectItem value='no'>
               No
              </SelectItem>
          </Select>
   
    
                          <Select
            label='Select Staff'
            labelPlacement='outside'
            placeholder='staff'
            className='w-full rounded-[0.375rem]'
            // selectionMode="multiple"
             radius="sm"
             value={[newTraining.staff]}
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, staff: e.target.value };
              });
            }}
          >
            {staff.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
                          <Select
            label='Select Department'
            labelPlacement='outside'
            placeholder='department'
            className='w-full rounded-[0.375rem]'
            // selectionMode="multiple"
             radius="sm"
             value={[newTraining.department]}
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, department: e.target.value };
              });
            }}
          >
            {departments.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
                          <Select
            label='Select grade'
            labelPlacement='outside'
            placeholder='grade'
            className='w-full rounded-[0.375rem]'
            // selectionMode="multiple"
             radius="sm"
             value={[newTraining.grade]}
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
                  onChange={(e) => {
              setNewTraining((prev) => {
                return { ...prev, grade: e.target.value };
              });
            }}
          >
            {grades.map((method) => (
              <SelectItem key={method.name} value={method.name}>
                {method.name}
              </SelectItem>
            ))}
          </Select>
          
          {/* <Input
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
          /> */}
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
          {/* <Textarea
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
          /> */}

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
