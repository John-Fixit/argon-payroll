/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Card, CardFooter, Image, Button, CardBody } from "@nextui-org/react";
import { PiBalloonFill } from "react-icons/pi";
import { filePrefix } from "../../../../utils/filePrefix";

const UserCard2 = ({ openDrawer, user, setCurUser }) => {
  const openWishDrawer = () => {
    setCurUser(user);
  };

  return (
    <div className=" h-[370px] w-[300px]  relative bg-white">
      <Card
        className="h-[370px] w-[300px]   bg-white p-0"
      >
        <CardBody className="bg-blue-500 flex  px-0 py-0 items-center justify-center">
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src={
              user?.FILE_NAME
                ? filePrefix + user?.FILE_NAME
                : "/assets/images/placeholder.jpg" ||
                  "/assets/images/placeholder.jpg"
            }
          />
        </CardBody>
        <CardFooter className="absolute bg-white bottom-0 z-10  py-3 ">
          <div className="flex flex-col gap-y-3 w-full">
            <div className="flex flex-grow gap-2 flex-1 items-center">
              <div className="rounded-full bg-red-400/60 text-white w-12 h-12 flex items-center justify-center gap-0">
                <PiBalloonFill
                  size={22}
                  className="text-red-500    -rotate-45"
                />
                <PiBalloonFill size={22} className="text-red-500  rotate-45" />
              </div>
              <div className="flex flex-col justify-start items-start">
                <p className="text-tiny ">
                  {user?.LAST_NAME + " " + user?.FIRST_NAME}
                </p>
                <p className="text-tiny text-gray-500/80  text-start">
                  {user?.DESIGNATION_NAME}
                </p>
              </div>
            </div>
            <Button
              fullWidth
              color="primary"
              className="bg-blue-500"
              radius="full"
              size="md"
              onClick={openWishDrawer}
            >
              Wish Happy Birthday
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserCard2;
