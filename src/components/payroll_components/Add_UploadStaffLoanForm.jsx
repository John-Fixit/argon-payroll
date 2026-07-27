/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function Add_UploadStaffLoanForm() {

  return (
    <>
      <div className="py-4">
        <div className="shadow-sm w-full">
          <h1 className="px-4 py-2 bg-slate-600 text-gray-200">
            ADD / UPLOAD STAFF LOANS
          </h1>
          <form action="" className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Payroll Attribute"
                  variant="underlined"
                  placeholder="Payroll attribute name"
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Code name"
                  variant="underlined"
                  placeholder="Payroll Code name"
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
              <Select
            // size={'sm'}
            variant="bordered"
            label="Type" 
            className="max-w-xs" 
            labelPlacement="outside"
          >
              <SelectItem value={'Deduction'}>
                Deduction
              </SelectItem>
              <SelectItem value={'Deduction'}>
                Deduction
              </SelectItem>
              <SelectItem value={'Deduction'}>
                Deduction
              </SelectItem>
            
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
Add_UploadStaffLoanForm.propTypes = {
  
};
