/* eslint-disable no-unused-vars */

import { Input } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function Add_UpdateStaffGroupForm({ group, role }) {
  return (
    <>
      <div className="py-4">
        <div className="shadow-sm w-full">

          <form action="" className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Group Name"
                  variant="underlined"
                  placeholder="Group name"
                  labelPlacement="outside"
                  defaultValue={group?.name}
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
Add_UpdateStaffGroupForm.propTypes = {
  group: PropType.object,
  role: PropType.string
};
