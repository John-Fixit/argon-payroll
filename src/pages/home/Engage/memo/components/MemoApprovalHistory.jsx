/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from "@nextui-org/react";
import { Fragment, useState } from "react";
import { FcApprove } from "react-icons/fc";
import { IoCheckmarkCircleSharp, IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdCancel, MdPending } from "react-icons/md";
import { RomanFigure } from "../../../../../components/Leave/RomanFigure";
import img1 from "../../../../../../public/assets/images/profiles/avatar-03.jpg"
import moment from "moment";

const MemoApprovalHistory = ({currentView, role}) => {
  // const [currentTabName, setCurrentTabName] = useState("Leave");

  // const tabs = [{ name: "Leave" }, { name: "Attachments" }, { name: "Note" }];

const formatDate=(dateString)=>{
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Convert the day to the correct ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'];
    const daySuffix = (day % 10 < 4) ? suffix[day % 10] : suffix[0];
    
    return formattedDate.replace(/\d{1,2}(?=,)/, `$&${daySuffix}`);
}

    const data = {
        _id: 3,
       type: "Casual",
        from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
        to: "Sat Nov 18 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
        returned_on: "Thu Jun 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
        duration: "37",
        reason: "Personal",
        over_shoot: "-3",
        status: "pending",
        hand_over:{ name: "Ajayi Adeosun", role: "Section Head", abbr: "SH", main: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU" },

        internal_approval:[
          { name: "Emmanuel Oluwatayese", role: "Section Head", abbr: "SH", main: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU" },
         
        ],
        hr_approval:[
          { name: "Olaitan Okunade", role: "Section Head", abbr: "SH", main: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqUYWK2ER12rKqvZmJGKNgZRGPu_kTwXxHBg&usqp=CAU" },
          {
            name: "Kayode Adeyinka",
            role: "Head of Department",
            abbr: "HD",
            main: false,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU'
          },
        ],
      };



  return (
    <Fragment>
 <div className="shadow border rounded p-4 bg-white">
        <h4 className="text-lg">Approval History</h4>
        <div className="my-4 w-full">
       
          <ol className="ms-12 my-4 text-gray-500 border-s-2 border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="mb-10 ms-4 relative group">
              <p className="font-medium text-xs uppercase">Handover</p>
            <div className="border p-2 rounded">
              <Avatar
                src={data?.hand_over?.img}
                size="sm"
                className="absolute -start-[62px]"
              />
              <span className="absolute w-[12px] h-[12px] group-hover:bg-btnColor bg-gray-200 border-2 border-white rounded-full -start-[24px] top-5"></span>
              <div className="">
              <div className="flex justify-between items-between">
                <p className="uppercase text-blue-500 text-sm">
                  {data.hand_over.name}
                </p>
                <div className="h-8 w-8 flex justify-center items-center rounded-full bg-green-300">
                <IoCheckmarkCircleSharp size={20} className="text-green-600"/>
                </div>
              </div>
                <p className="text-xs flex flex-col gap-2">
                <span>{data.hand_over.role}</span>
                <div className="flex justify-between gap-4">
                <span>
                    {moment("2024-03-23T21:30:28.000Z").format('MMMM Do YYYY, h:mm:ss a')}
                    
                </span>
                <span>
                    {moment("2024-03-23T21:30:28.000Z").startOf('day').fromNow().slice(0, -3) }
                </span>

                </div>
                  
                </p>
              </div>
            </div>
            </li>
          {data.internal_approval.map((user,i)=>(
            <li className="mb-10 ms-4 relative group" key={i}>
              <p className="font-medium text-xs uppercase">Internal Approval {RomanFigure(i+1)}</p>
            <div className="border p-2 rounded">
              <Avatar
                src={user?.img}
                size="sm"
                className="absolute -start-[62px]"
              />
              <span className="absolute w-[12px] h-[12px] group-hover:bg-btnColor bg-gray-200 border-2 border-white rounded-full -start-[24px] top-5"></span>
              <div className="">
              <div className="flex justify-between items-center">
                <p className="uppercase text-blue-500 text-sm">
                  {user.name}
                </p>
                 <div className="h-8 w-8 flex justify-center items-center rounded-full bg-yellow-300">
                <MdPending size={20} className="text-yellow-600"/>
                </div>
              </div>
              <div className="text-xs flex flex-col gap-2">
                <span>{user.role}</span>
                <div className="flex justify-between gap-4">
                <span>
                    {moment("2024-03-25T21:30:28.000Z").format('MMMM Do YYYY, h:mm:ss a')}
                    
                </span>
                <span>
                    {moment("2024-03-25T21:30:28.000Z").startOf('day').fromNow().slice(0, -3) }
                </span>

                </div>
                  
                </div>
              </div>
            </div>
            </li>
          ))}
          {data.hr_approval.map((user,i)=>(
            <li className="mb-10 ms-4 relative group" key={i}>
              <p className="font-medium text-xs uppercase">HR Approval {RomanFigure(i+1)}</p>
            <div className="border p-2 rounded">
              <Avatar
                src={user?.img}
                size="sm"
                className="absolute -start-[62px]"
              />
              <span className="absolute w-[12px] h-[12px] group-hover:bg-btnColor bg-gray-200 border-2 border-white rounded-full -start-[24px] top-5"></span>
              <div className="">
              <div className="flex items-center justify-between">
                <p className="uppercase text-blue-500 text-sm">
                  {user.name}
                </p>
                   {/* <div className="h-8 w-8 flex justify-center items-center rounded-full bg-red-300">
                <MdCancel size={20} className="text-red-600"/>
                </div> */}
              </div>
              <p className="text-xs flex flex-col gap-2">
                <span>{user.role}</span>
                <span>{formatDate(data.to)}</span>
                  
                </p>
              </div>
            </div>
            </li>
          ))}
          </ol>
        </div>
      </div>

      
    </Fragment>
  );
};

export default MemoApprovalHistory;
