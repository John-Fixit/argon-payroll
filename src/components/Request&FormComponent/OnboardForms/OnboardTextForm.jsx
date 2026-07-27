/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import PropTypes from "prop-types";
import Stepper from "../../ApprovalComponents/Stepper";
import {
  countries,
  employmentTypes,
  lgas,
  marital_status,
  professions,
  states,
  titles,
} from "./data";
import { DatePicker } from "antd";
import Label from "../../forms/FormElements/Label";
import Input from "../../forms/FormElements/Input";
import Select from "react-tailwindcss-select";

const OnboardTextForm = ({ userInformation, setUserInformation }) => {
  const [value, setValue] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const onChange = (nextStep) => {
    setCurrentStep(nextStep < 1 ? 1 : nextStep > 2 ? 2 : nextStep);
  };

  const onNext = () => onChange(currentStep + 1);
  const onPrevious = () => onChange(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(userInformation).some((value) => value == "")) {
      alert("Every input must be filled");
    } else {
      // console.log(userInformation);
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit} className="my-8 px-6 bg-white rounded shadow"> */}
      <div className="my-8 px-6 bg-white rounded shadow">
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
        {/* {
      currentStep==1?
        <div className="first_page my-4 flex flex-col gap-4">
          <Select
            label="Title"
            labelPlacement="outside"
            radius='sm'
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
            placeholder="title"
             selectedKeys={[userInformation.title]}
            className="rounded-sm"
            required
            onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,title:e.target.value}
    }
    )
  }}
          >
            {titles.map((title) => (
              <SelectItem key={title.name} value={title.name}>
                {title.name}
              </SelectItem>
            ))}
          </Select>
          <div className="grid md:grid-cols-2  gap-4">
            <Input
              type="text"
              className="rounded-sm "
              label="First Name"
              labelPlacement="outside"
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                }}
              placeholder=" first name"
              value={userInformation.first_name}
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,first_name:e.target.value}
    }
    )
  }}
            />
            <Input
              type="text"
              className="rounded-sm "
              label="Last Name"
              labelPlacement="outside"
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                }}
              placeholder=" last name"
              value={userInformation.last_name}
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,last_name:e.target.value}
    }
    )
  }}
            />
          </div>
          <div className="grid md:grid-cols-2  gap-4">
            <Input
              type="text"
              name="name"
              className="rounded-sm "
              label="Other Name"
              labelPlacement="outside"
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                }}
              placeholder="other name"
              value={userInformation.other_names}
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,other_names:e.target.value}
    }
    )
  }}
            />
            <Select
              label="Marital Status"
              labelPlacement="outside"
              radius="sm"
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="marital status"
              selectedKeys={[userInformation.marital_status]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,marital_status:e.target.value}
    }
    )
  }}
            >
              {marital_status.map((status) => (
                <SelectItem key={status.name} value={status.name}>
                  {status.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-2  gap-4">
            <Select
              label="Profession"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="profession"
               selectedKeys={[userInformation.profession]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,profession:e.target.value}
    }
    )
  }}
            >
              {professions.map((profession) => (
                <SelectItem key={profession.name} value={profession.name}>
                  {profession.name}
                </SelectItem>
              ))}
            </Select>
            <Input
              type="text"
              className="rounded-sm"
              label="Email"
              labelPlacement="outside"
              radius='sm'
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                }}
              placeholder="email"
              value={userInformation.email}
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,email:e.target.value}
    }
    )
  }}
            />
          </div>
          <div className="grid md:grid-cols-2  gap-4">
            <Input
              type="tel"
              className="rounded-sm "
              label="Phone Number"
              labelPlacement="outside"
            radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                }}
              placeholder="phone number"
              value={userInformation.phone_number}
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,phone_number:e.target.value}
    }
    )
  }}
            />
            <Input
              type="text"
              className="rounded-sm "
              label="Blood Group"
              labelPlacement="outside"
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                }}
              placeholder="blood group"
              value={userInformation.blood_group}
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,blood_group:e.target.value}
    }
    )
  }}
            />
          </div>
          <div className="grid md:grid-cols-2  gap-4">
            <Select
              label="Nationality"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="nationality"
             selectedKeys={[userInformation.nationality]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,nationality:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="State of Origin"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="State of Origin"
               selectedKeys={[userInformation.state_of_origin]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,state_of_origin:e.target.value}
    }
    )
  }}
            >
              {states.map((state) => (
                <SelectItem key={state.name} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Select
            label="LGA"
            labelPlacement="outside"
            radius='sm'
            classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
            placeholder="LGA"
            selectedKeys={[userInformation.lga]}
            className="rounded-sm"
            onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,lga:e.target.value}
    }
    )
  }}
          >
            {lgas.map((lga) => (
              <SelectItem key={lga.name} value={lga.name}>
                {lga.name}
              </SelectItem>
            ))}
          </Select>
          <div className="grid md:grid-cols-2  gap-4">
            <Select
              label="Residential State"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="Residential State"
               selectedKeys={[userInformation.residential_state]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,residential_state:e.target.value}
    }
    )
  }}
            >
              {states.map((state) => (
                <SelectItem key={state.name} value={state.name}>
                  {state.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Residential LGA"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="Residential LGA"
              selectedKeys={[userInformation.residential_lga]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,residential_lga:e.target.value}
    }
    )
  }}
            >
              {lgas.map((lga) => (
                <SelectItem key={lga.name} value={lga.name}>
                  {lga.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Textarea label="Residential Address"  value={userInformation.residential_address} onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,residential_address:e.target.value}
    }
    )
  }} labelPlacement="outside"
   radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                }} />
        </div>
        :
        <div className="second_page my-4 flex flex-col gap-4">
          <div className="grid md:grid-cols-2  gap-4">
             <Select
              label="Directorate"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="directorate"
              selectedKeys={[userInformation.directorate]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,directorate:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
             <Select
              label="Department"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="Department"
              selectedKeys={[userInformation.department]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,department:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-2  gap-4">
             <Select
              label="Unit"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="unit"
              selectedKeys={[userInformation.unit]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,unit:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
             <Select
              label="Designation"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="designation"
              selectedKeys={[userInformation.designation]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,designation:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-2  gap-4">
             <Select
              label="Grade Level"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="grade_level"
              selectedKeys={[userInformation.grade_level]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,grade_level:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
             <Select
              label="Step"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="step"
              selectedKeys={[userInformation.step]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,step:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
          </div>
          <div className="grid md:grid-cols-2  gap-4">
             <Select
              label="Employee Type"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="employee type"
              selectedKeys={[userInformation.employment_type]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,employment_type:e.target.value}
    }
    )
  }}
            >
              {employmentTypes.map((employmentType) => (
                <SelectItem key={employmentType.name} value={employmentType.name}>
                  {employmentType.name}
                </SelectItem>
              ))}
            </Select>
             <div>
                <label className=" text-sm mb-2" htmlFor="from">
                  Date of First Appointment
                </label>
                    <DatePicker
                onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,date_of_first_appointment:e.$d}
    }
    )
  }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
              </div>
          </div>
          <div className="grid md:grid-cols-2  gap-4">
           
             <div>
                <label className=" text-sm mb-2" htmlFor="from">
                  Date of First Arrival
                </label>
                    <DatePicker onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,date_of_first_arrival:e.$d}
    }
    )
  }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
              </div>
             <div>
                <label className=" text-sm mb-2" htmlFor="from">
                 Current Appointment Date
                </label>
                    <DatePicker onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,current_appointment_date:e.$d}
    }
    )
  }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
              </div>
          </div>
          <div className="grid md:grid-cols-2  gap-4">
           
             <div>
                <label className=" text-sm mb-2" htmlFor="from">
                  Date of Birth
                </label>
                    <DatePicker
                    onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,date_of_birth:e.$d}
    }
    )
  }}
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
              </div>
             <Select
              label="Office Region"
              labelPlacement="outside"
              radius='sm'
              classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
              placeholder="office region"
              selectedKeys={[userInformation.office_region]}
              className="rounded-sm"
              onChange={(e) => {
    setUserInformation(prev=>{
    return {...prev,office_region:e.target.value}
    }
    )
  }}
            >
              {countries.map((country) => (
                <SelectItem key={country.name} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      } */}
        {currentStep == 1 ? (
          <div className="first_page my-4">
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Title</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={titles}
                  placeholder="Select"
                  value={userInformation.title}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, title: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>First Name</Label>

              <Input
                type="text"
                className="w-full md:col-span-2"
                value={userInformation.first_name}
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, first_name: e.target.value };
                  });
                }}
              />
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Last Name</Label>

              <Input
                type="text"
                className="w-full md:col-span-2"
                value={userInformation.last_name}
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, last_name: e.target.value };
                  });
                }}
              />
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Other Names</Label>

              <Input
                type="text"
                className="w-full md:col-span-2"
                value={userInformation.other_names}
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, other_names: e.target.value };
                  });
                }}
              />
            </div>

            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Marital Status</Label>
              <div className="w-full rounded-sm md:col-span-2">
                <Select
                  options={marital_status}
                  placeholder="Select"
                  value={userInformation.marital_status}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, marital_status: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Profession</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={professions}
                  placeholder="Select"
                  value={userInformation.profession}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, profession: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Email</Label>

              <Input
                type="email"
                className="w-full md:col-span-2"
                value={userInformation.email}
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Phone Number</Label>

              <Input
                type="text"
                className="w-full md:col-span-2"
                value={userInformation.phone_number}
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, phone_number: e.target.value };
                  });
                }}
              />
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Blood Group</Label>

              <Input
                type="text"
                className="w-full md:col-span-2"
                value={userInformation.blood_group}
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, blood_group: e.target.value };
                  });
                }}
              />
            </div>

            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Nationality</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.nationality}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, nationality: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>State of Origin</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={states}
                  placeholder="Select"
                  value={userInformation.state_of_origin}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, state_of_origin: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Local Government</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={lgas}
                  placeholder="Select"
                  value={userInformation.lga}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, lga: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Residential States</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={states}
                  placeholder="Select"
                  value={userInformation.residential_state}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, residential_state: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Residential LGA</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={states}
                  placeholder="Select"
                  value={userInformation.residential_lga}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, residential_lga: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-1 border-b pb-4">
              <Label>Residential Address</Label>
              <Textarea
                minRows={5}
                value={userInformation.residential_address}
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, residential_address: e.target.value };
                  });
                }}
                className="md:col-span-2"
                classNames={{
                  inputWrapper:
                    "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",

                  label: "z-1",
                }}
              />
            </div>
          </div>
        ) : (
          <div className="second_page my-4">
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Directorate</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.directorate}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, directorate: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Department</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.department}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, department: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Unit</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.unit}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, unit: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Designation</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.designation}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, designation: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Grade Level</Label>
              <div className="w-full  md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.grade_level}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, grade_level: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Step</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.step}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, step: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Employment Type</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={employmentTypes}
                  placeholder="Select"
                  value={userInformation.employment_type}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, employment_type: value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Date of First Appointment</Label>
              <DatePicker
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, date_of_first_appointment: e.$d };
                  });
                }}
                className=" w-full md:col-span-2 border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
              />
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Date of First Arrival</Label>
              <DatePicker
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, date_of_first_arrival: e.$d };
                  });
                }}
                className=" w-full md:col-span-2 border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
              />
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Current Appointment Date</Label>
              <DatePicker
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, current_appointment_date: e.$d };
                  });
                }}
                className=" w-full md:col-span-2 border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
              />
            </div>
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Date of birth</Label>
              <DatePicker
                onChange={(e) => {
                  setUserInformation((prev) => {
                    return { ...prev, date_of_birth: e.$d };
                  });
                }}
                className=" w-full md:col-span-2 border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
              />
            </div>

            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Office Regioin</Label>
              <div className="w-full md:col-span-2">
                <Select
                  options={countries}
                  placeholder="Select"
                  value={userInformation.office_region}
                  onChange={(value) => {
                    setUserInformation((prev) => {
                      return { ...prev, office_region: value };
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}

        <div
          className={`flex ${
            currentStep == 1 ? "justify-end" : "justify-between"
          } my-4 gap-4`}
        >
          <button
            type="button"
            className={`bg-gray-400 hover:bg-gray-500 transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 ${
              currentStep == 1 && "hidden"
            }`}
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
            type="button"
            className={`bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-5 py-3 justify-self-end ${
              currentStep == 2 && "hidden"
            }`}
            onClick={onNext}
          >
            Next
          </button>
          <Button
            type="submit"
            color="success"
            className={`text-white rounded  ${currentStep == 1 && "hidden"}`}
          >
            Submit
          </Button>
        </div>
        {/* <div className={`flex justify-end my-4 gap-4`}>
          <button
          type='button'
            className={`bg-gray-400 hover:bg-gray-500 transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 ${
              currentStep == 1 && "hidden"
            }`}
            onClick={onPrevious}
          >
            Previous
          </button>
          <button
          type='button'
            className={`bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-5 py-3 justify-self-end ${
              currentStep == 2 && "hidden"
            }`}
            onClick={onNext}
          >
            Next
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OnboardTextForm;
OnboardTextForm.propTypes = {};
