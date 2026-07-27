/* eslint-disable no-unused-vars */

import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import PropType from "prop-types";
import { Button } from "flowbite-react";
import TrainingFeeTable from "../../pages/Training/TrainingFee/TrainingFeeTable";
import Separator from "../payroll_components/Separator";

const data = [
    {
      _id: 1,
      grade: "0-6",
      nigeriaDta: "10000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 2,
      grade: "7-9",
      nigeriaDta: "14000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 3,
      grade: "10-13",
      nigeriaDta: "20000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 4,
      grade: "14-15",
      nigeriaDta: "30000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    {
      _id: 5,
      grade: "16-17",
      nigeriaDta: "40000",
      nigeriaLocalRunning: "30",
      nigeriaOtherRunning: "0",
      overseeDta: 'Local',
      ovsLocalRunning: '19',
      ovsOtherRunning: '2024-09-02',
      
    },
    
  ];
export default function TrainingTransportForm({ role }) {
  return (
    <>
      <div className="py-4">
        <div className="w-full">
          <form action="" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="training_type flex flex-col space-y-1">
                <label htmlFor="training_type">Training type</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Nigeria"}>Nigeria</SelectItem>
                  <SelectItem value={"Oversea"}>Oversea</SelectItem>
                </Select>
              </div>
              <div className="flight_option flex flex-col space-y-1">
                <label htmlFor="flight_option">Flight Option</label>
                <Select
                  variant="bordered"
                  className="w-full"
                  labelPlacement="outside"
                >
                  <SelectItem value={"Yes"}>Yes</SelectItem>
                  <SelectItem value={"No"}>No</SelectItem>
                </Select>
              </div>
            </div>
            <div>
              <label htmlFor="Location">Location</label>
              <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
                <div className="From flex flex-col space-y-1">
                  <label htmlFor="From" className="text-sm">From</label>
                  <Select
                    variant="bordered"
                    className="w-full"
                    labelPlacement="outside"
                  >
                    <SelectItem value={"FCT Abuja"}>FCT ABuja</SelectItem>
                    <SelectItem value={"ABIA"}>ABIA</SelectItem>
                    <SelectItem value={"ADAMAWA"}>ADAMAWA</SelectItem>
                    <SelectItem value={"AKWA IBOM"}>AKWA IBOM</SelectItem>
                    <SelectItem value={"ANAMBRA"}>ANAMBRA</SelectItem>
                    <SelectItem value={"BAUCHI"}>BAUCHI</SelectItem>
                  </Select>
                </div>
                <div className="destination flex flex-col space-y-1">
                  <label htmlFor="destination" className="text-sm">destination</label>
                  <Textarea
                    variant={"bordered"}
                    labelPlacement="outside"
                    placeholder="Enter your destination"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div >
            <label htmlFor="">Flight Fee</label>
            <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="flight_amount flex flex-col space-y-1">
                <label htmlFor="flight_amount" className="text-sm">Flight Amount</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
              <div className=" flex flex-col space-y-1">
                <label htmlFor="" className="text-sm">Local/Transport Amount</label>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder=""
                  labelPlacement="outside"
                />
              </div>
            </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button size="md" className="bg-[#00bcc2]">
                Save
              </Button>
            </div>
          </form>
        </div>

        <Separator separator_text={'All Training Fees'}/>
        <TrainingFeeTable rows={data}/>
      </div>
    </>
  );
}
TrainingTransportForm.propTypes = {
  role: PropType.string,
};
