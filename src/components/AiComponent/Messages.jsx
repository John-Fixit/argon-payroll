/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import Message from './Message';
import { useEffect, useRef } from 'react';
const Messages = ({selectedChat}) => {
const targetRef=useRef(null)
useEffect(() => {
if (selectedChat) {
  targetRef.current.scrollIntoView({ behavior: 'smooth' });
}
}, [selectedChat,targetRef])
  return (
    <>
{selectedChat.messages&&selectedChat.messages.map((each,id)=>(
<Message key={id} each={each} />
))}
<div ref={targetRef} />
</>
  )
}

export default Messages

Messages.propTypes={
selectedChat:PropTypes.object,
}