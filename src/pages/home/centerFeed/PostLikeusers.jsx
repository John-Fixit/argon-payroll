/* eslint-disable react/prop-types */
import { Drawer } from "antd";
import { useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Avatar } from "@nextui-org/react";
import { filePrefix } from "../../../utils/filePrefix";

const PostLikeusers = ({ open, onClose , likesData}) => {
  const [currentOption, setCurrentOption] = useState("Users");
  const {userData} = useCurrentUser()
  const CloseModal = () => {
    onClose();
    setCurrentOption("Users");
  };

  return (
    <Drawer
      title={``}
      placement="right"
      size={"large"}
      style={{ background: "#f7f7f7" }}
      onClose={CloseModal}
      open={open}
    >
      <div className="flex flex-col gap-1  px-4 ">
        <div className="flex flex-col font-Roboto">
          <div className="text-2xl font-bold">{currentOption} </div>
          <div className="text-gray-400 font-medium">
          </div>
        </div>

        <div className="grid grid-cols-1  gap-7 h-full ">
          <div className={`flex flex-col border shadow-xl bg-white rounded-md p-4 py-6 gap-5 h-[83vh] overflow-auto`}>
            {
                likesData?.filter(dt => dt?.USER_ID !== userData?.data?.STAFF_ID).map(like =>(
                    <div key={like?.USER_ID} className="flex justify-between">
                        <div className="flex flex-col">
                            <div className="flex gap-2 items-center">
                                <div>
                                    {
                                        like?.FILE_NAME ? 
                                        <Avatar size="sm" src={(filePrefix + like?.FILE_NAME) ||  "https://i.pravatar.cc/150?u=a04258114e29026702d"} /> 
                                        :
                                        <Avatar size="sm" name={like?.FIRST_NAME?.trim()[0]}  className=" cursor-pointer" />
                                        }
                                </div>
                                <div>
                                    <span>{like?.FIRST_NAME + ' ' + like?.LAST_NAME}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                ))
            }         
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default PostLikeusers;
