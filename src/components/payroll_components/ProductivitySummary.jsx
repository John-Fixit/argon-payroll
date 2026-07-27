/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function ProductivitySummary() {
  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Select
                  variant="bordered"
                  label="Select Date"
                  className="max-w-xs"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Deduction"}>11/2020</SelectItem>
                  <SelectItem value={"Deduction"}>11/2023</SelectItem>
                  <SelectItem value={"Deduction"}>11/2021</SelectItem>
                  <SelectItem value={"Deduction"}>11/2019</SelectItem>
                  <SelectItem value={"Deduction"}>11/2022</SelectItem>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button size="md" className={"bg-red-500"}>
                Cancel
              </Button>

              <Button size="md" className="bg-[#00bcc2]">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}