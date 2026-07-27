/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useContext, useState } from "react";
import { format } from "date-fns";
import ImageModal from "../../../../../components/modals/ImageModal";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import { ImFilePdf } from "react-icons/im";
import { BsFiletypeDoc } from "react-icons/bs";
import { BsFiletypeDocx } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { GrDocumentZip } from "react-icons/gr";
import { Download } from "lucide-react";
import { SocketContext } from "../../../../../context/SocketContext";
import { useDeleteChat } from "../../../../../lib/query/queryandMutation";
import ConfirmDeleteModal from "../../../../../components/core/shared/ConfirmDelete";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";


const MBox = ({ 
  data, isLarge,
}) => {

  const { userData } = useCurrentUser();

  const {
    isOpen: isConfirmDeleteModalOpen,
    onOpen: openConfirmDeleteModal,
    onClose: onConfirmDeleteModalCancel,
  } = useDisclosure();


  const { mutateAsync: removeChat, isPending:isDeletingChat } = useDeleteChat();
  const {deleteAGroupChat} = useContext(SocketContext);

  const [imageModalOpen, setImageModalOpen] = useState(false);




  const isOwn = data?.SENDER_ID === userData?.data?.STAFF_ID;




  const container = clsx('flex gap-3 p-4 group' , isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'hidden');
  const avatarOwn = clsx(isOwn ? 'block' : 'hidden');
  const body = clsx('flex flex-col gap-2 relative', isOwn && 'items-end');
  const message = clsx(
    `text-sm w-fit  overflow-hidden border shadow-messagecard
    ${
      isOwn ? 'bg-white' : "bg-black/5"
    }
    ${
      data.MESSAGE?.length > 40 && "max-w-[70%]"
    }`,
    data?.FILE_NAME &&
      !data?.MESSAGE &&
      (data?.FILE_NAME?.includes(".pdf") ||
        data?.FILE_NAME?.includes(".doc") ||
        data?.FILE_NAME?.includes(".csv") ||
        data?.FILE_NAME?.includes(".docx") ||
        data?.FILE_NAME?.includes(".zip"))
      ? `
    ${
      (isOwn ? "bg-transparent text-gray-700" : `bg-transparent`,
      data.FILE_NAME
        ? "rounded-md p-0"
        : isOwn
        ? "rounded-xl rounded-br-none py-2 px-3"
        : "rounded-xl rounded-bl-none py-2 px-3")
    }`
      : isOwn
      ? "bg-gray-100 text-gray-700"
      : "bg-gray-300",
    data.FILE_NAME
      ? "rounded-md p-0"
      : isOwn
      ? "rounded-xl rounded-br-none py-2 px-3"
      : "rounded-xl rounded-bl-none py-2 px-3"
  );



  const onDocClick = (url, name) => {
    const pdfUrl = url;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute("target", "_blank");
    link.download = name; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const deleteChat =async () => {
    try {
        if(isDeletingChat) return;
        onConfirmDeleteModalCancel()
        const res = await removeChat({
          "chat_id":  Number(data?.CHAT_ID),
          "staff_id": userData?.data?.STAFF_ID      
        })
        if(res){
          deleteAGroupChat(data)
        }
    } catch (error) {
      console.log(error)
    }
  }



  return ( 
    <div className="flex flex-col ">
      <div className={container}>
        <div className={avatar}>
          {data?.FILE_NAME?.includes("/http") ? (
            <Avatar size="sm" src={data?.FILE_NAME} />
          ) : (
            <Avatar
              className="w-6 h-6"
              name={''}
            />
          )}
        </div>
        <div className={body}>
          <div className="flex items-center gap-1">
          </div>
          <div className={message}>
            <div className="text-green-700 text-[0.65rem]">
            {/* LAST_NAME FIRST_NAME */}

            {
             '~' + (data?.LAST_NAME ?? "" )+ ' ' + (data?.FIRST_NAME ?? "")
            }

            </div>
            <ImageModal  src={data?.FILE_NAME} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
            {data?.FILE_NAME && data?.MESSAGE ? (
              <div className="p-1 group">
                <div>
                  <div>
                    {data?.FILE_NAME?.includes(".jpg") ||
                    data?.FILE_NAME?.includes(".jpeg") ||
                    data?.FILE_NAME?.includes(".png") ? (
                      <div className="relative">
                        <img
                          alt="Image"
                          height="158"
                          width="158"
                          onClick={() => setImageModalOpen(true)}
                          src={data.FILE_NAME}
                          className="
                              object-cover 
                              cursor-pointer 
                              hover:scale-110 
                              transition 
                              translate
                            "
                        />

                        <div
                          onClick={() =>
                            onDocClick(
                              data?.FILE_NAME.includes("http") && data?.FILE_NAME,
                              data?.FILE_NAME
                            )
                          }
                          className="absolute bottom-1 right-1 hidden group-hover:block  rounded-full bg-gray-100 p-1 cursor-pointer"
                        >
                          <Download size={20} />
                        </div>
                      </div>
                    ) : (
                      (data?.FILE_NAME?.includes(".pdf") ||
                        data?.FILE_NAME?.includes(".doc") ||
                        data?.FILE_NAME?.includes(".csv") ||
                        data?.FILE_NAME?.includes(".docx") ||
                        data?.FILE_NAME?.includes(".zip")) && (
                        <div className="flex gap-x-4 flex-wrap space-y-1 mt-5 items-center">
                          <div className="relative">
                            <div
                              onClick={() =>
                                onDocClick(
                                  data?.FILE_NAME?.includes("http")
                                    ? data?.FILE_NAME
                                    : "/assets/doc/doc1.pdf",
                                  data?.FILE_NAME
                                )
                              }
                              alt=""
                              className="border py-2 shadow-sm rounded flex  items-center gap-1 px-2 cursor-pointer bg-white"
                            >
                              {data?.FILE_NAME?.includes("pdf") ? (
                                <ImFilePdf className="text-red-500" />
                              ) : data?.FILE_NAME?.includes("doc") ? (
                                <BsFiletypeDoc className="text-blue-500" />
                              ) : data?.FILE_NAME?.includes("docx") ? (
                                <BsFiletypeDocx className="text-blue-500" />
                              ) : data?.FILE_NAME?.includes("csv") ? (
                                <GrDocumentCsv className="text-blue-500" />
                              ) : (
                                data?.FILE_NAME?.includes("zip") && (
                                  <GrDocumentZip className="text-blue-500" />
                                )
                              )}

                              <span>
                                {isLarge
                                  ? data?.FILE_NAME
                                  : data?.FILE_NAME?.slice(0, 20)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-2 px-1">
                    <span>{data.MESSAGE}</span>
                  </div>
                </div>
                <div className={body}>
                  <div className="text-xs text-gray-400  my-2 px-1">
                    {format(new Date(parseInt(data?.CHAT_TIME * 1000)), "paa")}
                  </div>
                </div>
              </div>
            ) : data?.FILE_NAME ? (
              <div className="group">
                {data?.FILE_NAME?.includes(".jpg") ||
                data?.FILE_NAME?.includes(".jpeg") ||
                data?.FILE_NAME?.includes(".png") ? (
                  <div className="relative">
                    <img
                      alt="Image"
                      height="158"
                      width="158"
                      onClick={() => setImageModalOpen(true)}
                      src={data.FILE_NAME}
                      className="
                        object-cover 
                        cursor-pointer 
                        hover:scale-110 
                        transition 
                        translate
                      "
                    />

                    <div
                      onClick={() =>
                        onDocClick(
                          data?.FILE_NAME.includes("http") && data?.FILE_NAME,
                          data?.FILE_NAME
                        )
                      }
                      className="absolute bottom-1 right-1 hidden group-hover:block   rounded-full bg-gray-100 p-1 cursor-pointer"
                    >
                      <Download size={20} />
                    </div>
                  </div>
                ) : (
                  data.FILE_NAME.includes(
                    "pdf" || "doc" || "csv" || "docx" || "zip"
                  ) && (
                    <div className="flex gap-x-4 flex-wrap space-y-1 mt-5 items-center">
                      <div className="relative">
                        <div
                          onClick={() =>
                            onDocClick(
                              data?.FILE_NAME.includes("http")
                                ? data?.FILE_NAME
                                : "/assets/doc/doc1.pdf",
                              data?.FILE_NAME
                            )
                          }
                          alt=""
                          className="border py-2 shadow-sm rounded flex  items-center gap-1 px-2 cursor-pointer"
                        >
                          {data?.FILE_NAME.includes("pdf") ? (
                            <ImFilePdf className="text-red-500" />
                          ) : data?.FILE_NAME.includes("doc") ? (
                            <BsFiletypeDoc className="text-blue-500" />
                          ) : data?.FILE_NAME.includes("docx") ? (
                            <BsFiletypeDocx className="text-blue-500" />
                          ) : data?.FILE_NAME.includes("csv") ? (
                            <GrDocumentCsv className="text-blue-500" />
                          ) : (
                            data?.FILE_NAME.includes("zip") && (
                              <GrDocumentZip className="text-blue-500" />
                            )
                          )}

                          <span>
                            {isLarge
                              ? data?.FILE_NAME
                              : data?.FILE_NAME?.slice(0, 20)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}

                <div className={body}>
                  <div className="text-xs text-gray-400 py-2 px-2">
                    {format(new Date(parseInt(data?.CHAT_TIME * 1000)), "paa")}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>{data.body}</div>
                <div>{data.MESSAGE}</div>
                <div className={body}>
                  <div className="text-xs text-gray-400">
                    {format(new Date(parseInt(data?.CHAT_TIME * 1000)), "paa")}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-min h-min absolute -bottom-6 hidden group-hover:block">
            {/* {
             data?.SENDER_ID === userData?.data?.STAFF_ID  && (
                    <Popover placement="bottom ">
                      <PopoverTrigger>
                        <div className=" hover:bg-slate-600 cursor-pointer rounded-full">
                          <IoEllipsisHorizontalSharp
                            size={20}
                            className="text-slate-400 hover:text-slate-100"
                          />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex flex-col w-30 justify-center  items-start ">
                          <Button color="" onClick={openConfirmDeleteModal}>
                            <AiTwotoneDelete size={18} className="w-4" />
                            <span className="text-gray-600"> Delete</span>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
             )
            } */}
          </div>
        </div>
        <div className={avatarOwn}>
          <Avatar size="sm"  src={data?.sender?.image} />
        </div>
      </div>
      <ConfirmDeleteModal
        subject={"Are you sure? chat will be deleted"}
        isOpen={isConfirmDeleteModalOpen}
        handleOk={deleteChat}
        handleCancel={onConfirmDeleteModalCancel}
        loading={isDeletingChat}
      />
    </div>
   );
}

export default MBox;
