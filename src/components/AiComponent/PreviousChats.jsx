import PropTypes from 'prop-types'
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5'

const PreviousChats = ({chats,handleSelectChat}) => {

  return (
    <div className="">
    <div className='inline-flex items-center gap-2'><p className='text-medium font-semibold tracking-wide'>Previous chat</p><IoChatbubbleEllipsesSharp
                      size={18}
                      className="text-blue-500 mx-auto"
                    /></div>
    <ul className='flex flex-col gap-4 py-4'>
    {chats.map((chat,id)=>(
    <li key={id} className='flex items-center gap-2 border-b py-2 cursor-pointer' onClick={()=>handleSelectChat(chat.title)}>
     <span className="p-2  bg-blue-200 rounded-full">
                    <IoChatbubbleEllipsesSharp
                      size={20}
                      className="text-blue-500 mx-auto"
                    />
                  </span>
                  <div>            
    <p className='m-0 font-medium'>{chat.title.length>30?chat.title.substring(0,30)+'...':chat.title}</p>
    <p className='m-0 text-gray-400 text-xs'>{chat.messages[0].date}</p>
    
                  </div>
    </li>
    ))}
    </ul>
    </div>
  )
}

export default PreviousChats

PreviousChats.propTypes={
chats:PropTypes.array,
handleSelectChat:PropTypes.func,
}