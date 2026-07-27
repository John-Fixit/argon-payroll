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
            <p>Are you sure you want to Run Thirteenth Month/Productivity Salary on January, 2024 ?</p>
            <div className="flex justify-end space-x-3">
              <Button size="md" className={"bg-red-500"}>
                Cancel
              </Button>

              <Button size="md" className="bg-[#00bcc2]">
                Run
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}