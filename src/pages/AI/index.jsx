
import Chat from "../../components/AiComponent/Chat"
import { chats } from "../../components/AiComponent/data"

const Ai = () => {
  return (
    <div>
    <Chat chats={chats}/>
    </div>
  )
}

export default Ai