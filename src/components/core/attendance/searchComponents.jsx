/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "antd";
import MemberMultiselect from "../../../pages/home/Engage/Group/components/MemberMultiselect";
import { useEffect, useState } from "react";
import { debounce } from "../../../utils/utitlities";
import { useGetAllChatHistory, useGetAllChatHistoryByName } from "../../../lib/query/queryandMutation";
import useCurrentUser from "../../../hooks/useCurrentUser";
import propTypes from "prop-types"

const SearchComponents = ({selectedStaffId}) => {
const [selectedMember, setSelectedMember] = useState([]);
const [allUsersLoading, setAllUsersLoading] = useState(false);
const [loadingComplete, setLoadingComplete] = useState(false);
const [searchValue, setSearchValue] = useState(null);
const { mutateAsync: searchChat } = useGetAllChatHistoryByName();
const [allMember, setAllMember] = useState([]);
const { userData } = useCurrentUser();
const { mutateAsync: allStaffCall } = useGetAllChatHistory();



useEffect(() => {
    const fetchHistory = async () => {

        try {
            setAllUsersLoading(true)
        const res = await allStaffCall(userData?.data);
        if (res) {
            const incoming = [...res.data.data, ...res.data.dept_data]
            const uniqueIds = new Set();
            const uniqueArray = incoming.filter(obj => {
            if (!uniqueIds.has(obj.STAFF_ID)) {
                uniqueIds.add(obj.STAFF_ID);
                return true;
            }
            return false;
            });

            const allMember = [...uniqueArray]?.map((user) => {
                user.value = user?.STAFF_ID;
                user.label = user?.FIRST_NAME + " " + user?.FILE_NAME;
        
                return user;
              });
    
            setAllMember([...allMember]);
            setAllUsersLoading(false)
        }
        } catch (error) {
        console.log(error);
        setAllUsersLoading(false)
        }
    };
    
    fetchHistory();
 }, [userData?.data]);



const onSelectSearch = (value) => {
    setSearchValue(value);
    if(value){
        setLoadingComplete(true)
    }else(setLoadingComplete(false))
    handleSearch(value);
};

const handleSearch = debounce((searchTerm) => {
    searchConversation(searchTerm);
  }, 2500);

  const searchConversation = async (value) => {
    try {
      if (value.length < 2) return;

      const data = { ...userData?.data, SEARCH: value };
      const res = await searchChat(data);
      if (res) {
        setAllMember(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

const onSelectMember = (member) => {
    if(member.length === 0){
        setSelectedMember([]);
        selectedStaffId(null)
        return
    }

    // console.log(member)
    const lastUser = member[member?.length - 1]
    const userID = [lastUser]?.map((each) => each?.value);

    setSelectedMember([lastUser]);
    selectedStaffId(userID)
};


  return (
    <div className="flex flex-col min-w-[18rem]">
      <div className="flex flex-col p-4 min-w-24" onBlur={()=>setLoadingComplete(false)}>
                <div className="flex justify-end mb-1">
                  <Input
                    allowClear={true}
                    value={searchValue}
                    onChange={(e) => onSelectSearch(e?.target?.value)}
                    size="medium"
                    placeholder="search staff"
                    // className="w-[50%]"
                  ></Input>
                </div>
                <MemberMultiselect
                      allUsers={allMember}
                      onPickMember={onSelectMember}
                      allUsersLoading={allUsersLoading}
                      memberInpForUi={selectedMember}
                      onSelectSearch={onSelectSearch}
                      loadingComplete={loadingComplete}
                      setLoadingComplete={setLoadingComplete}
                      mode="tags"
                      hint="select staff"
                />
    </div>
    </div>
  )
}

SearchComponents.propTypes = {
    selectedStaffId : propTypes.func

}
export default SearchComponents
