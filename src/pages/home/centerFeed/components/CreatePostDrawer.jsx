/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "@nextui-org/react";
import CreatePostWithFormatter from "./CreatePostWithFormatter";

import { Camera, Send } from "lucide-react";

import { Chip } from "@nextui-org/react";
import { BsStars } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { useRef, useState } from "react";
import { useCreatePost } from "../../../../lib/query/queryandMutation";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import axios from "axios";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
import { baseURL } from "../../../../utils/filePrefix";

export default function CreatePostDrawer({ isOpen, onOpenChange, onClose }) {
  //
  const [desc, setDesc] = useState("");
  const [bg, setBg] = useState(null);
  const { userData } = useCurrentUser();

  const [file, setFile] = useState(null);

  const [backgroundMode, setBackgroundMode] = useState(false);
  const [showBackgroundOption, setShowBackgroundOption] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("bg-yellow-600");

  const { mutateAsync: create, isPending } = useCreatePost();

  const fileInputRef = useRef(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadFile(formData);
    if (res) {
      return res;
    }
  };

  const uploadFile = async (formData) => {
    try {
      const res = await axios({
        method: "post",
        url: baseURL +"attachment/addChatFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: userData?.token,
        },
      });

      if (res) {
        return res.data;
      }
    } catch (err) {
      if (
        err?.response?.data?.message !==
        "There was an error uploading your file"
      )
        toast.error(err?.response?.data?.message);
    }
  };

  const setcolor = (c1, c2) => {
    setBackgroundColor(c1);
    setBg(c2);
  };


  

  const triggerBackground = () => {
    setShowBackgroundOption(!showBackgroundOption);

    if (backgroundMode) {
      setBackgroundMode(!backgroundMode);
      setDesc("");
      setBg(null);
    } else {
      setTimeout(() => {
        setBackgroundMode(!backgroundMode);
        setDesc("");
        setBg("yellow");
      }, 1000);
    }
  };

  const handleCreatePost = async () => {
    try {

      if(isPending) return


      let fileUrl;

      if (file) {
        fileUrl = await upload();
      }

      const res = await create({
        file: fileUrl?.file_url_id,
        content: desc,
        bg,
        STAFF_ID: userData?.data?.STAFF_ID,
      });

      if (res) {
        setDesc("");
        setBg(null);
        setFile(null);
        setBackgroundMode(false)
        onClose();
      }
    } catch (err) {
      console.log(err?.response?.data);
    }
  };




  const handleChange = ()=>{
    setBackgroundMode(false)
    setShowBackgroundOption(false)
    onOpenChange()
  }


  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset input
    }
  };

  return (
    <div className="!z-[55555]">
      <Modal
        size="3xl"
        placement="top"
        className="!z-[55555] py-5 px-4"
        isOpen={isOpen}
        onOpenChange={handleChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Post
              </ModalHeader>
              <ModalBody className="pb-6">
                {backgroundMode ? (
                  <div
                    className={`h-[250px] ${backgroundColor} opacity-50 flex items-center justify-center rounded-lg`}
                  >
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      maxLength={200}
                      className="bg-transparent text-center border-none outline-none text-xl content-center min-h-36 w-full overflow-visible  text-wrap flex items-center justify-center caret-white  resize-none text-white font-bold px-4 py-4 "
                      autoFocus
                    ></textarea>
                  </div>
                ) : (
                  <div className="h-full">
                      <CreatePostWithFormatter
                        desc={desc}
                        setDesc={setDesc}
                        file={file}
                        setFile={setFile}
                      />
                  </div>

                )}
              </ModalBody>

              <div >
                        <div>
                          {file && (
                            <div className="relative w-20 h-20">
                              <img
                                className="w-20 h-20"
                                alt=""
                                src={URL.createObjectURL(file)}
                              />
                              <CiCircleRemove
                                size={22}
                                strokeWidth={2.4}
                                className="text-red-400 absolute -right-4 top-0 cursor-pointer"
                                onClick={() => {
                                  URL.revokeObjectURL(file)
                                  setFile(null)
                                } 
                              }
                              />
                            </div>
                          )}
                        </div>
              </div>

              <div className={`flex ${backgroundMode ? 'justify-start' : 'justify-end' }  gap-x-4 items-end w-full`}>

                <div className={` ${backgroundMode ? 'w-full' : ''}`}>
                <div className="relative mt-5 w-full flex justify-between flex-wrap gap-y-2  items-start">


                  <div className="">

                    <Chip
                      onClick={isPending ? () => {} : triggerBackground}
                      className="h-[2rem]  transition-all flex items-center cursor-pointer duration-200"
                      variant="flat"
                      avatar={
                        <div className="pt-4 flex space-x-2">
                          <div
                            className={`w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br opacity-50 flex items-center justify-center ${
                              backgroundMode ? "bg-red-400" : "bg-yellow-600"
                            }  `}
                          >
                            {backgroundMode ? (
                              <MdCancel color="white" />
                            ) : (
                              <BsStars color="white" />
                            )}
                          </div>
                        </div>
                      }
                    >
                      {
                        <span
                          className={`${
                            backgroundMode ? "text-red-400" : "text-gray-600 "
                          } font-medium`}
                        >
                          {backgroundMode ? "Cancel" : "Quicknote"}
                        </span>
                      }
                    </Chip>

                    <div
                      className={`postBgOptions  ${
                        showBackgroundOption && "postBgOptionsShow"
                      } `}
                    >
                      <ul className="flex space-x-2">
                        <li
                          onClick={() => setcolor("bg-yellow-600", "yellow")}
                          className="bg-yellow-200 text-white p-1 rounded-full cursor-pointer"
                        >
                          <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-yellow-600 opacity-50 flex items-center justify-center">
                            <BsStars color="white" />
                          </div>
                        </li>
                        <li
                          onClick={() => setcolor("bg-blue-600", "blue")}
                          className="bg-blue-300 text-white p-1 rounded-full cursor-pointer"
                        >
                          <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-blue-600 opacity-50 flex items-center justify-center">
                            <BsStars color="white" />
                          </div>
                        </li>
                        <li
                          onClick={() => setcolor("bg-purple-600", "purple")}
                          className="bg-purple-300 text-white p-1 rounded-full cursor-pointer"
                        >
                          <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-purple-600 opacity-50 flex items-center justify-center">
                            <BsStars color="white" />
                          </div>
                        </li>
                        <li
                          onClick={() => setcolor("bg-red-600", "red")}
                          className="bg-red-200 text-white p-1 rounded-full cursor-pointer"
                        >
                          <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-red-600 opacity-50 flex items-center justify-center">
                            <BsStars color="white" />
                          </div>
                        </li>
                        <li
                          onClick={() => setcolor("bg-green-600", "green")}
                          className="bg-green-300 text-white p-1 rounded-full cursor-pointer"
                        >
                          <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-green-600 opacity-50 flex items-center justify-center">
                            <BsStars color="white" />
                          </div>
                        </li>
                        <li
                          onClick={() => setcolor("bg-cyan-800", "cyan")}
                          className="bg-cyan-300 text-white p-1 rounded-full cursor-pointer"
                        >
                          <div className="w-[1.3rem] h-[1.3rem] rounded-full bg-gradient-to-br bg-cyan-800 opacity-50 flex items-center justify-center">
                            <BsStars color="white" />
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>

                  {backgroundMode && (
                    <div className="flex justify-end mt-12">
                      <button
                        onClick={handleCreatePost}
                        disabled={isPending || (!desc || desc === "<p><br></p>")}
                        className="px-6 py-2 rounded outline-none  flex space-x-2 items-center cursor-pointer bg-btnColor tracking-wider text-white hover:shadow focus:bg-blue-600 disabled:bg-gray-200 disabled:cursor-not-allowed"
                      >
                        {isPending ? (
                          <Spinner
                            size="sm"
                            classNames={{ circle1: "border-white/80" }}
                          />
                        ) : (
                          <Send size={15} />
                        )}
                        <span className="font-semibold text-sm">
                          Create Post
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                </div>


                {
                  !backgroundMode &&
                    <div>
                        <div className="pt-3 flex justify-between flex-wrap cursor-pointer">
                          <label
                            htmlFor="img2"
                            className="px-6 py-2 rounded outline-none border inset-0  flex space-x-2 items-center cursor-pointer"
                            onClick={handleClick}
                          >
                            <Camera size={15} />
                            <span className="font-semibold text-sm">Image</span>
                          </label>
                        
                        </div>

                        <input
                          type="file"
                          className="hidden"
                          accept=".jpg, .jpeg, .png, .gif"
                          id="img2"
                          ref={fileInputRef}
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                }

                <div>
                
                {!backgroundMode && (
                  <button
                    onClick={handleCreatePost}
                    disabled={isPending || (!desc || desc === "<p><br></p>")}
                    className="px-2 md:px-6  h-10  rounded-md w-48 item-center justify-center outline-none  flex space-x-2 items-center cursor-pointer bg-btnColor tracking-wider text-white hover:shadow focus:bg-blue-600 disabled:bg-gray-200 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <Spinner
                        size="sm"
                        classNames={{ circle1: "border-white/80" }}
                      />
                    ) : (
                      <Send size={15} />
                    )}
                    <span className="font-semibold text-sm"> Create Post</span>
                  </button>
                )}
                </div>
                
              </div>

              <ModalFooter className="flex justify-between">
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
