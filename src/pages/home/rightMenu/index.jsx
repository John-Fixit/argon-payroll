/* eslint-disable react-hooks/exhaustive-deps */
import { MessageCircleMore, Search } from "lucide-react";
import { RiArrowUpSLine, RiSunLine } from "react-icons/ri";
import MiniMessagePopup from "./components/MiniMessagePopup";
import { useContext, useEffect, useRef, useState } from "react";
import ChatDrawer from "./components/ChatDrawer";
import MiniMenuPopup from "./components/MiniMenuPopup";
import { MdCancel } from "react-icons/md";
import { useGetAllChatHistory, useGetAllChatHistoryByName } from "../../../lib/query/queryandMutation";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Avatar } from "@nextui-org/react";
import { SocketContext } from "../../../context/SocketContext";
import { useLocation } from "react-router-dom";
import { filePrefix } from "../../../utils/filePrefix";

const RightMenu = () => {
  const [showChatContainer, setShowChatContainer] = useState(false);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [showSearchInp, setShowSearchInp] = useState(false);

  
  //
  const { userData } = useCurrentUser();
  const { mutateAsync: allChatHistoryCall } = useGetAllChatHistory();
  const { mutateAsync: searchChat } = useGetAllChatHistoryByName();
  
  const [searchTerm, setSearchTerm] = useState('');
  
  // const [allChatHistory, setAllChatHistory] = useState([]);
  // const [allChatHistoryFilter, setAllChatHistoryFilter] = useState([]);
  
  
  const [selectedChat, setSelectedChat] = useState(null);
  const {allChatHistory, setChatHistory, setChatHistoryFilter, allChatHistoryFilter, setCurrentPickedChat} = useContext(SocketContext)
  const { pathname } = useLocation();
  const chatTimeRef = useRef()






  const  setCurrent = (data)=>{

    selectAChat(data)
    setCurrentPickedChat(data)
  }






  
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {

        if((pathname==='/engage/home' || pathname==='/engage/posts') && chatTimeRef.current !== 1){
            const res = await allChatHistoryCall(userData?.data);
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

              const all =  uniqueArray.map(el => {
                if(el.STAFF_ID === 1){
                 el.DEPARTMENT= "CUSTOMER SUPPORT",
                  el.DIRECTORATE= "",
                  el.LAST_NAME= "Support Team"
                  el.FIRST_NAME= ""
                    return el
                }
                return el
              } )
    
              setChatHistory([...all]);
              chatTimeRef.current = 1
            }
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchHistory();

    return ()=>{
      chatTimeRef.current = 0
    }
  }, [pathname]);
  
  




  
  const openLargeChatContainer = () => {
    setShowLargeChatContainer(true);
    setShowChatContainer(false);

  };
  





  
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };





  const searchConversation = async (value)=>{
    try {

        if(value.length < 2) return

        const data = {...userData?.data, SEARCH: value}
        const res = await  searchChat(data)
        if(res){
          // console.log(res?.data?.data)
          setChatHistoryFilter(res?.data?.data)
        }
    } catch (error) {
      console.log(error)
    }
  }



  const handleSearch = debounce((searchTerm) => {

    // console.log("Searching for:", searchTerm);

    searchConversation(searchTerm)

  }, 2500); 

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearch(value);
  };



  const toggleInp = ()=>{
    if(showSearchInp){
      setChatHistoryFilter([])
      setSearchTerm('')

    }
    setShowSearchInp(!showSearchInp)
  }



  const selectAChat = (user)=>{
    setShowLargeChatContainer(true);
    // setShowChatContainer(true)
    setSelectedChat(user)
  }

  // console.log(allChatHistory)


  // const filePrefix = "http://lamp3.ncaa.gov.ng/pub/"
  

  return (
    <div className=" bg-white h-fit   overflow-visible rounded-md py-6 space-y-3 pb-10  shadow px-6 top-24  sticky columns-1 hidden md:block">
      {/* xlg:space-y-8 */}

      <div className="flex-col space-y-6 relative  justify-center items-center  hidden  w-full">
        {/* xlg:items-start xlg:flex  */}
        <div className="flex justify-between text-gray-600 w-full">
          <div className="flex flex-col gap-1 leading-tight">
            <span className=" font-extrabold text-xl">Friends</span>
            <span className="text-xs tracking-wide font-thin">
              Start New Conversation
            </span>
          </div>

          <div className="flex gap-x-2 items-start">
            <div className="p-2 h-fit rounded-lg cursor-pointer bg-xinputLight  z-10 text-mainColor">
              <RiSunLine className=" z-20 " size={12} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-col relative   justify-center items-center   hidden  w-full">
        {/* xlg:flex xlg:items-start */}

        <div className="flex items-center h-full bg-xinputLight rounded-md w-full">
          <div className="mr-auto flex  h-full ">
            <button className="pl-3  py-3 outline-none rounded">
              {" "}
              <Search className=" text-mainColor" size={15} />
            </button>
          </div>
          <input
            name=""
            id=""
            className="outline-none border-none bg-transparent  px-4 w-full placeholder:text-xs py-3 placeholder:text-gray-400 text-gray-500"
            type="text"
            placeholder="Find Friends..."
          />
        </div>
      </div>

      <div className="flex-col   justify-center text-gray-500 items-center hidden w-full">
        {/* xlg:flex xlg:items-start  */}
        <div className="flex items-center h-full  justify-between w-full">
          <div>
            <span className="text-sm">Close friend</span>
          </div>
          <div className=" w-6 h-6 rounded-full flex items-center justify-center bg-xinputLight text-mainColor ">
            <RiArrowUpSLine />
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6 relative text-white  justify-center items-center  ">
        {/* xlg:items-start xlg:hidden */}
        <div
          className="bg-xinputLight h-12 w-12  flex items-center justify-center cursor-pointer  rounded-md"
          onClick={toggleInp}
        >
          {/* xlg:hidden */}

          {showSearchInp ? (
            <MdCancel size={15} className="text-gray-700" />
          ) : (
            <Search className="text-gray-600" size={15} />
          )}
        </div>




        {/* slide out */}
        <div
          className={`flex-col absolute  z-[99]  justify-center items-center   -top-6  w-full ${
            showSearchInp ? "chatbarInputShow" : "chatbarInput"
          }`}
        >
          {/* chatbarInput chatbarInputShow */}
          {/* xlg:flex xlg:items-start */}

          <div className="flex items-center h-full bg-xinputLight rounded-md w-full">
            <div className="mr-auto flex  h-full ">
              <button className="pl-3  py-3 outline-none rounded">
                {" "}
                <Search className=" text-mainColor" size={15} />
              </button>
            </div>
            <input
              name=""
              id=""
              onChange={handleChange}
              value={searchTerm}
              className="outline-none border-none bg-transparent   px-4 w-full placeholder:text-xs py-3 placeholder:text-gray-400 text-gray-500"
              type="text"
              placeholder="Find Conversation..."
            />
          </div>
        </div>
        {/* slide out */}





        <div className=" bg-xinputLight w-12 h-[0.09rem] block"></div>
        {/* xlg:hidden */}
      </div>

      <div className="flex flex-col gap-y-6 xxlg:gap-y-12 relative text-gray-500 justify-center items-center  w-full text-sm ">
        {/* xlg:items-start */}

        {(allChatHistoryFilter?.length > 0 ? allChatHistoryFilter  : allChatHistory?.slice(0, 19))?.filter((el)=> el?.STAFF_ID !== userData?.data?.STAFF_ID && el?.STAFF_ID !== 1)?.map?.((chatH) => (
          <MiniMenuPopup
            key={chatH.STAFF_ID}
            ShowChatPopup={() => setShowChatContainer(true)}
            data={chatH}
          >
            <div
              className=" relative rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer"
              onClick={()=>setCurrent(chatH)}
            >
              {
              chatH.LAST_NAME === "Support Team" ? 
              <Avatar
                size="lg"
                className='bg-supportIconBg  text-white' icon={<MessageCircleMore className="w-6 h-6 text-white " />}
              /> :

              chatH?.FILE_NAME  ? (
                <Avatar
                  size="lg"
                  src={
                    filePrefix + chatH?.FILE_NAME
                  }
                  title={chatH?.LAST_NAME + " " + chatH?.FIRST_NAME}
                />
              ) : (
                <Avatar
                  size="lg"
                  name={chatH?.FIRST_NAME?.trim()[0]}
                  className=" cursor-pointer"
                  title={chatH?.LAST_NAME + " " + chatH?.FIRST_NAME}
                />
              )}

                    {
                        chatH?.UNREAD_COUNT > 0  &&
                      <div className="absolute  -top-1 -right-1 min-w-5 min-h-5 bg-btnColor flex justify-center items-center text-white rounded-lg text-xs font-bold">
                        {chatH?.UNREAD_COUNT}
                      </div>
                      }
            </div>
          </MiniMenuPopup>
        ))}




































        {/* <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-05.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden">
  
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}

        {/* <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}> */}
        {/* <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-06.jpg"
            alt="adsimg" */}

        {/* // subsemi:grid-cols-[1.5fr_1fr] subsemi:gap-4  semi:grid-cols-[1.5fr_1fr] semi:gap-6 xmd:grid-cols-[1.5fr_1fr] xmd:gap-8 xm:grid-cols-[1.6fr_1fr]

          //   className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl" */}
        {/* // /> */}
        {/* w-14 subsemi:w-45 semi:w-50 xmd:w-60 xm:w-76 */}
        {/* <div className=" flex-col hidden "> */}
        {/* xlg:flex */}
        {/* <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}

        {/* <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-09.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}
        {/* 
      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-19.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup>

      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-12.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup>

      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-01.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup>

      <MiniMenuPopup ShowChatPopup={()=>setShowChatContainer(true)}>
        <div className=" rounded-2xl w-full flex gap-x-4 items-center justify-center cursor-pointer">
          <img
            src="/assets/images/profiles/avatar-11.jpg"
            alt="adsimg"
            className="inset-0 object-contain w-[85%] z-20 align-middle rounded-2xl"
          />
          <div className=" flex-col hidden ">
            <div className="font-extrabold">Paige Turner</div>
            <div className="text-xs">Alabama, USA</div>
          </div>
        </div>
      </MiniMenuPopup> */}
      </div>
      {showChatContainer && (
        <MiniMessagePopup
          user={selectedChat}
          expand={openLargeChatContainer}
          ShowChatPopup={setShowChatContainer}
        />
      )}

      {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={()=>setSelectedChat(null)}
        />
      }
    </div>
  );
};

export default RightMenu;
