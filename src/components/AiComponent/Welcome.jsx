/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable react/no-unescaped-entities */
// import { Avatar } from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";
import Frame1 from "../../assets/images/Frame1.png";
import Frame2 from "../../assets/images/Frame2.png";
import Frame3 from "../../assets/images/Frame3.png";
import Frame4 from "../../assets/images/Frame4.png";
import PropTypes from "prop-types";
import MessageInput from "./MessageInput";
// import { useState } from "react";
const Welcome = ({ setJustStarted,selectedChat,setselectedChat,user }) => {
  // const [selected, setselected] = useState(0)
  const items = [
    {
      imgURL: Frame1,
      bgColor: "bg-blue-500",
      title: "AI Assistant",
      desc: "Fast way to know your diabetes state",
    },
    {
    imgURL: Frame2,
      bgColor: "bg-orange-500",
      title: "Review/compose CV",
      desc: "streamline recruitment unlock hidden potential.",
    },
    {
    imgURL: Frame3,
      bgColor: "bg-green-500",
      title: "Shopping AI",
      desc: "From personanalized recommendations to seamless navigation, discover a new era of convenience",
    },
    {
    imgURL: Frame1,
      bgColor: "bg-purple-800",
      title: "Dynamic Form",
      desc: "Fast way to know your diabetes state",
    },
    {
    imgURL: Frame4,
      bgColor: "bg-red-500",
      title: "Fraud Detection",
      desc: "Our cutting-edge tool detects anomalies, protects your assets, and ensures a secured future",
    },
    {
    imgURL: Frame2,
      bgColor: "bg-purple-500",
      title: "More",
      desc: "Check to see if you have trail of parkinsons",
    },
  ];

  return (
    <div className="font-poppins my-4">
      <div className="lg:px-12">
        <p className="text-blue-500 text-medium">
         I'm your AI powered legal assistant!
        </p>
        <p className="text-2xl font-medium">
          What do you need help with?
        </p>
        <MessageInput
          selectedChat={selectedChat}
          user={user}
          setselectedChat={setselectedChat}
          setJustStarted={setJustStarted}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[5rem] mb-6 px-12 relative">
        <div
          className={`absolute cursor-pointer bg-red-500 -top-12 right-5 md:right-12 rounded-full`}
        >
          <IoIosClose
            className="text-white font-thin"
            size={18}
            onClick={() => setJustStarted(false)}
          />
        </div>
        {items.map((item, i) => (
          <div key={i} className={`${item.bgColor} text-white rounded-lg flex flex-col justify-between`}>
           <div className="p-6">
            <h1 className="text-medium md:text-xl">{item.title}</h1>
            <p className="my-2 text-gray-100 md:text-medium">{item.desc}</p>
           </div>
            <div className=" w-[60%]">
            <img src={item.imgURL} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;

Welcome.propTypes = {
  setJustStarted: PropTypes.func,
  selectedChat:PropTypes.object,
setselectedChat:PropTypes.func,
user:PropTypes.object,
};
