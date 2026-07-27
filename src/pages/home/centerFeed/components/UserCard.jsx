/* eslint-disable react/prop-types */
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";
import { BsCake2 } from "react-icons/bs";

const UserCard = ({openDrawer, user, setCurUser}) => {

const openWishDrawer = ()=>{
  setCurUser(user)
  openDrawer()
}

  return (
    <div className="px-6 h-[320px] w-[350px] relative bg-white">
      <Card
        isFooterBlurred
        className="h-[320px] w-[350px] bg-white p-0"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start bg-transparent">
          <p className="text-tiny text-white/60 uppercase font-bold ">
            {/* {user} */}
          </p>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-[350px] h-full object-cover"
          src={user?.FILE_NAME?.includes('https') ? user?.FILE_NAME  : "/assets/images/placeholder.jpg" || "assets/images/placeholder.jpg"}  
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 flex-1 items-center">
            <BsCake2 className="rounded-full w-10 h-11 bg-black/20 text-white" />
            <div className="flex flex-col">
              <p className="text-tiny text-white/80">{user?.LAST_NAME  + ' ' +  user?.FIRST_NAME}</p>
              <p className="text-tiny text-white/80">{user?.DESIGNATION_NAME}</p>
              <p className="text-md text-white/90">Happy Birthday!</p>
            </div>
          </div>
          <Button radius="full" size="sm" onClick={openWishDrawer}>
            Wish
          </Button>
        </CardFooter>
      </Card>
     </div>
  );
};

export default UserCard;
