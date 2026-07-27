/* eslint-disable react/prop-types */
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { FacebookIcon, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { GrSend } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { LiaLinkedin } from "react-icons/lia";
import { TbBrandStackshare, TbBrandWhatsapp } from "react-icons/tb";
import { LuCopy } from "react-icons/lu";
import moment from 'moment';

const News = ({data}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl flex flex-col overflow-clip shadow border pb-4">
      <div className="flex h-[5rem] px-[1.8rem] items-center justify-between">
        <div className="flex  gap-3">
          <div className=" overflow-hidden  h-10  flex items-end">
            <img
              // src="/assets/images/profiles/avatar-07.jpg"
              src={data?.author?.image || "/assets/images/profiles/avatar-07.jpg"}
              className="h-10 w-10 rounded-full"
            />
          </div>

          <div className="flex flex-col">
            {/* <span className="font-bold text-gray-600 text-sm">@jdoee</span> */}
            <span className="font-bold text-gray-600 text-sm">@{data?.author?.username}</span>
            <span className=" text-gray-500 text-sm">{moment(data?.createdAt).fromNow()}</span> 
            {/* //2 days */}
          </div>
        </div>

        <div>
          <Popover placement="bottom" className="hidden">
            <PopoverTrigger>
              <div className=" hover:bg-slate-300 p-1 cursor-pointer rounded-full hidden">
                <IoMdMore size={20} className="text-slate-900" />
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex  flex-wrap w-30 justify-center  items-center ">
                <Button color="">
                  <LuCopy size={18} />
                  <span className="text-gray-600"> Copy Link</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="w-full h-[20rem] overflow-hidden relative">
        <img
          // src="/assets/images/navigating.png"
          src={data?.media[0] || "/assets/images/navigating.png"}
          className=" object-cove object-top w-full h-full"
          alt=""
        />

        <div className="absolute bottom-4 left-7 bg-gray-300 rounded-2xl px-3 py-[0.22rem]">
          <span className="text-gray-900">{data?.category?.name}</span> 
          {/* Nairametrics */}
        </div>
      </div>

      <div className="px-7 text-gray-500  flex flex-col gap-y-2 pt-4 pb-2">
        <div>
          <b className=" text-lg text-gray-700">
            {data?.title}
            {/* Navigating the Cost-Effectiveness of AI vs. Human Labor in
            Today&apos;s Economy */}
          </b>
        </div>
        <span className={`text-base ${isExpanded ? "" : "truncate"} `}>
              {data?.body}
        
          {/* A recent MIT study highlights the nuanced reality of AI and human
          labor cost-effectiveness in today&apos;s economy, suggesting that
          humans remain indispensable in many sectors. */}
        </span>
      </div>

      <div
        className="px-7 text-gray-600 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span> {isExpanded ? "See less" : "See more"} </span>
      </div>

      <div className="px-7  pt-5 justify-between hidden">
        <div className="flex gap-3">
          <Button radius="full" size="sm" className="bg-slate-200/90 ">
            {" "}
            <ThumbsUp size={15} /> <span className="text-medium">0</span>{" "}
          </Button>
        </div>

        <Popover placement="top">
          <PopoverTrigger>
            <Button
              variant="light"
              size="sm"
              className=" !w-8 !h-8 !rounded-full"
            >
              {" "}
              <TbBrandStackshare size={20} />{" "}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="px-1 py-3 flex gap-3 flex-wrap w-44 justify-center ">
              <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600/70 cursor-pointer">
                {" "}
                <FacebookIcon size={20} color="white" />{" "}
              </div>
              <div className="bg-gray-800 rounded-full w-10 h-10  flex items-center justify-center hover:bg-gray-800/70 cursor-pointer">
                {" "}
                <FaXTwitter size={18} color="white" />{" "}
              </div>
              <div className="bg-blue-800 rounded-full w-10 h-10  flex items-center justify-center  hover:bg-blue-800/70 cursor-pointer">
                {" "}
                <LiaLinkedin size={22} color="white" />{" "}
              </div>
              <div className="bg-cyan-700 rounded-full w-10 h-10  flex items-center justify-center  hover:bg-cyan-700/70 cursor-pointer">
                {" "}
                <GrSend size={20} color="white" />{" "}
              </div>
              <div className="bg-green-800/70 rounded-full w-10 h-10  flex items-center justify-center hover:bg-green-800/50 cursor-pointer">
                {" "}
                <TbBrandWhatsapp size={20} color="white" />{" "}
              </div>
              <div className="bg-slate-700 rounded-full w-10 h-10  flex items-center justify-center  hover:bg-slate-800/70 cursor-pointer">
                {" "}
                <LuCopy size={18} color="white" />{" "}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default News;
