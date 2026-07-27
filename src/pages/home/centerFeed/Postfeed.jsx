/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import { MessageSquare } from "lucide-react";
import { HiPaperAirplane } from "react-icons/hi";
import Comment from "./Comment";
import { useEffect, useRef, useState } from "react";
import { SlLike } from "react-icons/sl";
import PostModal from "../../../components/modals/PostModal";
import {
  AvatarGroup,
  Button,
  Avatar as NextAvatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import TimeAgo from "./TimeAgo";
import PostFeedWithBg from "./PostFeedWithBg";
import {
  useAddComment,
  useDeletePost,
  useLikePost,
  useLoadMoreComment,
} from "../../../lib/query/queryandMutation";
import useCurrentUser from "../../../hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useContext } from "react";
import { postContext } from "../../../context/Post";
import { IoReloadOutline } from "react-icons/io5";
import ChatDrawer from "../rightMenu/components/ChatDrawer";
import { baseURL, filePrefix } from "../../../utils/filePrefix";
import { IoMdMore } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
import ConfirmDeleteModal from "../../../components/core/shared/ConfirmDelete";

const Postfeed = ({ data, withoutImg, setOpenLikesModal, setLikeData }) => {
  const {isOpen:isConfirmDeleteModalOpen, onOpen:openConfirmDeleteModal, onClose: onConfirmDeleteModalCancel} = useDisclosure()
  const [showComment, setShowComment] = useState(false);
  const [msgValue, setMsgValue] = useState("");
  const { userData } = useCurrentUser();
  const { addAComment, deleteAPost, likeAPost, loadMoreComments } = useContext(postContext);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const { mutateAsync: add, isPending:isAddingComment } = useAddComment();
  const { mutateAsync: removePost, isPending:isDeletingPost } = useDeletePost();
  const { mutateAsync: like } = useLikePost();
  const { mutateAsync: loadComment, isPending: isLoadCommentPending }=useLoadMoreComment();
  const [selectedChat, setSelectedChat] = useState(null)
  const [showLargeChatContainer, setShowLargeChatContainer] = useState(false)
  const textareaRef = useRef(null);
  


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "20px"; // Set to minHeight explicitly
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120 // Max height in px
      )}px`;
    }
  }, [msgValue]);





  const addComment = async () => {
    try {
      if(isAddingComment) return
      const res = await add({
        comment: msgValue,
        postId: data?.POST_ID,
        STAFF_ID: userData?.data?.STAFF_ID,
      });
      if (res) {
        // console.log(res)
        setMsgValue("");
        addAComment(msgValue, userData, data?.POST_ID, res?.data?.comment_id);
        toast.success("comment added successfully");
        // setCurrentCommentEditData("")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async () => {
    try {
      const res = await like({
        POST_ID: data?.POST_ID,
        USER_ID: userData?.data?.STAFF_ID,
      });
      if (res) {
        likeAPost(
          data?.POST_ID,
          userData?.data,
          res?.data?.likes,
          res?.data?.total_likes
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreComment = async () => {
    try {
      const res = await loadComment({
        post_id: data?.POST_ID,
        limit: data?.COMMENTS?.length,
      });

      if (res) {
        loadMoreComments(data?.POST_ID, res?.data?.data?.COMMENTS);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setUserLikedata  = ()=>{
    setOpenLikesModal(true)
    setLikeData(data?.LIKES)
  }


  const deletePost = async  ()=>{
      try {

        if(isDeletingPost) return
        onConfirmDeleteModalCancel()
        const res = await removePost({
          post_id: data?.POST_ID,
          staff_id: userData?.data?.STAFF_ID,
        });

        // const res = true
        if(res){
          deleteAPost(data?.POST_ID);
          // toast.success("Post deleted successfully")
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to Delete post, please retry")
      }
  }


  return (
    <div className="flex flex-col rounded-md  py-6 gap-y-2 shadow-sm  bg-white dark:bg-cardDarkColor text-gray-600">
      <div className="flex flex-col rounded-md   space-y-3 ">
        {/* top */}
        <div className="flex justify-between px-9 ">
          <div className="flex gap-x-5">
            <div>
              <span className="rounded-full flex items-center relative">
                {
                  data?.FILE_NAME ? (
                    <NextAvatar
                      className="w-11 h-11"
                      src={filePrefix + data?.FILE_NAME || ""}
                      title={data?.LAST_NAME + " " + data?.FIRST_NAME}
                    />
                  ) : (
                    <NextAvatar
                      name={data?.FIRST_NAME?.trim()[0]}
                      className=" cursor-pointer w-11 h-11 text-large"
                      title={data?.LAST_NAME + " " + data?.FIRST_NAME}
                    />
                  )
                }
              </span>
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-gray-600 text-sm">
                {data?.LAST_NAME + " " + data?.FIRST_NAME}
              </span>

              <div className=" space-x-1 text-slate-300">
                <span className="text-xs font-semibold">
                  {data?.DIRECTORATE}
                </span>
              </div>

              {
                data?.POSTED_BY === userData?.data?.STAFF_ID &&  (
                  <div className="w-24">
                    <span className="text-xs text-gray-400 font-thin">
                      <TimeAgo timestamp={data?.DATE_POSTED} />
                    </span>
                  </div> 
                )
              }
              <span></span>
            </div>
          </div>

          {/* BACKGROUND_COLOR, POST_CONTENT */}

          <div className="flex items-center text-right">
            {
              data?.POSTED_BY !== userData?.data?.STAFF_ID &&  (
              <div className="w-24 text-right ">
                <span className="text-xs text-gray-500 font-thin">
                  <TimeAgo timestamp={data?.DATE_POSTED} />
                </span>
              </div>
              )
            }

                <div className="">
                  {
                    data?.POSTED_BY === userData?.data?.STAFF_ID && (
                      <Popover placement="bottom"   >
                        <PopoverTrigger>
                          <div className=" hover:bg-slate-300 p-1 cursor-pointer rounded-full">
                            <IoMdMore size={20} className="text-slate-400" />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="flex  flex-wrap w-30 justify-center  items-center ">
                            <Button color="" onClick={openConfirmDeleteModal}>
                              <AiTwotoneDelete size={18} color="red" />
                              <span className="text-red-600"> Delete</span>
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )
                  }
                </div>
          </div>
        </div>

        {data?.BACKGROUND_COLOR ? (
          <>
            <PostFeedWithBg data={data} />
          </>
        ) : (
          <>
            {data?.POST_FILE_NAME && !withoutImg && (
              <div className="w-full" onClick={() => setPostModalOpen(true)}>
                <img
                  src={
                    filePrefix + data?.POST_FILE_NAME || baseURL + "/attachments/1705920708.jpeg" ||
                    "/assets/images/profiles/avatar-07.jpg"
                  }
                  alt=""
                  className="w-full max-h-[22rem] object-cover object-top cursor-zoom-in"
                />
              </div>
            )}

            <div className="flex justify-between px-9">
            </div>
            <div className="px-9 text-gray-500">
              <span dangerouslySetInnerHTML={{ __html: data?.POST_CONTENT }} />
            </div>
          </>
        )}

        {/* data?.TOTAL_LIKES > 0 */}
        {false && (
          <div className="flex items-center px-9 py-3">
            <div className="flex ">
              {data?.LIKES?.slice(0, 3)?.map((lik) => (
                <div
                  key={lik?.USER_ID}
                  className="border-[1.5px] border-white rounded-full  -ml-[0.6rem] flex"
                  
                >
                  {lik?.FILE_NAME ? (
                    <NextAvatar
                      src={
                        lik?.FILE_NAME ||
                        "https://i.pravatar.cc/150?u=a04258114e29026702d"
                      }
                      title={lik?.LAST_NAME + " " + lik?.FIRST_NAME}
                    />
                  ) : (
                    <NextAvatar
                      name={lik?.FIRST_NAME?.trim()[0]}
                      className=" cursor-pointer"
                      title={lik?.LAST_NAME + " " + lik?.FIRST_NAME}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mx-3 py-3 ">
              <span className="font-bold text-sm">
                {data?.LIKES?.length > 3
                  ? `+${data?.TOTAL_LIKES - 3} people react to this post`
                  : data?.TOTAL_LIKES === 1 &&
                    `${data?.TOTAL_LIKES} person react to this post`}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-y border-[0.2px] border-opacity-90 border-y-xinputLight flex justify-between xl:px-30 px-8  md:px-12 items-center py-4 bg-post-react-color font-medium gap-x-2 md:gap-x-6 ">
        <div className="flex gap-x-2 items-center cursor-pointer relative">
          <Button
            onClick={likePost}
            radius="full"
            size="sm"
            className="bg-slate-50/90 "
          >
            {" "}
            <SlLike color="blue" size={20} />
            <span className="text-sm">
              {data?.TOTAL_LIKES === 0 ? "" : data?.TOTAL_LIKES}
            </span>{" "}
          </Button>
        </div>

        <div className="flex gap-x-2 items-center cursor-pointer">
          <Button
            onClick={() =>
              data?.COMMENTS?.length > 0 ? setShowComment(!showComment) : {}
            }
            radius="full"
            size="sm"
            className="bg-purple-50/40 "
          >
            {" "}
            <MessageSquare color="purple" size={18} />
            <span>
              Comment{" "}
              {data?.COMMENTS?.length > 0 && "(" + data?.COMMENTS?.length + ")"}{" "}
            </span>
          </Button>
        </div>
        <div className="flex gap-x-2 items-center">
              {
                 data?.LIKES?.slice(0,5)?.map(lik => (
                  <div key={lik?.USER_ID} className="border-[1.5px] border-white rounded-full  -ml-[0.6rem] flex"
                  >
                    <AvatarGroup>
                    {
                      lik?.FILE_NAME ? 
                      <Tooltip
                      showArrow={true}
                      placement='bottom'
                      content={lik?.LAST_NAME + " " + lik?.FIRST_NAME}
                    >
                       <NextAvatar size="sm" src={filePrefix +  lik?.FILE_NAME ||  "https://i.pravatar.cc/150?u=a04258114e29026702d"} /> 
                    </Tooltip> :
                     <>                       
                        <Tooltip
                        showArrow={true}
                        placement='bottom'
                        content={lik?.LAST_NAME + " " + lik?.FIRST_NAME}
                        >
                        <NextAvatar size="sm" name={lik?.FIRST_NAME?.trim()[0]}  className=" cursor-pointer" />
                      </Tooltip>
                     </>
                    }
                    </AvatarGroup>
                  </div>

                 ))
              }

            <div className="ml-1 py-3">
              <span className="font-bold text-sm cursor-pointer border-1 border-transparent hover:border-gray-200 rounded-full px-1"
                onClick={setUserLikedata}
              >
                {data?.LIKES?.length > 5
                  ? `+${data?.TOTAL_LIKES - 5}`
                  : data?.TOTAL_LIKES === 1 &&
                    ``}
              </span>
            </div>
        </div>
      </div>

      <div className="">
        {showComment && (
          <div>
            {data?.COMMENTS?.map((comment) => (
              <Comment key={comment?.COMMENT_ID} data={comment} />
            ))}

            {data?.TOTAL_COMMENTS > 10 &&
              data?.TOTAL_COMMENTS > data?.COMMENTS?.length && (
                <div className="grid place-items-center text-mainColor my-2 mb-4 ">
                  <div
                    className="flex gap-3 items-center cursor-pointer bg-xinputLight px-3 py-2 rounded-lg"
                    onClick={loadMoreComment}
                  >
                    <IoReloadOutline
                      className={`${isLoadCommentPending && "animate-spin"}  `}
                    />
                    <span>Load More Replies</span>
                  </div>
                </div>
              )}
          </div>
        )}

        <div className="flex justify-center items-center pt-3 relative gap-x-2">
          <div className="flex items-center py-3   bg-xinputLight rounded-md w-[80%] md:w-[85%] ">
            {/* <input
              name="msg"
              id="msg"
              value={msgValue}
              onChange={(e) => setMsgValue(e.target.value)}
              className="outline-none border-none bg-transparent  px-4 w-full placeholder:text-xs placeholder:text-main-text-color"
              type="text"
              placeholder="Write A Comment..."
            /> */}

            <textarea
              ref={textareaRef}
              rows={1}
              value={msgValue}
              onChange={(e) => setMsgValue(e.target.value)}
              className="outline-none border-none bg-transparent  px-4 w-full placeholder:text-xs placeholder:text-main-text-color resize-none "
              style={{
                height: 'auto',
                minHeight: '20px',
                maxHeight: '120px',
              }}
              placeholder="Write A Comment..."
            />
          </div>
          <button
            onClick={addComment}
            disabled={!msgValue || isAddingComment}
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
            <HiPaperAirplane size={18} className="text-white rotate-90" />
          </button>
        </div>
      </div>

      <PostModal
        data={data}
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
      />

    {
        <ChatDrawer
          isOpen={showLargeChatContainer}
          onClose={() => setShowLargeChatContainer(false)}
          user={selectedChat}
          setUser={() => setSelectedChat(null)}
        />
      }

      <ConfirmDeleteModal subject={"Are you sure? post will be deleted"} isOpen={isConfirmDeleteModalOpen} handleOk={deletePost}  handleCancel={onConfirmDeleteModalCancel} loading={isDeletingPost}/>
    </div>
  );
};

export default Postfeed;
