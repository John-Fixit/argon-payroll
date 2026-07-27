/* eslint-disable no-unused-vars */
import { Button } from "@nextui-org/button";
import Separator from "../../../../../components/payroll_components/Separator";



export default function MemoAttachment(){
    return(
        <>
            <div className="mx-4">
                <Separator separator_text={"Attachments"}/>
                <div className="flex justify-end">
                    {/* <Button className=" bg-[#00bcc2] rounded text-white font-Exotic font-semibold py-[10px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase">Add New Note</Button> */}
                </div>
                <div className="my-2">
                    <h1 className="text-gray"><i>Attachment here</i></h1>
                </div>
            </div>
        </>
    )
}