/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel, MdOutlineInput, MdOutlineReviews } from "react-icons/md";
import { TbBuildingMonument } from "react-icons/tb";
import { MdOutlinePending } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";

import { MdOutlineApproval } from "react-icons/md";
import PropTypes from "prop-types";
import { cn } from "@nextui-org/react";
import StarLoader from "../../../../../components/core/loaders/StarLoader";

export default function OverviewCards({
  memos, 
  selected,
  setSelected,
  pendingMemo,
  draftMemo,
  approvedMemo,
  declinedMemo,
  receivedMemo,
  isHR = false,
  loading
}) {
  const navigate = useNavigate({});
  const handleSelect = (val) => {
    setSelected(val)
  };




  const memoData = [
    // {
    //   name: "All Memo",
    //   key: "all",
    //   icon: MdOutlineReviews,
    //   total: draftMemo?.filter(memo=>memo?.created_by==='me' && memo?.status==='draft').length ?? 0,
    //   b_color: 'bg-amber-100',
    //   t_color: 'text-amber-600'
    // },

    {
      name: "Completed",
      key: "Completed",
      icon: MdOutlineApproval,
      total: approvedMemo?.length ?? 0,
      b_color: 'bg-green-100',
    t_color: 'text-green-600'
  },
    // {
    //   name: "Received",
    //   key: "Received",
    //   icon: MdOutlineInput,
    //   total: receivedMemo?.length ?? 0,
    //   b_color: 'bg-amber-100',
    //   t_color: 'text-amber-600'
    // },
    // {
    //   name: "Pending",
    //   key: "Pending",
    //   icon: MdOutlinePending,
    //   total: pendingMemo?.length,
    //   b_color: 'bg-cyan-100',
    // t_color: 'text-cyan-600'
    // },
    // {
    //     name: "Approved",
    //     key: "Approved",
    //     icon: MdOutlineApproval,
    //     total: approvedMemo?.length ?? 0,
    //     b_color: 'bg-green-100',
    //   t_color: 'text-green-600'
    // },
    // {
    //     name: "Declined",
    //     key: "Declined",
    //     icon: MdOutlineCancel,
    //     total: declinedMemo?.length ?? 0,
    //     b_color: 'bg-red-100',
    //   t_color: 'text-amber-600'
    // },
    {
        name: "Draft",
        key: "Draft",
      icon: RiDraftLine,
      total: draftMemo?.length ?? 0,
      b_color: 'bg-gray-100',
      t_color: 'text-gray-600'
    },
  ]




  const memoDataFromHR = [
    {
      name: "Pending Memo",
      key: "Pending",
      icon: MdOutlinePending,
      total: pendingMemo?.length,
      b_color: 'bg-cyan-100',
    t_color: 'text-cyan-600'
    },
    {
        name: "Approved Memo",
        key: "Approved",
        icon: MdOutlineApproval,
        total: approvedMemo?.length ?? 0,
        b_color: 'bg-amber-100',
      t_color: 'text-amber-600'
    },
    {
        name: "Declined Memo",
        key: "Declined",
        icon: MdOutlineCancel,
        total: declinedMemo?.length ?? 0,
        b_color: 'bg-red-100',
      t_color: 'text-amber-600'
    },
  ]


  // ${request.id==requestStatus?'bg-slate-100':'bg-white'}
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 my-3">
        {(isHR ? memoDataFromHR : memoData)?.map((item, index) => {
          return (
            <div
              key={index}
              className={cn("py-4 -top  border-[1px] border-[#dfe2e6] shadow flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3 cursor-pointer", item.key === selected ?'bg-slate-100':'bg-white')}
              onClick={() => handleSelect(item?.key)}
              style={{
                boxShadow: "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)"
              }}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${item?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  <item.icon
                    size={25}
                    className={`!font-bold ${item.t_color}`}
                  />
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                  {item?.name}
                </span>
              </div>
              <span className="text-[16px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
                  {/* {item?.total} */}

                  {
              loading ? (
                 <StarLoader size={20}/>
              ): (
                item?.total
              )
            }


                </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

OverviewCards.propTypes = {
  memos: PropTypes.array,
}