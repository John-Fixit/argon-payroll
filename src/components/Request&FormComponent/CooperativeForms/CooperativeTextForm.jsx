// import 'react-datepicker/dist/react-datepicker.css'
import { Button,} from "@nextui-org/react";
import { DatePicker, Input } from "antd";

export default function CooperativeTextForm() {


  return (
    <div className="grid gap-2 w-full">
      {/* <h2 className="text-[22px] font-normal text-[#212529] mb-4">
        Add Cooperative
      </h2> */}
      <form action="" className="z-[9999] bg-white shadow rounded p-4">
        <div className="my-3 grid grid-cols-1 items-center md:grid-cols-4">
          <label
                htmlFor="name"
                className="text-[rgb(39, 44, 51)] leading-[1.5] font-helvetica text-[.8125rem] uppercase font-medium tracking-[2px]"
              >
               Promotion
              </label>
          <Input
            id="name"
            size="sm"
            type="text"
            className="my-1 h-10 rounded-md focus:outline-none md:col-span-3"
             radius="sm"
          />
        </div>
       <div className="my-3 grid grid-cols-1 items-center md:grid-cols-4">
          <label
                htmlFor="name"
                className="text-[rgb(39, 44, 51)] leading-[1.5] font-helvetica text-[.8125rem] uppercase font-medium tracking-[2px]"
              >
               Date Joined
              </label>
          <DatePicker
              className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none md:col-span-3"
            />
       </div>
        <div className="flex items-center justify-end  ">
          <Button
            color="primary"
            className="my-4  text-white rounded"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
