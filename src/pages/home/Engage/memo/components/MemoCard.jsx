/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { forwardRef } from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  cn,
  Button,
} from "@nextui-org/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { GrView } from "react-icons/gr";
import { useAvatarGroup, AvatarGroupProvider } from "@nextui-org/react";

import { Avatar } from "@nextui-org/react";
import AvatarGroup from "./AvartaGroup";
import { removeHTMLTagsAndStyles } from "../../../../../utils/utitlities";




export default function MemoCard({ memo, handleOpenDrawer, openDrawerFn }) {
  //icon class
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";
  //

  // Function to remove HTML tags and retain inline styles


  return (
    <>
      <div
        className="card group relative  py-[18px] px-[20px] h-[400] border border-[1px] border-[#ededed] bg-[#fff] rounded-[6px] relative flex justify-between flex-col transition-all duration-700"
        style={{ boxShadow: "0 1px 1px rgba(0,0,0,.2)" }}
      >
        <div>
          <div className="absolute top-5 right-2">
            {/* <Dropdown showArrow radius="sm" shadow="sm">
              <DropdownTrigger>
                <span className="cursor-pointer">
                  <BsThreeDotsVertical size={"1.3rem"} />
                </span>
              </DropdownTrigger>
              <DropdownMenu
                variant="flat"
                aria-label="Dropdown menu with icons"
              >
                <DropdownItem
                  key="edit"
                  startContent={<BsPencil className={iconClasses} />}
                  onClick={() => handleOpenDrawer("edit_memo", memo)}
                >
                  {memo?.created_by === "me" ? "Edit" : "Add Note"}
                </DropdownItem>
                <DropdownItem
                  key="view"
                  startContent={<GrView className={cn(iconClasses)} />}
                  onClick={() => openDrawerFn('viewMemo', memo)}
                >
                  View Memo
                </DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
          <h4 className="font-[500] text-[18px] text-[#333] font-[circularstd, sans-serif] leading-[21.6px] mb-[5px] text-start">
            {memo?.subject.length < 30
              ? memo?.subject
              : memo?.subject.substring(0, 30) + "..."}
          </h4>
          <small className="block text-ellipsis mb-[15px]">
            <span className="text-[13px] text-[rgb(33, 37, 41)] font-[500]">
              1
            </span>{" "}
            <span className="text-gray text-[14px] font-[400]">
              open tasks,{" "}
            </span>
            <span className="text-[13px] text-[rgb(33, 37, 41)] font-[500]">
              9
            </span>{" "}
            <span className="text-gray text-[14] font-[400]">
              tasks completed
            </span>
          </small>
          <div className="!text-[#8e8e8e] mb-[1rem] font-[circularstd, sans-serif] font-[500] leading-[22px] text-[15px]">
            <p
              dangerouslySetInnerHTML={{
                __html:
                  removeHTMLTagsAndStyles(memo.body).substring(0, 200) + "...",
              }}
            />
          </div>
        </div>
        <div>
          <div className="mb-[12px] text-[15px]">
            <p className="font-medium text-[#333] leading-[22px] my-auto">
              Created At:
            </p>
            <p className="text-[#8e8e8e] font-[500] leading-[22px] my-auto">
              {memo?.created_at}
            </p>
          </div>
          <div className="mb-[12px] text-[15px]">
            <p className="font-medium text-[#333] leading-[22px] my-auto">
              Memo Creator:
            </p>
            <div className="text-[#8e8e8e] font-[500] leading-[22px] my-auto flex gap-2 items-center">
              <Avatar
                src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-16.jpg"
                className="h-[26px] w-[26px]"
              />
              <span>{memo?.created_by}</span>
            </div>
          </div>
          <div className="mb-[10px]">
            <p className="font-medium text-[#333] leading-[22px] my-auto">
              Approval:
            </p>
            <AvatarGroup
              max={3}
              total={memo?.approval?.length - 3} //(approvals length - max displayed)
              classNames={{
                base: "border-none border-0 border-red-500",
              }}
              size="sm"
              // color='white'

              isBordered={true}
              className="justify-normal mt-2"
            >
              {/* {
                        memo?.approval?.map((memo, index)=>{
                          return(
                            <Avatar key={index+"_approval"} src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg" />
                          )
                        })
                      } */}
              <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg" />
              <Avatar src="	https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-09.jpg" />
              <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg" />
              <Avatar src="https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-05.jpg" />
            </AvatarGroup>
          </div>
        </div>

            <div className="absolute flex items-center justify-center text-center w-full top-0 right-0 left-0 bottom-0 rounded-[6px] hidden bg-chatoverlay/30 z-1 group-hover:block gap-2 transition ease-in-out hover:scale-100 duration-700">
              <div className="flex gap-2  w-full transition ease-in-out duration-700 justify-center h-full items-center">
                {
                   memo?.created_by === 'me' && memo?.status==='draft' && (
                <Button
                  size="sm"
                  className="text-[#00bcc2] bg-white fw-semibold"
                  onClick={() => openDrawerFn("edit_memo", memo)}
                >
                  
                  Edit
                </Button>
                   )
                }
                <Button size="sm" className="bg-[#00bcc2] text-[#fff] fw-semibold" onClick={() => handleOpenDrawer('viewMemo', memo)}>View</Button>
              </div>
            </div>
      </div>
    </>
  );
}
