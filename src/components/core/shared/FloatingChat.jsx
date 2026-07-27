import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  createSupportGroupChatAction,
  getGroupChatHistoryAction,
} from "../../../API/group-chat";
import useCurrentUser from "../../../hooks/useCurrentUser";
import GroupWithSlider from "../../../pages/home/Engage/GroupWithSlider";
import { useGetUnReadChatSupport } from "../../../API/chat";
import { SocketContext } from "../../../context/SocketContext";
// import ChatDrawer from '../../../pages/home/rightMenu/components/ChatDrawer'
// import Group from '../../../pages/home/Engage/Group'

// const supportChatOld = {
//   DEPARTMENT: "HUMAN RESOURCES",
//   DIRECTORATE: "DIRECTORATE OF AIRWORTHINESS STANDARD",
//   FILE_NAME: "315814496_230283670043609_6530875609273764186_n.jpg",
//   FIRST_NAME: "",
//   IS_ONLINE: 1,
//   LAST_NAME: "Support Team",
//   LAST_SEEN: 1727187252,
//   STAFF_ID: 1
// }

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
      STAFF_ID: 2406,
    },
    {
      FILE_NAME: "Akwaugo-Mgbeokwere-CPA-ICT.JPG",
      FIRST_NAME: "AKWAUGO",
      LAST_NAME: "MGBEOKWERE",
      STAFF_ID: 1699,
    },
  ],
};

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

export function FloatingChat() {
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [selectedChat, setSelectedChat] = useState(supportGroupChat);
  const [supportcard, setSupportcard] = useState(false);
  const { userData } = useCurrentUser();
  const location = useLocation();
  const { setChatGroupHistory, onGroupPage } = useContext(SocketContext);
  const { data, refetch } = useGetUnReadChatSupport({
    staff_id: userData?.data?.STAFF_ID,
  });

  // const route = useNavigate()

  useEffect(() => {
    refetch();
    return () => {};
  }, [userData, refetch]);

  const callActiveGroup = async () => {
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
        });

        const uniqueIds = new Set();
        const uniqueArray = incoming.filter((obj) => {
          if (!uniqueIds.has(obj.GROUP_ID)) {
            uniqueIds.add(obj.GROUP_ID);
            return true;
          }
          return false;
        });

        setChatGroupHistory([...uniqueArray]);

        for (let i = 0; i < uniqueArray.length; i++) {
          const element = uniqueArray[i];
          onGroupPage(element?.GROUP_ID);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openChat = async () => {
    try {
      const json = {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
      };
      const res = await createSupportGroupChatAction(json);
      if (res) {
        setShowLargeChatContainer(true);
        setSupportcard(true);
        await callActiveGroup();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const routeTogroup = async ()=>{
  //   try {
  //     const json = {
  //       company_id: userData?.data?.COMPANY_ID,
  //       staff_id: userData?.data?.STAFF_ID
  //     }
  //     const res = await createSupportGroupChatAction(json)
  //     if(res){
  //       route("/messaging/engage/group")
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // Don't show on Login page
  if (location.pathname === "/login" || location.pathname === "/introduction")
    return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        // onClick={routeTogroup}
        onClick={() => openChat(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-br from-purple-500 to-pink-500  text-white rounded-full shadow-lg z-10 group w-[4.7rem] h-[4.7rem] flex items-center justify-center animate-bounce "
        style={{ animationDuration: "2500ms" }}
      >
        <div className="relative">
          <div>
            <MessageCircleMore size={37} className="text-white text-2xl" />
          </div>
        </div>

        {data?.data?.data?.CHAT_COUNT > 0 && (
          <div className="absolute  -top-1 -right-1 min-w-5 min-h-5 bg-btnColor flex justify-center items-center text-white rounded-lg text-xs font-bold">
            {data?.data?.data?.CHAT_COUNT}
          </div>
        )}
      </motion.button>
      <div className="fixed bottom-2 right-14 px-2 py-1 bg-supportIconBg-[200] text-pink-500 rounded-full shadow-lg z-10 font-bold animate-bounce">
        Chat with Support
      </div>

      <GroupWithSlider
        isOpen={showLargeChatContainer}
        onClose={() => setShowLargeChatContainer(false)}
        user={selectedChat}
        setUser={() => setSelectedChat(null)}
        fromSupport={supportcard}
        setFromSupport={setSupportcard}
      />

      {/* <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
          fromSupport={supportcard}
          setFromSupport={setSupportcard}
        /> */}
    </>
  );
}

// <>
// <motion.button
//   initial={{ scale: 0, opacity: 0 }}
//   animate={{ scale: 1, opacity: 1 }}
//   whileHover={{ scale: 1.1 }}
//   whileTap={{ scale: 0.9 }}
//   // onClick={routeTogroup}
//   onClick={() => openChat(true)}
//   className="fixed bottom-6 right-6 p-4 bg-supportIconBg text-white rounded-full shadow-lg z-10 group"
// >
//   {/* <div >
//     <MessageCircleMore className="w-6 h-6" />
//   </div> */}

//   <div className="relative">
//               {/* Chat Icon Container */}
//               <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
//                 <MessageCircleMore className="text-white text-xl" />
//               </div>
//               {/* Glow effect on hover */}
//               <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
//   </div>

//   {
//     data?.data?.data?.CHAT_COUNT > 0  &&
//   <div className="absolute  -top-1 -right-1 min-w-5 min-h-5 bg-btnColor flex justify-center items-center text-white rounded-lg text-xs font-bold">
//     {data?.data?.data?.CHAT_COUNT}
//   </div>
//   }

// </motion.button>
//     <div className="fixed bottom-2 right-14 px-2 py-1 bg-supportIconBg-[200] text-gray-400 rounded-full shadow-lg z-10 font-bold">
//         Chat with Support
//     </div>

//  <GroupWithSlider
//     isOpen={showLargeChatContainer}
//     onClose={() => setShowLargeChatContainer(false)}
//     user={selectedChat}
//     setUser={() => setSelectedChat(null)}
//     fromSupport={supportcard}
//     setFromSupport={setSupportcard}
//   />

//  {/* <ChatDrawer
//     isOpen={showLargeChatContainer}
//     onClose={() => setShowLargeChatContainer(false)}
//     user={selectedChat}
//     setUser={() => setSelectedChat(null)}
//     fromSupport={supportcard}
//     setFromSupport={setSupportcard}
//   /> */}
// </>
