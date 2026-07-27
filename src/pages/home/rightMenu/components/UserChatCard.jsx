/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { filePrefix } from "../../../../utils/filePrefix";
import { MessageCircleMore } from "lucide-react";

export const UserChatCard = ({ShowChatPopup, data}) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  // const openChat = ()=>{
  //   setIsFollowed(!isFollowed)
  //   setTimeout(() => {
  //     ShowChatPopup()
  //   }, 500);
  // }


  // const filePrefix = "http://lamp3.ncaa.gov.ng/pub/"
  return (
    <Card shadow="none" className="max-w-[280px] border-none bg-transparent">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
           {
          //  data?.FILE_NAME?.includes("http") ? (

          data.LAST_NAME === "Support Team" ? 
          <Avatar
            size="md"
            className='bg-supportIconBg  text-white' icon={<MessageCircleMore className="w-6 h-6 text-white " />}
          /> :
           data?.FILE_NAME  ? (
                <Avatar
                  size="md"
                  src={
                    filePrefix + data?.FILE_NAME
                  }
                  title={data?.LAST_NAME + " " + data?.FIRST_NAME}
                />
              ) : (
                <Avatar
                  size="md"
                  name={data?.FIRST_NAME?.trim()[0]}
                  className="cursor-pointer"
                  title={data?.LAST_NAME + " " + data?.FIRST_NAME}
                />
            )}


          {/* <Avatar isBordered radius="full" size="md" src="https://i.pravatar.cc/150?u=a04258114e29026702d" /> */}
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{data?.LAST_NAME}</h4>
            <h5 className="text-small tracking-tight text-default-500">{data?.FIRST_NAME}</h5>
          </div>
        </div>
        {/* <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={openChat}
        >
          {isFollowed ? "Opening.." :  "Chat" }
        </Button> */}
      </CardHeader>
      <CardBody className="px-3 py-0">
        <div className="text-small pl-px text-default-500 flex flex-col gap-y-2" >
          <div className="text-gray-400 text-xs ">{data?.DEPARTMENT}</div>
          <div className="text-gray-500 text-xs mb-2">
            {data?.DIRECTORATE}
          </div>
       
          {/* Full-stack developer, @getnextui lover she/her */}
          {/* <span aria-label="confetti" role="img">
    
          </span> */}
        </div>
      </CardBody>
      {/* <CardFooter className="gap-4 flex items-center ">
        <div className="flex gap-1 items-center">
          <p className="font-semibold text-default-600 text-small ">4</p>
          <p className=" text-default-500 text-small p-0 m-0">Following</p>
        </div>
        <div className="flex gap-1 items-center">
          <p className="font-semibold text-default-600 text-small">97.1K</p>
          <p className="text-default-500 text-small p-0 m-0">Followers</p>
        </div>
      </CardFooter> */}
    </Card>
  );
};
