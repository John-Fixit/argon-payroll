/* eslint-disable react/prop-types */


import clsx from "clsx";
import { useState } from "react";
import { format } from "date-fns";




import ImageModal from "../../../../../components/modals/ImageModal";
// import Avatar from "../../../../../components/Avatar";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { Avatar } from "@nextui-org/react";

import { ImFilePdf } from "react-icons/im";

import { BsFiletypeDoc } from "react-icons/bs";
import { BsFiletypeDocx } from "react-icons/bs";
import { GrDocumentCsv } from "react-icons/gr";
import { GrDocumentZip } from "react-icons/gr";
import { Download } from "lucide-react";



const MessageBox = ({ 
  data, isLarge, otherUser
}) => {

  const { userData } = useCurrentUser();

  const [imageModalOpen, setImageModalOpen] = useState(false);


  const isOwn = data?.SENDER_ID === userData?.data?.STAFF_ID;



  const container = clsx('flex gap-3 p-4 ' , isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'hidden');
  const avatarOwn = clsx(isOwn ? 'hidden' : 'hidden');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');

  // const message = clsx(
  //   `text-sm w-fit  overflow-hidden bg-white border shadow-messagecard  ${data.body?.length > 40 && 'max-w-[60%]'}`,
  //   isOwn ? 'bg-gray-100 text-gray-700' : 'bg-gray-100', 
  //   data.image ? 'rounded-md p-0' : isOwn ? 'rounded-xl rounded-br-none py-2 px-3' :  'rounded-xl rounded-bl-none py-2 px-3'
  // );
  const message = clsx(
    `text-sm w-fit  overflow-hidden border shadow-messagecard

    ${
      isOwn ? 'bg-white' : "bg-black/20"
    }
    
    ${
      data.MESSAGE?.length > 40 && "max-w-[60%]"
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
    // if (
    //   !url?.includes(".jpg") ||
    //   !url?.includes(".jpeg") ||
    //   !url?.includes(".png")
    // ) {
    // }
    link.setAttribute("target", "_blank");
    link.download = name; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };





  return ( 
    <div className={container}>
      <div className={avatar}>
        {/* <Avatar  user={data?.sender?.image} /> */}
        {otherUser?.FILE_NAME?.includes("http") ? (
          <Avatar size="sm" src={otherUser?.FILE_NAME} />
        ) : (
          <Avatar
            // size="sm"
            className="w-6 h-6"
            name={otherUser?.FIRST_NAME?.trim()[0]}

            // title={user?.LAST_NAME + " " + user?.FIRST_NAME}
          />
        )}
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          {/* <div className="text-sm text-gray-500">
            {data.sender.name}
          </div> */}
          {/* <div className="text-xs text-gray-400 ">
            {format(new Date(data.createdAt), 'paa')}
          </div> */}
        </div>
        <div className={message}>
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
                  {/* <TimeAgo timestamp={data?.CHAT_TIME}  /> */}
                  {/* {format(new Date(data?.CHAT_TIME), 'paa')} */}

                  {/* <ChatTime timestamp={data?.CHAT_TIME}  /> */}
                  {/* {format(new Date(), "paa")} */}
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
                  {/* <TimeAgo timestamp={data?.CHAT_TIME}  /> */}
                  {/* <ChatTime timestamp={data?.CHAT_TIME}  /> */}
                  {/* {format(new Date(data?.CHAT_TIME), "paa")} */}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>{data.MESSAGE}</div>
              <div className={body}>
                <div className="text-xs text-gray-400">
                  {format(new Date(parseInt(data?.CHAT_TIME * 1000)), "paa")}
                  {/* <TimeAgo timestamp={data?.CHAT_TIME}  /> */}
                  {/* <ChatTime timestamp={data?.CHAT_TIME}  /> */}
                  {/* {format(new Date(data?.CHAT_TIME), "paa")} */}
                </div>
              </div>
            </div>
          )}
          {/* {data.image ? (
            <img
              alt="Image"
              height="158"
              width="158"
              onClick={() => setImageModalOpen(true)} 
              src={data.image} 
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div >
                <div>
                    {data.body}
                </div>
                <div className={body}>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'paa')}
                    </div>
                </div>
            </div>
          )} */}
        </div>

        {/* {isLast && isOwn && seenList.length > 0 && (
          <div 
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )} */}
      </div>
      <div className={avatarOwn}>
        <Avatar  user={data?.sender?.image} />
      </div>

    </div>
   );
}
 
export default MessageBox;
