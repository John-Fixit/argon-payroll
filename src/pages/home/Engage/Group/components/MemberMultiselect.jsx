/* eslint-disable react/prop-types */
import { Avatar } from "@nextui-org/react"
import { Select, Space } from "antd"
import { filePrefix } from "../../../../../utils/filePrefix"

const MemberMultiselect = ({allUsers, onPickMember, allUsersLoading, memberInpForUi, onSelectSearch, loadingComplete, setLoadingComplete, mode = "multiple", hint= "select participants"}) => {

    const filters = (inpt, opt)=>{
      if(opt?.LAST_NAME?.toLowerCase()?.includes(inpt?.toLowerCase()) ||  opt?.FIRST_NAME?.toLowerCase()?.includes(inpt?.toLowerCase())){
        return  opt
      }
    } 

  return (
    <div className="w-full  flex items-center justify-center">
    <div className="w-full">
        <Select
            className="rounded-lg w-full overflow-scroll"
            labelInValue
            options={allUsers}
            onChange={value => onPickMember(value)}
            value={memberInpForUi}
            loading={allUsersLoading}
            showSearch
            placeholder={hint}
            mode={mode}
            filterOption={filters}
            allowClear
            onSearch={onSelectSearch}
            onClick={()=>setLoadingComplete(true)}
            onBlur={()=>setLoadingComplete(false)}
            maxTagCount={2}
            open={loadingComplete}
            optionRender={(user) => (
                <Space className="cursor-pointer hover:bg-blue-500 w-full hover:text-white px-2 rounded-xl text-gray-600">
                  <div className="flex gap-2 items-center  cursor-pointer px-2 py-1">
                    <div className="flex gap-2 items-center">
                    <Avatar
                        alt={user?.data?.name}
                        className="flex-shrink-0"
                        size="sm"
                        src={user?.data?.FILE_NAME ?   filePrefix + user?.data?.FILE_NAME : ''}
                      />
                      <span className="text-xs font-medium">{`${user?.data?.FIRST_NAME}  ${user?.data?.LAST_NAME}`}</span>
                    </div>
                  </div>
              </Space>
            )}
        />
    </div>
</div>
  )
}

export default MemberMultiselect
