/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar } from "@nextui-org/react";
import React from "react";
import { IoIosStarOutline } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { BiMessageAltDots } from "react-icons/bi";
import { FaSignature } from "react-icons/fa";

export default function MemoBox({ data, index, handleOpenDrawer }) {

  return (
    <>
      <div className="flex space-x-3 w-full">
        <div className="">
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            size="sm"
          />
          {/* <IoIosStarOutline size={'18px'} color='rgba(39, 44, 51, 0.5)'/> */}
        </div>
        <div className="flex flex-col space-y-1 w-full">
          <div className="flex justify-between">
            <p className="font-bold font-Exotic text-[#272c33] font-[13p">
              {data?.name}
            </p>
            <p className="text-[rgba(39, 44, 51, 0)] my-auto">{data?.created_at}</p>
          </div>
          <div>
            <p className="font-semibold font-Exotic text-[#272c33] ">
              {data?.title}
            </p>
            {/* <span className='font-normal text-[rgba(39, 44, 51, 0)]'>{('Answer: Never. There is no Windows 11. Microsoft does not have a team of pro...').substring(0, 30) + '...'}</span> */}
          </div>
          <div className="flex justify-end">
            <div className="flex justify-center items-center space-x-2">
              {/* <span>2</span> */}
              <BiMessageAltDots size={"1.5rem"} />
              <GrAttachment className="text-emerald-600" size={"1rem"} />
              {
                index===0 && (
                    <FaSignature size={"1.3rem"} onClick={()=>handleOpenDrawer('review')}/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
