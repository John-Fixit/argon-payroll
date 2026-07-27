/* eslint-disable no-unused-vars */

import { Input } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function EditPensionForm({ pension, role }) {
  // console.log(pension);
  return (
    <>
      <div className="py-4">
        <div className="shadow-sm w-full">
          <h1 className="px-4 py-2 bg-slate-600 text-gray-200">
            {
              role==='create'? 'ADD NEW PFA':role==='edit'&&`UPDATE ${pension?.name}`
            }
            
          </h1>
          <form action="" className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Name"
                  variant="underlined"
                  placeholder="Bank name"
                  labelPlacement="outside"
                  defaultValue={pension?.name}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Code"
                  variant="underlined"
                  placeholder="Pension Code"
                  labelPlacement="outside"
                  defaultValue={pension?.code}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
                <Button size="md" className={"bg-red-500"}>
            Cancel
          </Button>

                  <Button size="md" className="bg-[#00bcc2]">
                  {
              role==='create'? 'Save':role==='edit'&&`Update`
            }
          </Button>  
              </div>
          </form>
        </div>
      </div>
    </>
  );
}
EditPensionForm.propTypes = {
  pension: PropType.object,
  role: PropType.string
};
