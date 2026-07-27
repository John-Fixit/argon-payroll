/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {Tooltip} from "@nextui-org/react";
import { UserChatCard } from "./UserChatCard";

export default function MiniMenuPopup({children, ShowChatPopup, data}) {
  // console.log(data)
  return (
    <Tooltip content={
      <UserChatCard ShowChatPopup={ShowChatPopup} data={data}/>
    } placement="left" showArrow>
      {children}
    </Tooltip>
  );
}