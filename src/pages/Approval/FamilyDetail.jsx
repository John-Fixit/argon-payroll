/* eslint-disable react/prop-types */

import { toStringDate } from "../../utils/utitlities";


/* eslint-disable no-unused-vars */
const formatDate = (date) => {
    const newDate = new Date(date);
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return dateFormatter.format(newDate);
  };

  // const filePrefix = 'http://lamp3.ncaa.gov.ng/pub/'


  export default function FamilyDetail({role, details, title, currentStatus}) {

  
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  };



  
    return (
      <>
        <div className="shadow border rounded p-4 bg-white w-full font-helvetica">
          <h4 className="text-2xl font-medium">{title}</h4>

          {
            details?.data && (

              <div className="flex flex-col">
                <div className="w-[5rem] h-[5rem] my-4 rounded-full border-2 border-gray-200 overflow-auto bg-gray-50">
                    <img
                    src={ details?.data?.FILE_NAME ?  details?.data?.FILE_NAME: "/assets/images/profiles/user-2.png"}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                </div>

                <ul className="flex flex-col gap-5 my-4">
                  {details?.data && Object.entries(details?.data)?.filter(([key]) => key !== 'FILE_NAME' && key !== 'REQUEST_ID')?.map(([key,value], i) => (
                    <li className="grid grid-cols-3 gap-4 border-b-1 pb-2" key={i}>
                      <p className="font-medium font-helvetica uppercase">{key.replace(/_/g, ' ')}</p>
                      <span className="text-gray-400 col-span-2">{
                      
                      key.includes('DATE') ? toStringDate(value) || "N/A" : (value !== null ? value : 'N/A')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
                      
        </div>
        {
         currentStatus === "pending" &&  role !== 'request' &&
            details?.data &&
          <div className="flex justify-between mt-3">
              <button className="header_btnStyle bg-red-500 rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Reject</button>
  
              <button className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold  mx-2 my-1 md:my-0 px-[13px] py-[7px] uppercase">Approve</button>
          </div>
        }
      </>
    );
  }
  