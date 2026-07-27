/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar } from "antd"
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";





// import React from 'react'

const TaskCard = ({ data }) => {
  return (
    <div
      className="tab-pane active opacity-100 block"
      id="tasks-tab"
      role="tabpanel"
    >
      <div className="flex flex-wrap ">
        <div className="xl:w-full pr-4 pl-4">
          <div className="task-list-box" id="landing-task">
            <div id="task-item-1">
              <div className="relative flex flex-col min-w-0 rounded break-words border bg-white border-1 border-gray-300 task-box rounded-3">
                <div className="flex-auto p-6">
                  <div className="flex flex-wrap  items-center">
                    <div className="xl:w-2/5 pr-4 pl-4 sm:w-2/5">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="absolute -ml-6"
                          id="customCheck1"
                        />
                        <label
                          className="text-gray-700 mb-0 task-title"
                          htmlFor="customCheck1"
                        >
                          {data?.title}
                        </label>
                      </div>
                    </div>
                    {/* <!-- end col --> */}
                    <div className="xl:w-3/5 pr-4 pl-4 sm:w-3/5">
                      <div className="flex flex-wrap  items-center">
                        <div className="xl:w-2/5 pr-4 pl-4 md:w-1/2 sm:w-2/5">
                           <Avatar.Group>
                                        {data.avatars.map((url,i)=>(
                                        <Avatar key={i} src={url} />
                                        ))}
                                        </Avatar.Group>
                          {/* <!-- end avatar group --> */}
                           
                        </div>
                        {/* <!-- end col --> */}
                        <div className="xl:w-3/5 md:w-1/2 sm:w-3/5">
                          <div className="flex flex-wrap gap-5 mt-3 xl:mt-0 md:justify-end">
                            <div>
                              <span className={`inline-block p-1 text-center font-semibold text-sm align-baseline leading-none rounded-full py-2 px-4 font-size-11 task-status ${data?.textColor} ${data?.bgColor}`}>
                                {data?.status}
                              </span>
                            </div>
                          
                            <div>
                              <p
                                href="#"
                                className="mb-0 text-gray-700 fw-medium flex gap-2 items-center"
                              >
                            <IoMdCheckmarkCircleOutline />
                                <span className="underline">4/8</span>
                                
                              </p>
                            </div>
                           <div className="flex flex-col gap-8">
                            <div>
                              <a
                                href="#"
                                className="mb-0 text-gray-600 fw-medium"
                                data-bs-toggle="modal"
                                data-bs-target=".bs-example-new-task"
                              >
                               <FaEdit />
                              </a>
                            </div>
                            <div>
                              <a href="#" className="delete-item text-red-600 fw-medium">
                                <RiDeleteBinLine size={20} />
                              </a>
                            </div>
                           </div>
                          </div>
                        </div>
                        {/* <!-- end col --> */}
                      </div>
                      {/* <!-- end row --> */}
                    </div>
                    {/* <!-- end col --> */}
                  </div>
                  {/* <!-- end row --> */}
                </div>
                {/* <!-- end cardbody --> */}
              </div>
              {/* <!-- end card --> */}
            </div>
          </div>
          {/* <!-- end --> */}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
