// /* eslint-disable no-unused-vars */
import { Send } from "lucide-react";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Input, Spinner } from "@nextui-org/react";
import CreatePostDrawer from "./components/CreatePostDrawer";
import { Chip } from "@nextui-org/react";
import { BsStars } from "react-icons/bs";
import { useDisclosure } from "@nextui-org/react";
import { MdCancel, MdOutlinePostAdd } from "react-icons/md";
import { useCreatePost } from "../../../lib/query/queryandMutation";
import useCurrentUser from "../../../hooks/useCurrentUser";

const CreatePost = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [desc, setDesc] = useState("");
  const [bg, setBg] = useState(null);
  const {userData} = useCurrentUser()
  const [backgroundMode, setBackgroundMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('bg-yellow-600');
  const [showBackgroundOption, setShowBackgroundOption] = useState(false);
  const {mutateAsync: create, isPending} = useCreatePost()


  const triggerBackground = ()=>{
    setShowBackgroundOption(!showBackgroundOption)
    if (backgroundMode) {
      setBackgroundMode(!backgroundMode)
      setBg(null)
    }else{
      setTimeout(() => {
        setBackgroundMode(!backgroundMode)
        setBg('yellow')
      }, 1000);
    }
  }

  const setcolor = (c1, c2)=>{
    setBackgroundColor(c1)
    setBg(c2)
  }

  const handleCreatePost = async ()=>{
    try {
      if(isPending) return
      const res =   await create({file: null, content: desc, bg, STAFF_ID: userData?.data?.STAFF_ID})
      if(res){
        setDesc('')
        setBg(null)
        setShowBackgroundOption(!showBackgroundOption)
        setBackgroundMode(false)
      }
    } catch (err) {
      console.log(err?.response?.data)
    }
  }

  return (
    <div className={`flex flex-col rounded-md px-5 p-10 md:px-10 space-y-3  bg-white dark:bg-cardDarkColor shadow-sm z-0`}>
      <div className="flex justify-between ">
        <div className=" space-x-6 flex">
          <h6 className=" text-xl font-bold inline-block">Create Post</h6>
        </div>
      </div>
      {backgroundMode ? (
        <div>
          <div className={`h-[250px] ${backgroundColor} opacity-50 flex items-center justify-center rounded-lg`}>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              maxLength={200}
              className="bg-transparent text-center border-none outline-none text-xl content-center min-h-36 w-full overflow-visible  text-wrap flex items-center justify-center caret-white  resize-none text-white font-bold px-4 py-4 "
              autoFocus
            ></textarea>
          </div>
        </div>
      ) : (
        <div>
          <div
            onClick={onOpen}
            className="flex items-center  bg-xinputLight rounded cursor-pointer"
          >
            <Input
              className=" !cursor-pointer hover:!cursor-pointer border-0 outline-none  "
              onClick={onOpen}
              type="text"
              autoFocus={false}
              placeholder="Write Something Here..."
            />
          </div>
        </div>
      )}
      <div className="relative">
        <div className="flex gap-x-5">
            <Chip
              onClick={triggerBackground}
              className="h-[2rem]  transition-all flex items-center cursor-pointer duration-200"
              variant="flat"
              avatar={
                <div className="pt-4 flex space-x-2  items-center">
                  <div className={`w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br opacity-50 flex items-center justify-center ${backgroundMode ?'bg-red-400' : 'bg-yellow-600'}  `}>
                    {
                      backgroundMode ? <MdCancel color="white" /> : <BsStars color="white" />
                    }
                    
                  </div> 
                </div>
              }
            >
              { (
                <span className={`${backgroundMode ? 'text-red-400' : 'text-gray-600 '} font-medium px-[0.2rem]`}>
                  {
                    backgroundMode ? 'Cancel' : "Quicknote"
                  }
                </span>
              )}
            </Chip>
            <Chip
              onClick={onOpen}
              className="h-[2rem]   transition-all flex items-center cursor-pointer duration-200"
              variant="flat"
              avatar={
                <div className="pt-4  flex space-x-2 items-center">
                  <div className={`w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br opacity-50 flex items-center justify-center ${backgroundMode ?'bg-red-400' : 'bg-blue-600/90'}  `}>
                    {
                      <MdOutlinePostAdd color="white" />
                    }
                  </div> 
                </div>
              }
            >
              { (
                <span className={`${backgroundMode ? 'text-red-400' : 'text-gray-600 '} font-medium px-[0.2rem]`}>
                  {
                    "Post"
                  }
                </span>
              )}
            </Chip>
        </div>

        <div className={`postBgOptions ${ showBackgroundOption && 'postBgOptionsShow'} `}>
        <ul className="flex space-x-2">
                      <li onClick={()=>setcolor("bg-yellow-600", "yellow")} className="bg-yellow-200 text-white p-1 rounded-full cursor-pointer">
                        <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-yellow-600 opacity-50 flex items-center justify-center">
                          <BsStars color="white" />
                        </div>
                      </li>
                      <li onClick={()=>setcolor("bg-blue-600", "blue")} className="bg-blue-300 text-white p-1 rounded-full cursor-pointer">
                        <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-blue-600 opacity-50 flex items-center justify-center">
                          <BsStars color="white" />
                        </div>
                      </li>
                      <li onClick={()=>setcolor("bg-purple-600", "purple")} className="bg-purple-300 text-white p-1 rounded-full cursor-pointer">
                        <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-purple-600 opacity-50 flex items-center justify-center">
                          <BsStars color="white" />
                        </div>
                      </li>
                      <li onClick={()=>setcolor("bg-red-600", "red")} className="bg-red-200 text-white p-1 rounded-full cursor-pointer">
                        <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-red-600 opacity-50 flex items-center justify-center">
                          <BsStars color="white" />
                        </div>
                      </li>
                      <li onClick={()=>setcolor("bg-green-600", "green")} className="bg-green-300 text-white p-1 rounded-full cursor-pointer">
                        <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-green-600 opacity-50 flex items-center justify-center">
                          <BsStars color="white" />
                        </div>
                      </li>
                      <li  onClick={()=>setcolor("bg-cyan-800", "cyan")} className="bg-cyan-300 text-white p-1 rounded-full cursor-pointer">
                        <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-cyan-800 opacity-50 flex items-center justify-center">
                          <BsStars color="white" /> 
                        </div>
                      </li>
                    </ul>
            </div>
           {
            backgroundMode && 
           <div className="flex justify-end mt-9">
              <button onClick={handleCreatePost} disabled={isPending || !desc} className="px-6 py-2 rounded outline-none  flex space-x-2 items-center cursor-pointer bg-btnColor tracking-wider text-white hover:shadow focus:bg-blue-600 disabled:bg-gray-200 disabled:cursor-not-allowed">
                  {
                      isPending ? <Spinner size="sm" classNames={{circle1:'border-white/80'}}  /> :  <Send size={15} /> 
                    }
                <span className="font-semibold text-sm">Create Post</span>
              </button>
            </div>
           } 
      </div>
      <div className="z-[55]">
        <CreatePostDrawer isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
      </div>
    </div>
  );
};

export default CreatePost;
