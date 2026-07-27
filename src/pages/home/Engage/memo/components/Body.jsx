/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Avatar } from "@nextui-org/react";
import styles from "./body.module.css";
import { FaRegFileAlt } from "react-icons/fa";

const Body = ({ showEditBtn, handleOpenDrawer }) => {
  return (
    <>
      <div className={`flex-1 shadow-lg p-3 mb-10 overflow-y-scroll ${styles.custom_scrollbar}`}>
        <div className="bg-white p-8 relative">
          <div className="absolute top-0 right-2 my-2">
            {!showEditBtn ? (
              <div className="flex">
              <FaRegFileAlt className="text-red-700" size={'2.5rem'}/>
              <div className="w-[8rem] h-7 border border-black my-auto cursor-pointer" onClick={() => handleOpenDrawer("edit_memo")}>

              </div>
              <div className="flex items-center">
                {/* <Button
                  size="sm"
                  startContent={<MdModeEditOutline size={"1rem"} />}
                  onClick={() => handleOpenDrawer("edit_memo")}
                  className="bg-[#4aa2ee] text-[#fff]"
                >
                  Edit
                </Button> */}
              </div>

              </div>
            ) : null}
          </div>
          <div className="header_address">
            <p className="font-semibold text-base">Memorandum</p>
            <table border={0} className="leading-10 w-full">
              <tr>
                <td>To: </td>
                <td>Wanda Paul, Chief of Operations</td>
              </tr>
              <tr>
                <td>From: </td>
                <td>Michael Singleton, Chief, Internal Audit</td>
              </tr>
              <tr>
                <td>Date: </td>
                <td>31/01/2024</td>
              </tr>
              <tr>
                <td>Subject: </td>
                <td className="font-bold text-base">
                  This is the subject of this memorandum template
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <hr className="my-3 border-t-2 border-gray-500" />
                </td>
              </tr>
            </table>
          </div>
          <div className="body_of_memo font-Exotic text-base">
            <p className="indent-6">
              I trust this letter finds you well. We would like to inform you of
              the outcomes of our recent annual warehouse physical inventory
              observation, conducted on [Date] at [Warehouse Location].{" "}
            </p>
            <p className="indent-6">
              The purpose of this annual inventory check was to ensure accuracy
              and accountability in our inventory management processes.{" "}
            </p>
            <p className="indent-6">
              We are pleased to report that the physical inventory count aligned
              closely with our recorded inventory levels, demonstrating a high
              level of accuracy in our tracking systems. Our dedicated team
              worked diligently to conduct thorough checks, reconcile
              discrepancies, and address any issues promptly.
            </p>
            <br />
            <p>Kind regards,</p>
            <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
          </div>

          <div className="flex gap-4 justify-end mt-4 items-center">
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className=""
              size="lg"
            />
            <Avatar
              src="https://i.pravatar.cc/150?u=a04258114e29026302d"
              size="md"
            />
            <p className="my-auto text-[16px] cursor-pointer" onClick={()=>handleOpenDrawer("review")}>+ 2 Others</p>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Body;
