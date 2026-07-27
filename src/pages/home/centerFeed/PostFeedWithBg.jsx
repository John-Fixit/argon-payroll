/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const PostFeedWithBg = ({data}) => {
const [bg, setBg] = useState(0)
const availableBg = [
    'bg-blue-600',
    'bg-purple-600',
    'bg-red-600',
    'bg-green-600',
    'bg-cyan-800',
    'bg-gray-800',
    'bg-yellow-600',
]

useEffect(() => {
    if(data?.BACKGROUND_COLOR){
        switch (data?.BACKGROUND_COLOR) {
            case 'blue':
                setBg(0) 
                break;
            case 'purple':
                setBg(1) 
                break;
            case 'red':
                setBg(2) 
                break;
            case 'green':
                setBg(3) 
                break;
            case 'cyan':
                setBg(4)    
                break;
            case 'gray':
                setBg(5) 
                break;
            case 'yellow':
                setBg(6) 
                break;
            default:
                break;
        }
    }
}, [data?.BACKGROUND_COLOR])

  return (
    <div className="w-full h-[18rem] ">
          <div className={`h-full ${availableBg[bg]} opacity-50 flex items-center justify-center`}>
            <div className="px-10 py-4  text-white  text-xl  h-full w-full text-center flex  items-center justify-center font-semibold   ">
                {data?.POST_CONTENT}
            </div>
          </div>
    </div>
  )
}

export default PostFeedWithBg
