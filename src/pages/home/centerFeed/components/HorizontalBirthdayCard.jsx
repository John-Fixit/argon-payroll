/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { useContext, useState } from "react";
import UserCard2 from "./UserCard2";
import { PiConfettiFill } from "react-icons/pi";
import BirthdayRoom from "../../Engage/BirthdayRoom/BirthdayRoom";
import { SocketContext } from "../../../../context/SocketContext";
import ChatDrawer from "../../rightMenu/components/ChatDrawer";
import useCurrentUser from "../../../../hooks/useCurrentUser";
// import Swiper JS
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slide.css";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

const HorizontalBirthdayCard = ({ data }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setCurrentPickedChat } = useContext(SocketContext);
  const [selectedChat, setSelectedChat] = useState(null);
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false);
  const [fromBirthday, setFromBirthday] = useState(true);
  const { userData } = useCurrentUser();

  const seaAll = () => {
    setIsDrawerOpen(true);
  };

  const selectAChat = (user) => {
    setShowLargeChatContainer(true);
    setSelectedChat(user);
  };

  const setCurrent = (data) => {
    if (data?.STAFF_ID !== userData?.data?.STAFF_ID) {
      // console.log(data)
      selectAChat(data);
      setCurrentPickedChat(data);
      setFromBirthday(true);
    }
  };

  return (
    <div className=" bg-white rounded-xl py-7   w-full shadow-sm">
      <div className=" flex items-center px-7 justify-between shadow-sm  py-1  pb-4 border-b">
        <div className="flex gap-x-2 items-center justify-between w-full">
          <div className="flex gap-x-2 items-center">
            <PiConfettiFill size={25} color="red" />
            <span className="text-lg font-bold">Birthday post</span>
          </div>
          <div className=" flex gap-2">
            <Button
              variant="light"
              size="sm"
              className="  px-2 !rounded-full"
              onClick={seaAll}
            >
              {" "}
              <span className="font-medium text-base px-2 text-gray-600 ">
                See all
              </span>
            </Button>
          </div>
        </div>
        <div></div>
      </div>
      <div className="py-7 bg-white flex justify-end relative w-full swiper-container ">
        <Swiper
          slidesPerView={"auto"}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          scrollbar={{ draggable: true }}
        >
          {data?.birthday?.map((brt) => (
            <SwiperSlide key={brt?.STAFF_ID} className="py-2">
              <UserCard2 user={brt} setCurUser={setCurrent} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {isDrawerOpen && (
        <BirthdayRoom isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      )}
      {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
          fromBirthday={fromBirthday}
          setFromBirthday={setFromBirthday}
        />
      }
    </div>
  );
};

export default HorizontalBirthdayCard;
