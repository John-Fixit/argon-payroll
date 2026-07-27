import { useState, useContext } from 'react'
// import { motion } from 'framer-motion'
// import { MessageCircleMore } from 'lucide-react'
import { createSupportGroupChatAction, getGroupChatHistoryAction } from '../../../API/group-chat'
import useCurrentUser from '../../../hooks/useCurrentUser';
import GroupWithSlider from '../../../pages/home/Engage/GroupWithSlider'
import {SocketContext} from "../../../context/SocketContext"
import { BiChat } from 'react-icons/bi';


const supportGroupChat = {
    COUNT_MEMBERS: 3,
    GROUP_ID: 2,
    GROUP_NAME: "SUPPORT-1",
    LAST_CHAT: null,
    MEMBERS: [
      {
        FILE_NAME: "JOHNSON-OLUTOYIN-OLUSEYI-P.624.JPG",
        FIRST_NAME: "OLUTOYIN",
        LAST_NAME: "JOHNSON",
        STAFF_ID: 2406
      },
      {
        FILE_NAME: "Akwaugo-Mgbeokwere-CPA-ICT.JPG",
        FIRST_NAME: "AKWAUGO",
        LAST_NAME: "MGBEOKWERE",
        STAFF_ID: 1699,
      },
    ],
}




// const supportChat = {
//   DEPARTMENT: "CUSTOMER SUPPORT",
//   DIRECTORATE: "",
//   FILE_NAME: "315814496_230283670043609_6530875609273764186_n.jpg",
//   FIRST_NAME: "",
//   IS_ONLINE: 1,
//   LAST_NAME: "Support Team",
//   LAST_SEEN: 1727187252,
//   STAFF_ID: 1
// }

export function ChatMessageCard({isOthers}) {
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [selectedChat, setSelectedChat] = useState(supportGroupChat);
  const [supportcard, setSupportcard] = useState(false);
  const { userData } = useCurrentUser();
  const {setChatGroupHistory, onGroupPage} = useContext(SocketContext)
  

  const callActiveGroup = async  ()=>{
        try {
          const res = await getGroupChatHistoryAction(userData?.data);
          if (res) {
            const incoming = [...res.data]?.sort((a, b) => {
              if (a.LAST_CHAT === null && b.LAST_CHAT !== null) {
                  return 1; // a should come after b
              } else if (a.LAST_CHAT !== null && b.LAST_CHAT === null) {
                  return -1; // a should come before b
              } else if (a.LAST_CHAT === null && b.LAST_CHAT === null) {
                  return 0; // no change in order
              } else {
                  return a.LAST_CHAT.localeCompare(b.LAST_CHAT); // both values are non-null, compare them
              }
          })
    
            const uniqueIds = new Set();
            const uniqueArray = incoming.filter(obj => {
              if (!uniqueIds.has(obj.GROUP_ID)) {
                uniqueIds.add(obj.GROUP_ID);
                return true;
              }
              return false;
            });
    
            setChatGroupHistory([...uniqueArray]);
    
            for (let i = 0; i < uniqueArray.length; i++) {
              const element = uniqueArray[i];
              onGroupPage(element?.GROUP_ID)
            }
          }
        } catch (error) {
          console.log(error);
        }
  }

  const openChat = async  ()=>{
    try {
        const json = {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID
      }
      const res = await createSupportGroupChatAction(json)
      if(res){
        setShowLargeChatContainer(true)
        setSupportcard(true)
        await callActiveGroup()
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <div
      onClick={openChat}
      className="relative group overflow-hidden rounded-2xl bg-white shadow cursor-pointer transition-transform transform hover:scale-105 md:w-1/2"
    >
      <div className="p-3 flex items-center gap-5">
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* Chat Icon Container */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
              <BiChat className="text-white text-xl" />
            </div>
            {/* Glow effect on hover */}
            <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-800">
            Having challenge applying?
          </h4>
          <p className=" text-sm text-gray-600">Chat with support</p>
        </div>
      </div>
    </div>

       <GroupWithSlider
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
          fromSupport={supportcard}
          setFromSupport={setSupportcard}
        />
    </>
  )
} 