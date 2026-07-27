/* eslint-disable no-unused-vars */
// import React from 'react'

import { useState } from "react";
import PropTypes from "prop-types";
import Drawer from "../Request&FormComponent/Drawer";
import { RiMenu3Fill } from "react-icons/ri";
import PreviousChats from "./PreviousChats";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import Welcome from "./Welcome";
// import { chats } from "./data";
import "./ai.css";

const Chat = ({ chats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [justStarted, setJustStarted] = useState(true);
  const [user, setUser] = useState({
    first_name: "John",
    last_name: "Adeoye",
  });
  const [selectedChat, setselectedChat] = useState({});

  const handleSelectChat = (title) => {
    // console.log(title);
    setselectedChat(chats.find((chat) => chat.title == title));
  };
  return (
    <div>
      {justStarted ? (
        <Welcome
          setJustStarted={setJustStarted}
          selectedChat={selectedChat}
          user={user}
          setselectedChat={setselectedChat}
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2 relative">
            <div className="flex justify-end my-4">
              <RiMenu3Fill
                size={20}
                className="block md:hidden"
                onClick={() => setIsOpen(true)}
              />
            </div>
            <div className="h-[68vh] md:h-[70vh] overflow-y-auto px-2 customScrollbar">
              <Messages selectedChat={selectedChat} />
            </div>
            <MessageInput
              selectedChat={selectedChat}
              user={user}
              setselectedChat={setselectedChat}
              setJustStarted={setJustStarted}
            />
          </div>
          {/* chat history */}
          <div className="hidden md:block bg-white rounded-md p-4">
            <PreviousChats handleSelectChat={handleSelectChat} chats={chats} />
          </div>

          <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="p-4">
              <PreviousChats
                handleSelectChat={handleSelectChat}
                chats={chats}
              />
            </div>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default Chat;

Chat.propTypes = {
  chats: PropTypes.array,
};
