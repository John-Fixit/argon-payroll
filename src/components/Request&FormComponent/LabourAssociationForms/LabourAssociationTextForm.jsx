// import 'react-datepicker/dist/react-datepicker.css'
import { Input, Button,} from "@nextui-org/react";
import { DatePicker } from "antd";

export default function LabourAssociationTextForm() {


  return (
    <div className="grid gap-2 w-full p-8">
      <h2 className="text-[22px] font-normal text-[#212529] mb-4">
        Add Labour Association
      </h2>
      <form action="" className="z-[9999]">
        <div className="my-3">
          <label htmlFor="name">Name</label>
          <Input
            id="name"
            type="text"
            className="rounded-sm"
            labelPlacement="ouside"
          />
        </div>
       <div className="my-3">
          <label>Date Joined</label>
         <DatePicker
              className=' w-full border-none bg-gray-100 hover:bg-gray-200 h-10 rounded-lg focus:outline-none'
            />
       </div>
        <div className="flex items-center justify-end">
          <Button
            color="success"
            className="my-4  text-white rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
