/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar } from "antd"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";
// import React from 'react'

const TeamCard = ({data}) => {
  return (
                     
                            <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
                                <div className="flex-auto p-6">
                                    <div className="flex justify-between mb-4">
                                        <div className="flex-grow-1 items-start">
                                         <Avatar.Group>
                                        {data.avatars.map((url,i)=>(
                                        <Avatar key={i} src={url} />
                                        ))}
                                        </Avatar.Group>
                                            {/* <!-- end avatar group --> */}
                                        </div>
                                        <div className="relative ms-2">
                                              <p  className="flex cursor-pointer font-size-16 text-gray-700" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <HiDotsHorizontal />
                                                <IoMdArrowDropdown />
                                            </p>

                                            <div className=" absolute left-0 z-50 float-left hidden list-reset	 py-2 mt-1 text-base bg-white border border-gray-300 rounded dropdown-menu-end">
                                                <a className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0" href="javascript: void(0);">Edit</a>
                                                <div className="h-0 my-2 overflow-hidden border-t-1 border-gray-300"></div>
                                                <a className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0 leave-team" data-id="1" data-bs-toggle="modal" data-bs-target=".bs-add-leave-team" href="javascript: void(0);">
                                                    Leave Team</a>
                                            </div>
                                        </div>
                                        {/* <!-- end dropdown --> */}
                                    </div>
                                    <div>
                                        <h5 className="mb-1 text-[rgb(33,37,41)] text-[20px]  font-[500]">{data?.title}</h5>
                                        <p className="text-[rgb(108,117,125)]  font-[400] text-[16px] mb-0">{data.no_of_projects}</p>
                                    </div>
                                </div>
                                {/* <!-- end card-body --> */}
                            </div>


  )
}

export default TeamCard