



/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Avatar } from "@nextui-org/react";
import { Select, Space } from "antd";
// import { useState } from "react";





const MultiselectAntd = ({participantLoading, participantInp, onPickParticipant, participantLoaded, qualificationInp, participantInpForUi  }) => {



  return (
    <div className="w-full  flex items-center justify-center">
        <div className="w-full">
            <Select
            className="rounded-lg w-full overflow-scroll"
            labelInValue
                // primaryColor={'blue'}
                options={participantLoaded}
                onChange={value => onPickParticipant(value)}
                value={participantInpForUi}
                loading={participantLoading}
                // isClearable={true}
                // isSearchable={true}
                showSearch
                placeholder="select participants"
                mode="multiple"
                // isMultiple={true}
                disabled={!qualificationInp || participantLoaded?.length === 0}
                // isDisabled={!qualificationInp || participantLoaded?.length === 0}
                optionRender={(user) => (
                    <Space className="cursor-pointer hover:bg-blue-500 w-full hover:text-white px-2 rounded-xl text-gray-600">
                    {(qualificationInp === "STAFF" || qualificationInp ===  "DIRECTORATE HEAD"  || qualificationInp ===  "DEPARTMENTAL HEAD"  || qualificationInp === "UNIT HEAD" || qualificationInp === "REGIONAL HEAD"     ) ? (
                      <div className="flex gap-2 items-center  cursor-pointer px-2 py-1"> 
                        {user?.data?.FILE_NAME?.includes("http") ? (
                          <Avatar
                            alt={user?.data?.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={user?.data?.FILE_NAME}
                          />
                        ) : (
                          <Avatar
                            alt={user?.data?.name}
                            className="flex-shrink-0"
                            size="sm"
                            name={user?.data?.label?.trim()[0]}
                          />
                        )}
        
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">{user?.data?.label}</span>
                        </div>
                      </div>
                    ) : (qualificationInp === "UNIT" || qualificationInp ===  "DIRECTORATE"  || qualificationInp ===  "DEPARTMENT" || qualificationInp ===  "DESIGNATION" || qualificationInp ===  "GRADE") ? (
                      <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">{user?.data?.label}</span>
                        </div>
                      </div>
                    )   
                    
                    : (
                      <div className="flex gap-2 items-center text-gray-600">
                      
                      </div>
                    )}
                  </Space>
                )}
            />
        </div>
    </div>
  )
}

export default MultiselectAntd
