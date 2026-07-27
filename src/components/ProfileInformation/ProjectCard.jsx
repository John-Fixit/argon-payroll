/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { Avatar, AvatarGroup } from '@nextui-org/react'

import { Avatar } from "antd"
import { HiDotsHorizontal } from "react-icons/hi";
import { IoMdArrowDropdown } from "react-icons/io";

const ProjectCard = ({data}) => {
  return (
    <div  className="" id="project-items-1">
                            <div  className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300">
                                <div  className="flex-auto p-6">
                                    <div  className="flex mb-3 justify-between">
                                        <div  className="flex-grow-1 items-start">
                                            <div>
                                                <h6  className="mb-0 flex items-center gap-2">
                                                    <p  className={`rounded-full h-2 w-2 ${data.bulletColor}`}></p>
                                                    <p  className="team-date text-gray-600 font-semibold">{data?.date}</p>
                                                </h6>
                                            </div>
                                        </div>
                                        <div  className="relative ms-2">
                                            <p  className="flex cursor-pointer font-size-16 text-gray-700" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <HiDotsHorizontal />
                                                <IoMdArrowDropdown />
                                            </p>

                                            <div  className=" absolute left-0 z-50 float-left hidden list-reset	 py-2 mt-1 text-base bg-white border border-gray-300 rounded dropdown-menu-end">
                                                <a  className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0" href="javascript: void(0);" data-bs-toggle="modal" data-bs-target=".bs-example-new-project" onClick="editProjects('project-items-1')">Edit</a>
                                                <a  className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0" href="javascript: void(0);">Share</a>
                                                <div  className="h-0 my-2 overflow-hidden border-t-1 border-gray-300"></div>
                                                <a  className="block w-full py-1 px-6 font-normal text-gray-900 whitespace-no-wrap border-0 delete-item" onClick="deleteProjects('project-items-1')" data-id="project-items-1" href="javascript: void(0);">Delete</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div  className="mb-4">
                                        <h5  className="mb-1 text-black text-[20.889px] font-[500]">{data?.title}</h5>
                                        <p  className="text-gray-600 mb-0 team-description">{data.description}</p>
                                    </div>
                                    <div  className="flex justify-between">
                                        <Avatar.Group>
                                        {data.avatars.map((url,i)=>(
                                        <Avatar key={i} src={url} />
                                        ))}
                                        </Avatar.Group>
                                        {/* <!-- end avatar group --> */}
                                        <div  className="">
                                            <span  className={`${data.bgColor} ${data.textColor} inline-block text-center font-semibold text-sm align-baseline leading-none rounded p-2 team-status`}>{data?.status}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end cardbody --> */}
                            </div>
                            {/* <!-- end card --> */}
                        </div>
  )
}

export default ProjectCard