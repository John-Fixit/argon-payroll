/* eslint-disable no-unused-vars */
import { IoIosSend } from "react-icons/io"
import PropTypes from 'prop-types';
import { useState } from "react";


const MessageInput = ({setJustStarted,selectedChat,setselectedChat,user}) => {
const [message, setMessage] = useState('');


const sendMessage=()=>{
if(message!==''){
if (selectedChat.messages) {
  setselectedChat({
title:selectedChat.title,
messages:[...selectedChat.messages,
{
handler:{
...selectedChat.messages[0].handler
},
message:message,
time: new Date(),
date:'7/10/2023',
},
]
},)
}else{

setselectedChat({
title:'New chat',
messages:[
{
handler:{
first_name:user.first_name,
last_name:user.last_name,
},
message:message,
time: new Date(),
date:'7/10/2023',
},
]
},)
}
setMessage('');
setJustStarted(prev=>{
if (prev==true) {
  return false
}
})
}
}

  return (
    <div className="relative p-2">
    <input type="text" name="" id=""   className="
          text-black
          font-light
          py-2
          px-4
          bg-transparent
          w-full 
          rounded-full
          focus:outline-none
          border
        "
        placeholder="What is your complaint?"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
       />
<div className="bg-gray-300 rounded-full inline-block p-1 absolute top-[14px] right-4 cursor-pointer">
<IoIosSend color="yellow" size={20} onClick={sendMessage} />
</div>
    </div>
  )
}

export default MessageInput

MessageInput.propTypes={
selectedChat:PropTypes.object,
setselectedChat:PropTypes.func,
setJustStarted:PropTypes.func,
user:PropTypes.object,
}