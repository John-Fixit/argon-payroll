/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function TrainingReportForm({ role }) {
  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Report Category</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"By Staff"}>By Staff</SelectItem>
                  <SelectItem value={"By Directorates"}>
                    By Directorates
                  </SelectItem>
                  <SelectItem value={"By Departments"}>
                    By Departments
                  </SelectItem>
                  <SelectItem value={"By Grade Levels"}>
                    By Grade Levels
                  </SelectItem>
                  <SelectItem value={"By Region"}>By Region</SelectItem>
                </Select>
              </div>
              <div className="training_location flex flex-col space-y-1">
                <label htmlFor="">Training Location</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Local"}>Local</SelectItem>
                  <SelectItem value={"Foreign"}>Foreign</SelectItem>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Training Year</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"2020"}>2020</SelectItem>
                  <SelectItem value={"2021"}>2021</SelectItem>
                  <SelectItem value={"2022"}>2022</SelectItem>
                  <SelectItem value={"2023"}>2023</SelectItem>
                  <SelectItem value={"2024"}>2024</SelectItem>
                </Select>
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Training Month</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"All"}>All</SelectItem>
                  <SelectItem value={"January"}>January</SelectItem>
                  <SelectItem value={"February"}>February</SelectItem>
                  <SelectItem value={"March"}>March</SelectItem>
                  <SelectItem value={"April"}>April</SelectItem>
                  <SelectItem value={"May"}>May</SelectItem>
                  <SelectItem value={"June"}>June</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flex flex-col space-y-1">
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
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Training Status</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Has Training"}>Has Training</SelectItem>
                  <SelectItem value={"No Training"}>No Training</SelectItem>
                 
                </Select>
              </div>
            </div>
           
            <div className="flex justify-end space-x-3">
              <Button size="md" className={"bg-red-500"}>
                Close
              </Button>

              <Button size="md" className="bg-[#00bcc2]">
                Get Report
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
TrainingReportForm.propTypes = {
  role: PropType.string,
};
