/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar } from "@nextui-org/react";
import styles from "./body.module.css";

const ReviewMemo = ({ showEditBtn, handleOpenDrawer }) => {
  return (
    <>
      <div
        className={`flex-1 shadow-md p-3 mb-10 overflow-y-scroll ${styles.custom_scrollbar}`}
      >
        <div className="bg-white p-8 relative">
          <div className="absolute top-0 right-2 mb-3">
            {!showEditBtn ? (
              <div className="flex space-x-2">
                <div className="w-[8rem] h-8 border border-red-500 border-2 my-auto text-center my-auto cursor-pointer " ></div>
                <div className="w-[8rem] h-8 bg-green-500 my-auto"></div>
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
        </div>
      </div>
      <div className="shadow-md bg-white p-3">
        <h3 className="text-2xl mb-3">Signed</h3>
        <div className="flex space-x-7 flex-wrap">
          {[1, 2]?.map((item, index) => (
            <div className="flex flex-col space-y-1 items-center" key={index + "_"}>
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                className="w-[4rem] h-[4rem] text-large"
              />
              <span className="font-Exotic font-medium">Adebisi Salami</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewMemo;
