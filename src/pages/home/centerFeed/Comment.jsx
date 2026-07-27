/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  cn,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import CommentReply from "./CommentReply";
import TimeAgo from "./TimeAgo";
import { filePrefix } from "../../../utils/filePrefix";
import { Edit2 } from "lucide-react";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";
import ConfirmDeleteModal from "../../../components/core/shared/ConfirmDelete";
import { useDeletePostComment, useEditPostComment } from "../../../lib/query/queryandMutation";
import { postContext } from "../../../context/Post";
import toast from "react-hot-toast";
import useCurrentUser from "../../../hooks/useCurrentUser";

const Comment = ({ data, withReply }) => {
  const {isOpen:isConfirmDeleteModalOpen, onOpen:openConfirmDeleteModal, onClose: onConfirmDeleteModalCancel} = useDisclosure()
  const [msgValue, setMsgValue] = useState("");
  const { userData } = useCurrentUser();
  const [editedMsgData, seteditedMsgData] = useState(null);
  const { mutateAsync: removePostComment, isPending:isDeletingPostComment } = useDeletePostComment();
  // const { mutateAsync: updatePostComment, isPending:isUpdatingPostComment } = useEditPostComment();

  const {deleteAPostComment, editAPostComment  } = useContext(postContext);

  const textareaRef = useRef(null);





  const startEditcomment = (comment) => {
    // console.log(comment);
    seteditedMsgData(comment);
    setMsgValue(comment.MESSAGE);
  };


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "40px"; // Set to minHeight explicitly
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120 // Max height in px
      )}px`;
    }
  }, [msgValue]);

  const editComment = async  () => {
    try {

      // if(isUpdatingPostComment) return
      // const res = await updatePostComment({
      //   post_id: data?.POST_ID,
      //   comment_id: data.COMMENT_ID,
      //   msg: msgValue,
      //   staff_id: userData?.data?.STAFF_ID,
      // });

      const res = true
      if(res){
        editAPostComment(data?.POST_ID, data.COMMENT_ID, msgValue );
        seteditedMsgData(null);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to edit comment, please retry")
    }
  };

  const deleteComment = async  ()=>{
    try {

      if(isDeletingPostComment) return
      onConfirmDeleteModalCancel()
      const res = await removePostComment({
        post_id: data?.POST_ID,
        comment_id: data.COMMENT_ID,
        staff_id: userData?.data?.STAFF_ID,
      });
      // const res = true
      if(res){
        deleteAPostComment(data?.POST_ID, data.COMMENT_ID);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to Delete comment, please retry")
    }
  }

  return (
    <div className="">
      {/* latest */}
      <div className="flex justify-between px-9 pl-14  py-2 w-full">
        <div className="flex gap-x-5 !max-w-full w-full ">
          <div>
            <span className="rounded-full flex items-center relative">
              {data?.FILE_NAME ? (
                <Avatar
                  size="sm"
                  src={filePrefix + data?.FILE_NAME || ""}
                  title={data?.LAST_NAME + " " + data?.FIRST_NAME}
                />
              ) : (
                <Avatar
                  size="sm"
                  name={data?.FIRST_NAME?.trim()[0]}
                  className="text-xs"
                  title={data?.LAST_NAME + " " + data?.FIRST_NAME}
                />
              )}
            </span>
          </div>

          <div className={cn("flex flex-col gap-y-[0.1rem]", editedMsgData ? "w-full" : "w-fit")}>
            <div className={cn("flex flex-col text-sm space-y-2 bg-gray-100 rounded-t-xl px-3 py-2 rounded-br-xl", editedMsgData ? "w-full" : "w-fit")}>
              <span className="font-bold text-gray-500/90 text-sm">
                {data?.LAST_NAME +
                  " " +
                  data?.FIRST_NAME +
                  " " +
                  (data?.OTHER_NAMES || "")}
              </span>
              <div className=" space-y-2">
                {editedMsgData ? (
                  <div className="flex justify-center items-center pt-3 relative gap-x-2 w-full ">
                    <div className="flex items-center py-2   bg-white rounded-md w-full ">
                      <textarea
                        ref={textareaRef}
                        value={msgValue}
                        onChange={(e) => setMsgValue(e.target.value)}
                        className="outline-none border-none bg-transparent  px-4 w-full placeholder:text-xs  block placeholder:text-main-text-color resize-none"
                        // autoFocus
                        placeholder="Edit comment..."
                        style={{
                          height: 'auto',
                          minHeight: '40px',
                          maxHeight: '120px',
                          overflow: 'auto',
                        }}
                      />

                    

                    </div>
                    <button
                      onClick={editComment}
                      disabled={!msgValue}
                      type="submit"
                      className="
                              rounded-full 
                              p-2 disabled:bg-sky-300/20 
                              bg-sky-500
                              cursor-pointer 
                              hover:bg-sky-600 
                              transition
                            "
                    >
                      <HiPaperAirplane
                        size={18}
                        className="text-white rotate-90"
                      />
                    </button>
                  </div>
                ) : (
                  <span>{data?.MESSAGE}</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="block min-w-20">
                <span className="text-mainColor text-xs md:text-sm">
                  <TimeAgo timestamp={data?.DATE_POSTED} />
                </span>
              </div>

              <div>
                      {
                        data?.USER_ID === userData?.data?.STAFF_ID  && (
                          <div>
                            {editedMsgData ? (
                              <div
                                className="block cursor-pointer"
                                onClick={() => seteditedMsgData(null)}
                              >
                                <span className="text-mainColor text-xs">Cancel</span>
                              </div>
                            ) : (
                               
                              <Popover placement="bottom">
                                <PopoverTrigger>
                                  <div className=" hover:bg-slate-300 cursor-pointer rounded-full">
                                    <IoEllipsisHorizontalSharp
                                      size={20}
                                      className="text-slate-400"
                                    />
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <div className="flex flex-col w-30 justify-center  items-start ">
                                    {/* <Button color="" onClick={() => startEditcomment(data)}>
                                      <Edit2 size={18} className="w-4" />
                                      <span className="text-gray-600"> Edit</span>
                                    </Button> */}
                                    <Button color="" onClick={openConfirmDeleteModal}>
                                      <AiTwotoneDelete size={18} className="w-4" />
                                      <span className="text-gray-600"> Delete</span>
                                    </Button>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                        )
                      }
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* comment reply */}
      <div>
        {withReply && (
          <>
            <CommentReply
              name={"Sufiya Elija"}
              image={"/assets/images/profiles/avatar-05.jpg"}
            />
            <CommentReply
              name={"Sofaj Eliyya"}
              image={"/assets/images/profiles/avatar-08.jpg"}
            />
          </>
        )}
      </div>

      <ConfirmDeleteModal subject={"Are you sure? comment will be deleted"} isOpen={isConfirmDeleteModalOpen} handleOk={deleteComment}  handleCancel={onConfirmDeleteModalCancel} loading={isDeletingPostComment}/>
    </div>
  );
};

export default Comment;
