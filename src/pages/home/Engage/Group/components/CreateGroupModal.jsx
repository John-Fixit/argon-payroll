/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Drawer, Input, Space } from "antd";
import { Avatar, Checkbox } from "@nextui-org/react";
import useGroupAction from "../../../../../hooks/useGroupAction";
import { addGroupMemberAction, createGroupChatAction } from "../../../../../API/group-chat";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import MemberMultiselect from "./MemberMultiselect";
import { SocketContext } from "../../../../../context/SocketContext";
import { useGetAllChatHistoryByName } from "../../../../../lib/query/queryandMutation";
import { debounce } from "../../../../../utils/utitlities";
import { showSuccess } from "../../../../../utils/messagePopup";
import { MdCancel } from "react-icons/md";
import { filePrefix } from "../../../../../utils/filePrefix";

const optionsAdd = ["Member addition"];
const options = ["Create group", "Send invite"];

const CreateGroupModal = ({ children, groupData }) => {
  const { type, clearModal } = useGroupAction();
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const { userData } = useCurrentUser();
  const [groupName, setGroupName] = useState(null);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const isLoadingMember = false;
  const [selectedMember, setSelectedMember] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const { mutateAsync: searchChat } = useGetAllChatHistoryByName();
  const {
    allChatHistory,
    setChatHistoryFilter,
    allChatHistoryFilter,
  } = useContext(SocketContext);
  const [allMember, setAllMember] = useState([]);
  // for api
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  // switch view
  const [currentOption, setCurrentOption] = useState(
    type === "add" ? "Member addition" : "Create group"
  );

  useEffect(() => {
    type === "add"
      ? setCurrentOption("Member addition")
      : setCurrentOption("Create group");

    return () => {
      setCurrentOption(null);
    };
  }, [type]);

  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    clearModal();
    setCurrentOption(null);
  };

  const selectOption = (opt) => {
    setCurrentOption(opt);
  };


  // convert all info to multiselect readable data
  useEffect(() => {
    const result = (
      allChatHistoryFilter?.length > 0 && searchValue
        ? allChatHistoryFilter
        : allChatHistory
    )
      ?.filter((el) => el?.STAFF_ID !== userData?.data?.STAFF_ID)
      ?.map((user) => {
        user.value = user?.STAFF_ID;
        user.label = user?.FIRST_NAME + " " + user?.FILE_NAME;

        return user;
      });

    setAllMember([...result]);
  }, [allChatHistory, allChatHistoryFilter, searchValue, userData]);

  const createGroup = async () => {
    try {
      const json = {
        "group_name": groupName,
        "company_id": userData?.data?.COMPANY_ID,
        "staff" : selectedMemberIds?.join(),
        "staff_id": userData?.data?.STAFF_ID
      }
        const res = await createGroupChatAction(json)
        if(res){
          showSuccess('Group created successfully')
          setGroupName(null)
          setSelectedMember([])
          setSelectedMemberIds([])
        }
    } catch (error) {
      console.log(error);
    }
  };


  const addGroupmember = async () => {
    try {
      const json = {
        "company": userData?.data?.COMPANY_ID, 
        "member": selectedMemberIds?.join(),
        "staff" : userData?.data?.STAFF_ID,   
        "group_id": groupData?.GROUP_ID, 
      }
        const res = await addGroupMemberAction(json)
        if(res){
          showSuccess('member added successfully')
          setGroupName(null)
          setSelectedMember([])
          setSelectedMemberIds([])
        }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectMember = (member) => {
    const userIDs = member?.map((each) => each?.value);
    const users = [...member];
    setSelectedMember(users);
    setSelectedMemberIds(userIDs);
  };

  const removeSelectedMember = (key)=>{
    setSelectedMember([...selectedMember.filter(u => u.key !== key)])
    setSelectedMemberIds([...selectedMemberIds.filter(u=> u !== key)])
  }

  const searchConversation = async (value) => {
    try {
      if (value.length < 2) return;

      const data = { ...userData?.data, SEARCH: value };
      const res = await searchChat(data);
      if (res) {
        setChatHistoryFilter(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = debounce((searchTerm) => {
    searchConversation(searchTerm);
  }, 2500);

  const onSelectSearch = (value) => {
    setSearchValue(value);
    if(value){
      setLoadingComplete(true)
    }else(setLoadingComplete(false))
    handleSearch(value);
  };

  return (
    <div className="">
      <Space>
        <div onClick={showLargeDrawer}>{children}</div>
      </Space>
      <Drawer
        title={``}
        placement="right"
        size={size}
        style={{ background: "#f7f7f7" }}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col gap-5  px-4 ">
          <div className="flex flex-col font-Roboto">
            <div className="text-2xl font-bold">
              {type === "add" ? "Add group member" : "Create group"}{" "}
            </div>
            <div className="text-gray-400 font-medium">
              You can add as many as 10 members to this group
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px]  gap-7 h-full">
            <div
              className={`flex flex-col border shadow-xl bg-white rounded-md ${
                type && "py-5"
              }  `}
            >
              {type !== "add" ? (
                <div className="flex flex-col p-4 border-b-2 border-gray-300">
                  <div className="flex flex-col sm:flex-row gap-2  sm:gap-6 justify-between ">
                    <div className=" text-base font-medium w-32">
                      Group name
                    </div>
                    <div className="flex-1">
                      <Input
                        allowClear={true}
                        size="large"
                        onChange={(e) => setGroupName(e.target.value)}
                      ></Input>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col p-4 py-6 border-b border-gray-300" onBlur={()=>setLoadingComplete(false)}>
                <div className="flex justify-end mb-1">
                  <Input
                    allowClear={true}
                    onChange={(e) => onSelectSearch(e?.target?.value)}
                    size="medium"
                    placeholder="Filter User"
                    className="w-[50%]"
                  ></Input>
                </div>
                <div className="flex flex-col sm:flex-row gap-2  sm:gap-6  justify-between ">
                  <div className=" text-base font-medium w-32">Add members</div>
                  <div className="flex-1 flex flex-col gap-7">
                    <MemberMultiselect
                      allUsers={allMember}
                      onPickMember={onSelectMember}
                      allUsersLoading={isLoadingMember}
                      memberInpForUi={selectedMember}
                      onSelectSearch={onSelectSearch}
                      loadingComplete={loadingComplete}
                      setLoadingComplete={setLoadingComplete}
                    />
                    <div className="flex flex-wrap gap-4">
                      <div className="flex gap-2 items-center flex-wrap">
                        {selectedMember?.map((mcard) => (
                          <div key={mcard?.key} className="flex flex-col gap-1 items-center justify-center bg-gray-300/90 p-1 rounded-md w-[55px] relative">
                            <MdCancel className="absolute -top-1 -right-1 hover:text-red-500 cursor-pointer" onClick={()=>removeSelectedMember(mcard?.key)}/>
                            <Avatar
                              alt={mcard?.label?.split(' ')[0]}
                              className="flex-shrink-0"
                              size="sm"
                              name={mcard?.label?.split(' ')[0]}
                              src={
                                mcard?.label?.split(' ')[1]
                                  ? filePrefix + mcard?.label?.split(' ')[1]
                                  : ""
                              }
                            />
                            <span className="text-xs font-medium text-center w-[50px] truncate">{`${mcard?.label?.split(' ')[0]}`}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4  gap-4">
                <label className="flex gap-6">
                  <Checkbox />
                  <div className="text-sm">
                    Notify members via Prompt when sent
                  </div>
                </label>
                <label className="flex gap-6">
                  <Checkbox />
                  <div className="text-sm">Notify by sms</div>
                </label>
              </div>
            </div>
            <div className="h-[100px] sm:h-[300px]">
              <div className=" h-full border-l-1 border-gray-400  ">
                <div className="flex flex-col py-5 md:py-10 text-sm gap-3 ml-2 ">
                  {(type === "add" ? optionsAdd : options)?.map((pk) => (
                    <div
                      key={pk}
                      className={`${
                        currentOption === pk && "font-bold"
                      } relative cursor-pointer`}
                      onClick={() => selectOption(pk)}
                    >
                      <span className=" ml-3">{pk}</span>

                      <span
                        className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                          currentOption === pk
                            ? "bg-green-700/80"
                            : "bg-gray-300"
                        }  border-1 border-gray-400 absolute -left-[0.9rem] top-1 duration-200 transition-all`}
                      ></span>
                      {/* )} */}
                    </div>
                  ))}
                  <div>
                    {" "}
                    {
                      type === "add" ? 
                    <button
                      onClick={addGroupmember}
                      disabled={selectedMemberIds.length < 1}
                      className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[10px] disabled:bg-[#00bcc2]/70 leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
                    >
                      Add 
                    </button> :
                    <button
                      onClick={createGroup}
                      disabled={!groupName || selectedMemberIds.length < 2}
                      className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[10px] disabled:bg-[#00bcc2]/70 leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
                    >
                      Send Invite
                    </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CreateGroupModal;
