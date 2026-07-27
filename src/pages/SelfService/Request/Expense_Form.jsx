/* eslint-disable no-unused-vars */
import { Select, DatePicker } from "antd";
import Label from "../../../components/forms/FormElements/Label";
import Input from "../../../components/forms/FormElements/Input";
import TextArea from "../../../components/forms/FormElements/TextArea";

export default function Expense_FORM(){

    const options = [
        {label: "Unit Head", value: "Unit Head"},
        {label: "Departmental Head", value: "Departmental Head"},
        {label: "Regional Head", value: "Regional Head"},
    ]
    return(
        <>
             <form className="mb-">
             
          <div className="_compose_to mb-4">
            <Label>Aprovals</Label>
            <Select
              mode="tags"
              size={"large"}
              placeholder="Search approvals"
              
              className="border-1 border-gray-300 rounded-md"
              style={{
                width: "100%",
              }}
              variant="borderless"
              options={options}
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