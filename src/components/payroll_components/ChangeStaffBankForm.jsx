/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function ChangeStaffBankForm({ role }) {
  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Select
                  // size={'sm'}
                  variant="bordered"
                  label="Staff"
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
                  label="Bank"
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
                  label="Account No"
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
                {role === "create" ? "Save" : role === "edit" && `Update`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
ChangeStaffBankForm.propTypes = {
  role: PropType.string,
};
