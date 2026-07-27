/* eslint-disable no-unused-vars */
import {useState} from 'react'

import { Avatar } from "@nextui-org/react";
import PropTypes from "prop-types";
import { IoCopyOutline } from "react-icons/io5";

const Message = ({ each }) => {
const [copyText,setCopyText]=useState('copy')
  const initials = (person) => {
    const firstNameInitial = person?.first_name?.charAt(0).toUpperCase();
    const lastNameInitial = person?.last_name?.charAt(0).toUpperCase();
    return `${firstNameInitial}${lastNameInitial}`;
  };

  const copyToClipBoard=(text)=>{
  
  navigator.clipboard.writeText(text).then(()=>{
  setCopyText('copied!')
  setTimeout(()=>{
  setCopyText('copy')
  },2000)
  }).catch(err=>console.log('Fail to copy text:',err))
  }
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 font-medium my-2">
        <Avatar
          color={initials(each.handler) == "AI" ? "primary" : "warning"}
          name={initials(each.handler)}
        />

        <span className="text-medium">
          {initials(each.handler) == "AI" ? "Spark A.I" : "You"}
        </span>
      </div>

      <div
        className={`rounded-lg p-2 text-white inline-block ${
          each.handler.first_name == "Artifical"
            ? "bg-blue-500"
            : "bg-yellow-500"
        } relative`}
      >
        {each.message}
          <div className="inline-block absolute -bottom-5 right-2 cursor-pointer group" onClick={()=>copyToClipBoard(each.message)}>
          <span className="py-[2px] px-2 bg-white text-gray-600 rounded-xl absolute bottom-6 -right-4 shadow hidden group-hover:inline-block transition-all ease-in-out">{copyText}</span>
            <IoCopyOutline color="gray" size={18} />
          </div>
      </div>
    </div>
  );
};

export default Message;
Message.propTypes = {
  each: PropTypes.object,
};
