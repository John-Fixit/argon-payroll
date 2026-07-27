/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
import Separator from "../payroll_components/Separator";
export default function NewTrainingForm({ role }) {
  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <Separator separator_text={"Course Details"}/>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Training Type</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Local Training"}>Local Training</SelectItem>
                  <SelectItem value={"Foreign Training"}>Foreign Training</SelectItem>
                </Select>
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Estimated Budget</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder="estimated budget"
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Title</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder="title"
                  labelPlacement="outside"
                />
              </div>
              <div className=" flex flex-col space-y-1">
                <label htmlFor="">Start Date</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder="Training organiser"
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Training Description</label>
                <Textarea
                    variant={"bordered"}
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    className="w-full"
                  />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Period in days</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Training Status</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Completed"}>Completed</SelectItem>
                  <SelectItem value={"Not completed"}>Not completed</SelectItem>
                  <SelectItem value={"Hold"}>Hold</SelectItem>
                </Select>
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">End Date</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                  disabled
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Trainer</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Directorate</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"DG Office"}>DG Office</SelectItem>
                  <SelectItem value={"Directorate of AirWorthiness standard"}>Directorate of AirWorthiness standard</SelectItem>
                  <SelectItem value={"Directorate of Aviation security"}>Directorate of Aviation security</SelectItem>
                  <SelectItem value={"Directorate of Cooperate services"}>Directorate of Cooperate services</SelectItem>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Venue</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Department</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                  selectionMode="multiple"
                  isMultiline={true}
                >
                  <SelectItem value={"Legal Services"}>Legal Services</SelectItem>
                  <SelectItem value={"Company Secretary"}>Company Secretary</SelectItem>
                  <SelectItem value={"Aviation Security"}>Aviation Security</SelectItem>
                  <SelectItem value={"Navigational Aids Flight Inspection and Surveilence(NAFIS)"}>Navigational Aids Flight Inspection and Surveilence(NAFIS)</SelectItem>
                  <SelectItem value={"Internal Audit"}>Internal Audit</SelectItem>
                  <SelectItem value={"Information Communication & Technology(ICT)"}>Information Communication & Technology(ICT)</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="training_fee flex flex-col space-y-1">
                <label htmlFor="training_fee">Training Fee</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button size="md" className={"bg-red-500"}>
                Close
              </Button>

              <Button size="md" className="bg-[#00bcc2]">
                Save Training
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
NewTrainingForm.propTypes = {
  role: PropType.string,
};