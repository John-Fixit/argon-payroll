/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function AddSuspensionForm() {
  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Select
                  variant="bordered"
                  label="Type"
                  className="max-w-xs"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Select
                  // size={'sm'}
                  variant="bordered"
                  label="Has Expiry"
                  className="max-w-xs"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Textarea
                  maxRows={3}
                  label="Comment"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Enter your comment"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Select
                  variant="bordered"
                  label="Select Individual"
                  className="max-w-xs"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
                  <SelectItem value={"Deduction"}>Deduction</SelectItem>
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