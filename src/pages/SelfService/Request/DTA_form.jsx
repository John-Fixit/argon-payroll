import { Select, DatePicker } from "antd";
import Label from "../../../components/forms/FormElements/Label";
import Input from "../../../components/forms/FormElements/Input";
import TextArea from "../../../components/forms/FormElements/TextArea";

export default function DTA_FORM(){

    const states = [
        {label: "Oyo", value: "Oyo"},
        {label: "Lagos", value: "lagos"},
        {label: "Ekiti", value: "Ekiti"},
        {label: "Imo", value: "Imo"},
    ]
    return(
        <>
             <form className="mb-">
             <div className="mb-4">
            <Label className="font-Roboto">Assignment:</Label>
            <Input
              placeholder="Details/Description of Assignment"
            />
          </div>
          <div className="_compose_to mb-4">
            <Label>State</Label>
            <Select
            //   mode="tags"
              size={"large"}
              placeholder="Search Recipient"
              
              className="border-1 border-gray-300 rounded-md"
              style={{
                width: "100%",
              }}
              variant="borderless"
              options={states}
            />
           
          </div>
          <div className="_compose_subject my-2">
            <Label className="font-Roboto">Destination Address:</Label>
            <Input
              placeholder="Destination Address"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <Label className="font-Roboto">Start Date:</Label>
            <DatePicker className="w-full py-2 rounded-none focus:outline-none" />
          </div>
          <div className="mb-4">
            <Label className="font-Roboto">End Date:</Label>
            <DatePicker className="w-full py-2 rounded-none focus:outline-none" />
          </div>
          </div>
          <div className="_compose_subject my-2">
            <Label className="font-Roboto">Destination Address:</Label>
            <TextArea
              placeholder="Extra Details on Assignment"
            />
          </div>
          
        
         
          <div className="_compose_submit flex justify-between mt-3">
            <div className="my-auto">
              <button
                className={`header_btnStyle bg-[#fff] rounded text-[#00bcc2] border border-[#00bcc2] font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
               
                type="submit"
              >
                Save as draft
              </button>
            </div>
            <button
              className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase `}
          
            >
              Save
            </button>
          </div>
        </form>
        </>
    )
}