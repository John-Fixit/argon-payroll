/* eslint-disable no-unused-vars */

import { Input } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function EditStaffForm({ staff, role }) {
  // console.log(staff);
  return (
    <>
      <div className="py-4">
        <div className="shadow-sm w-full">
          <form action="" className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Name"

                  variant="underlined"
                  placeholder="Bank name"
                  labelPlacement="outside"
                  defaultValue={staff?.staffName}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="NHF No"
                  variant="underlined"
                  placeholder="Bank Code"
                  labelPlacement="outside"
                  defaultValue={staff?.nhfNo}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Account Number"
                  variant="underlined"
                  placeholder="Enter the Account No"
                  labelPlacement="outside"
                  defaultValue={staff?.accountNo}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="PFA No"
                  variant="underlined"
                  placeholder="Enter the PFA No"
                  labelPlacement="outside"
                  defaultValue={staff?.pfaAccNumber}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="TIN No"
                  variant="underlined"
                  placeholder="Tin No"
                  labelPlacement="outside"
                  defaultValue={staff?.tinNo}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Rank"
                  variant="underlined"
                  placeholder="Rank Name"
                  labelPlacement="outside"
                  defaultValue={staff?.rankName}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="state"
                  variant="underlined"
                  placeholder="State"
                  labelPlacement="outside"
                  defaultValue={staff?.state}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
            <Button size="md" className={"bg-red-500"}>
        Back to staff
      </Button>
            <Button size="md" className={"bg-[#00bcc2]"}>
        Update
      </Button>
              <Button size="md" className="bg-[#00bcc2]">
              Restore old
      </Button>  
              </div>
          </form>
        </div>
      </div>
    </>
  );
}
EditStaffForm.propTypes = {
  staff: PropType.object,
  role: PropType.string,
};
