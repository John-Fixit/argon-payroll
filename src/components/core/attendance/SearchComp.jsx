/* eslint-disable react/prop-types */
import { useState } from "react"
import { useGetAllStaff } from "../../../API/memo"
import useCurrentUser from "../../../hooks/useCurrentUser"
import { useEffect } from "react"
import Label from "../../../components/forms/FormElements/Label"
import { Select, Space } from "antd"
import { Avatar } from "@nextui-org/react"


const StaffInputV2 = ({setChange, label, multiple = false, value=null, onClear =null}) => {
    const {userData} = useCurrentUser()
    const {data:allStaff} = useGetAllStaff(userData?.data?.COMPANY_ID)
    const [selectData, setSelectData] = useState([])



    useEffect(() => {

        const processData = ()=>{
          const  value =  allStaff?.map((val) => {
              val.value = val?.STAFF_ID;
              val.label = val?.FIRST_NAME + " " +  val?.LAST_NAME;
            return val;
          });
          setSelectData(value)
        }
    
        processData()
    
      }, [allStaff])


  const handleChange = (val)=>{
    if(multiple){
      const userIDs = val?.map((each) => each?.value) ;
      setChange(userIDs, val)

    }else{
      const userIDs = val?.value;
      setChange(userIDs, val)
    }
  } 


  return (
    <div className="_compose_to mb-4 w-full">
    <Label>{label}</Label>
    <Select
      mode={multiple ? "multiple" : ''}
      value={value}
      size={"large"}
      labelInValue
      allowClear
      placeholder={`Select ${label}`}
      onChange={handleChange}
      className="border-1 border-gray-300 rounded-md"
      style={{
        width: "100%",
      }}
      showSearch
      onClear={onClear}
      variant="borderless"
      optionFilterProp="label"
      options={selectData}
      optionRender={(user) => (
        <Space className="cursor-pointer  w-full  px-2 rounded-xl ">
        {
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
      }
      </Space>
      )}
    />
  </div>
  )
}

export default StaffInputV2
