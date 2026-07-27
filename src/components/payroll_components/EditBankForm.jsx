/* eslint-disable no-unused-vars */

import { Input } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
export default function EditBankForm({ bankDetail, role }) {
  // console.log(bankDetail);
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
                  defaultValue={bankDetail?.name}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Code"
                  variant="underlined"
                  placeholder="Bank Code"
                  labelPlacement="outside"
                  defaultValue={bankDetail?.code}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Sort Code"
                  variant="underlined"
                  placeholder="Enter the sort code"
                  labelPlacement="outside"
                  defaultValue={bankDetail?.sort_no}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Branch Sort"
                  variant="underlined"
                  placeholder="Enter the branch sort"
                  labelPlacement="outside"
                  defaultValue={bankDetail?.branch_sort}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Address 1"
                  variant="underlined"
                  placeholder="Address 1"
                  labelPlacement="outside"
                  defaultValue={bankDetail?.address_1}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Address 2"
                  variant="underlined"
                  placeholder="Address 2"
                  labelPlacement="outside"
                  defaultValue={bankDetail?.address_2}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  type="text"
                  label="Payment Mode"
                  variant="underlined"
                  placeholder="Payment Mode"
                  labelPlacement="outside"
                  defaultValue={bankDetail?.p_mode}
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
EditBankForm.propTypes = {
  bankDetail: PropType.object,
  role: PropType.string,
};
