/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import RecieptDateSvg from "../../components/service_component/RecieptDateSvg";
import TransactionTimeline from "../../components/service_component/TransactionTimeline";

export default function TransactionReciept() {

    const InfoComponent=({propty, value})=>{
        return(
        <div className="flex justify-between">
        <span className="font-medium text-[14px] font-poppins text-black">{propty}</span>
        <span className="font-medium text-[14px] font-poppins text-black">{value}</span>
    </div>
        )
    }

  return (
    <>
      <div className="pl-5 pr-5 md:pr-5 md:pl-5">
        <div className="flex items-start">
          <span className="text-gray-700 font-poppins font-semibold text-lg">
            Recent Transactions
          </span>
        </div>
        <div className="flex justify-center flex-col items-center my-5">
          <TransactionTimeline />
        </div>
        <div className="bg-blue-200  text-blue-600 rounded py-[16px] px-[20px]">
          Payment successful! The recipient is expected to receive the money
          within 6 minutes
        </div>
        <div className="my-3 flex flex-col space-y-3">
            <InfoComponent propty={"Amount"} value={"N20,500.00"}/>
            <InfoComponent propty={"Payment Option"} value={"Bank Transfer"}/>
        </div>
       <RecieptDateSvg date={'Aug 3rd, 7:38 PM'}/>
       <div className="my-3 flex flex-col space-y-3">
            <InfoComponent propty={"Status"} value={"Completed"}/>
            <InfoComponent propty={"Merchant Name"} value={"Adeyemi Adetunji"}/>
            <InfoComponent propty={"Order Number"} value={"#34500DF"}/>
        </div>

        <Button color="primary" className="mt-4 w-full">
                    Share receipts
                </Button>
      </div>
    </>
  );
}
