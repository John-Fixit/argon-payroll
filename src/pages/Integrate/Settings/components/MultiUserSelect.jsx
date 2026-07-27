/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Avatar } from "@nextui-org/react";
import { Space } from "antd";
// import { useState } from "react";
import Select from "react-tailwindcss-select";





// export const mangas = [
//     {value: "Naruto Shippûden", label: "🤭 Naruto Shippûden", disabled: false},
//     {value: "One Piece", label: "🤩 One Piece", disabled: false},
//     {value: "Bleach", label: "🥹 Bleach", disabled: false},
//     {value: "Boruto", label: "😡 Boruto", disabled: false},
//     {value: "Hunter x Hunter", label: "🥰 Hunter x Hunter", disabled: false},
//     {value: "Dragon Ball Z", label: "🥵 Dragon Ball Z", disabled: false},
//     {value: "Fullmetal Alchemist", label: "🫡 Fullmetal Alchemist", disabled: false},
//     {value: "My Hero Academia", label: "🤯 My Hero Academia", disabled: false},
//     {value: "Black Clover", label: "😍 Black Clover", disabled: false},
// ];

const MultiUserSelect = ({participantLoading, participantInp, onPickParticipant, participantLoaded, qualificationInp, participantInpForUi  }) => {


    // const [value, setValue] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [isDisabled, setIsDisabled] = useState(false);

    // console.log(qualificationInp) 

  return (
    <div className="w-full  flex items-center justify-center">
        <div className="w-full">
            <Select
            className="rounded-lg"
                primaryColor={'blue'}
                options={participantLoaded}
                onChange={value => onPickParticipant(value)}
                value={participantInpForUi}
                loading={participantLoading}
                isClearable={true}
                isSearchable={true}
                placeholder="select participants"
                isMultiple={true}
                isDisabled={!qualificationInp || participantLoaded?.length === 0}
                formatOptionLabel={(user) => (
                    <Space className="cursor-pointer hover:bg-blue-500 w-full hover:text-white px-2 rounded-xl text-gray-600">
                    {(qualificationInp === "STAFF" || qualificationInp ===  "DIRECTORATE HEAD"  || qualificationInp ===  "DEPARTMENTAL HEAD"  || qualificationInp === "UNIT HEAD" || qualificationInp === "REGIONAL HEAD"     ) ? (
                      <div className="flex gap-2 items-center  cursor-pointer px-2 py-1"> 
                        {user?.FILE_NAME?.includes("http") ? (
                          <Avatar
                            alt={user?.name}
                            className="flex-shrink-0"
                            size="sm"
                            src={user?.FILE_NAME}
                          />
                        ) : (
                          <Avatar
                            alt={user?.name}
                            className="flex-shrink-0"
                            size="sm"
                            name={user?.label?.trim()[0]}
                          />
                        )}
        
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">{user?.label}</span>
                        </div>
                      </div>
                    ) : (qualificationInp === "UNIT" || qualificationInp ===  "DIRECTORATE"  || qualificationInp ===  "DEPARTMENT" || qualificationInp ===  "DESIGNATION" || qualificationInp ===  "GRADE") ? (
                      <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">{user?.label}</span>
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

export default MultiUserSelect
