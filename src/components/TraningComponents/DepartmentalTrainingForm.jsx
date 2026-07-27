/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function DepartmentalTrainingForm({ role }) {

  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="training_location flex flex-col space-y-1">
                <label htmlFor="location">Training Location</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Local"}>Local</SelectItem>
                  <SelectItem value={"Foreign"}>Foreign</SelectItem>
                </Select>
              </div>
              <div className="training_type flex flex-col space-y-1">
                <label htmlFor="">Training Type</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"General Training"}>
                    General Training
                  </SelectItem>
                  <SelectItem value={"Seminar"}>Seminar</SelectItem>
                  <SelectItem value={"Workshop"}>Workshop</SelectItem>
                  <SelectItem value={"Conference"}>Conference</SelectItem>
                  <SelectItem value={"Fellowship"}>Fellowship</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="course_name flex flex-col space-y-1">
                <label htmlFor="coursr_name">Course Name</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder="Course Name"
                  labelPlacement="outside"
                />
              </div>
              <div className="training_organiser flex flex-col space-y-1">
                <label htmlFor="training_organiser">Training Organiser</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder="Training organiser"
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="training_obj flex flex-col space-y-1">
                <label htmlFor="training_obj">Training Objective</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
              <div className="training_venue flex flex-col space-y-1">
                <label htmlFor="training_venue">Training venue</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="training_state flex flex-col space-y-1">
                <label htmlFor="state">Training state</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"FCT Abuja"}>FCT ABuja</SelectItem>
                  <SelectItem value={"ABIA"}>ABIA</SelectItem>
                  <SelectItem value={"ADAMAWA"}>ADAMAWA</SelectItem>
                  <SelectItem value={"AKWA IBOM"}>AKWA IBOM</SelectItem>
                  <SelectItem value={"ANAMBRA"}>ANAMBRA</SelectItem>
                  <SelectItem value={"BAUCHI"}>BAUCHI</SelectItem>
                </Select>
              </div>
              <div className="training_type flex flex-col space-y-1">
                <label htmlFor="">Training within NCAA Premises</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"No"}>No</SelectItem>
                  <SelectItem value={"Yes"}>Yes</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="department flex flex-col space-y-1">
                <label htmlFor="department">Department</label>
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
              <div className="staff_grade flex flex-col space-y-1">
                <label htmlFor="">Select Staff Grade</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"3"}>3</SelectItem>
                  <SelectItem value={"4"}>4</SelectItem>
                  <SelectItem value={"5"}>5</SelectItem>
                  <SelectItem value={"6"}>6</SelectItem>
                  <SelectItem value={"7"}>7</SelectItem>
                  <SelectItem value={"8"}>8</SelectItem>
                  <SelectItem value={"9"}>9</SelectItem>
                  <SelectItem value={"10"}>10</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="select_staff col-span-3 flex flex-col space-y-1">
                <label htmlFor="state">Select Staff</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={""}></SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="start_date flex flex-col space-y-1">
                <label htmlFor="start_date">Start Date</label>
                <Input
                  type="date"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
              <div className="end_date flex flex-col space-y-1">
                <label htmlFor="end_date">End Date</label>
                <Input
                  type="date"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
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
                Create Training
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
DepartmentalTrainingForm.propTypes = {
  role: PropType.string,
};
