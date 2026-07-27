/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button, Tooltip } from "@nextui-org/react";
import styles from "./body.module.css";
import React, { useState, useRef, useEffect } from "react";
import ExpandedDrawerWithButton from "../../../../../components/modals/ExpandedDrawerWithButton";
import SignatureView from "./SignatureView";
import ViewNotes from "./MemoNotes";
import AddNote from "./AddNote";
import generatePDF, { Margin } from "react-to-pdf";
import { MdSaveAlt } from "react-icons/md";
import { LuDelete } from "react-icons/lu";
import { Spinner } from "@nextui-org/react";

import {
  // Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { Modal } from "antd";
import { formatError } from "../../../../../utils/messagePopup";
import { MdOutlineDone } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const SignMemo = ({ showEditBtn, handleOpenDrawer, memo }) => {
  const selfMemo = memo?.created_by === "me";

  const targetRef = useRef();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const [approvals, setApprovals] = useState(memo?.approval ?? []);
  const [open, setOpen] = useState({ status: false, type: "" });
  const [hasSignature, setHasSignature] = useState(true);

  const sigCanvas = useRef({});

  const handleOpenPinModal = () => {
    if (!hasSignature && sigCanvas?.current?._sigPad?._isEmpty) {
      formatError("Signature can not be empty!!!");
    } else {
      onOpen();
    }
  };

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () => {
    if (hasSignature) {
      setApprovals((prev) => [
        ...prev,
        {
          signature:
            "https://artlogo.co/cdn/shop/files/Group_4c46736d-b4cd-4bc3-bff2-7700e63e314c_480x.svg?v=1681759898",
          name: "John Fixit",
        },
      ]);
    } else {
      const base64String = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      // Convert data URL to Blob
      const blob = dataURItoBlob(base64String);

      // Create Object URL
      const url = URL.createObjectURL(blob);

      // Now you can use the 'url' as the source for an <img> element, or any other place where you need a URL representation of the saved image
      setApprovals((prev) => [
        ...prev,
        { signature: url, name: "Femi Bejide" },
      ]);
      closeDrawer();
    }

    // setImageURL(base64String);
  };

  const openDrawer = (type) => {
    if (hasSignature) {
      handleOpenPinModal();
    } else {
      setOpen({ ...open, status: true, type });
    }
  };

  const closeDrawer = () => {
    setOpen({ ...open, status: false });
  };

  function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });

    return blob;
  }

  const formattedBody = memo?.body.split("\n").map((paragraph, index) => (
    <span key={index} className="font-Exotic">
      {paragraph}
      <br />
    </span>
  ));

  const options = {
    filename: `${memo?.created_by}.pdf`,
    method: "save",
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.MEDIUM,
    },
  };

  const downloadPDF = () => generatePDF(targetRef, options);

  //================================= the functions behind the pin  inputs
  const [otp, setOTP] = useState(["", "", "", ""]); // Initial state for OTP input

  // Function to handle button click
  const handleButtonClick = (digit) => {
    const updatedOTP = [...otp]; // Create a copy of the current OTP array
    const index = updatedOTP.findIndex((value) => value === ""); // Find the first empty input box
    if (index !== -1) {
      updatedOTP[index] = digit; // Set the value of the empty input box to the clicked digit
      setOTP(() => {
        return updatedOTP;
      }); // Update the OTP state
    }
  };

  useEffect(() => {
    if (otp[3] !== "") {
      const otpValue = parseInt(otp.join(""));
      setIsLoading(true);
      setTimeout(() => {
        // console.log(otpValue);
        save();
        onClose();
        setIsLoading(false);
        setOTP(["", "", "", ""]);
      }, 2000);
    }
  }, [otp]);

  // Function to handle delete button click
  const handleDeleteButtonClick = () => {
    const updatedOTP = [...otp]; // Create a copy of the current OTP array
    const lastNonEmptyIndex = updatedOTP
      .map((value, index) => ({ value, index }))
      .filter(({ value }) => value !== "")
      .pop(); // Find the last non-empty input box
    if (lastNonEmptyIndex) {
      updatedOTP[lastNonEmptyIndex.index] = ""; // Remove the value from the last non-empty input box
      setOTP(updatedOTP); // Update the OTP state
    }
  };

  //================================ the end of the pin input functions

  return (
    <>
      <div className="bg-white p-3 w-full d-flex gap-3 flex-wrap rounded-md">
        {!selfMemo && (
          <>
            {/* <Button onClick={() => openDrawer("addNote")}>Add Note</Button> */}
            <button
              className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
              onClick={() => openDrawer("signature")}
            >
              Apply my Signature
            </button>
          </>
        )}
        <button
          className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
          onClick={()=>handleOpenDrawer(
            memo?.created_by ==='me'? 'viewNote' : 'addNote'
          )}
        >
          {
            memo?.created_by ==='me'? "View Notes" : <span className="flex font-helvetica items-center"><FaPlus />Add Note</span>
          }
        </button>
        <button
          className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[16px] uppercase `}
          onClick={()=>handleOpenDrawer('approval_history')}
        >
          Approval history
        </button>
      </div>
      <div
        className={`flex-1 shadow-md p-3 mb-10 overflow-y-scroll ${styles.custom_scrollbar}`}
      >
        <div className="bg-white p-8 relative">
          <div className="absolute top-2 right-2 mb-3 flex gap-3">
            {/* button to open signature modal */}
            {/* <Button size="sm" onClick={() => openDrawer("viewNote")}>
                  View Notes
                </Button>
                <Button size="sm" onClick={() => openDrawer("viewNote")}>
                  Attachments
                </Button> */}
            {selfMemo && (
              <>
                <Tooltip
                  showArror={true}
                  content="Download as PDF"
                  placement="bottom"
                >
                  <Button
                    isIconOnly
                    size="sm"
                    onClick={downloadPDF}
                    className="bg-blue-100 text-cyan-600"
                  >
                    <MdSaveAlt size={"1.5rem"} />
                  </Button>
                </Tooltip>
              </>
            )}
          </div>
          <div ref={targetRef}>
            {/* <div className="my-5"> */}
            <div className="header_address">
              <p className="font-semibold font-Exotic text-base my-1">
                Internal Memorandum
              </p>
              <table border={0} className="leading-10 w-full relative">
                <tbody>
                  <tr>
                    <td className="font-semibold font-Exotic ">To: </td>
                    <td>{memo?.recipient}Wanda Paul, Chief of Operations</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">From: </td>
                    <td>
                      {memo?.from} Michael Singleton, Chief, Internal Audit
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">Date: </td>
                    <td>{memo?.created_at ?? "31/01/2024"}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">Subject: </td>
                    <td className="font-bold text-base font-Exotic">
                      {memo?.subject}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr className="my-3 border-t-2 border-gray-500" />
                    </td>
                  </tr>
                </tbody>
                {/* <div className="absolute top-0 right-0 flex h-5/6 items-center">
                  <img
                    src={memo?.logo}
                    alt="logo"
                    className="rounded-full object-cover"
                    width={150}
                    height={150}
                  />
                </div> */}
              </table>
            </div>
            <div className="body_of_memo !text-black !text-medium font-Exotic text-base">
              {/* <p className="indent-6">
                  I trust this letter finds you well. We would like to inform
                  you of the outcomes of our recent annual warehouse physical
                  inventory observation, conducted on [Date] at [Warehouse
                  Location].{" "}
                </p>
                <p className="indent-6">
                  The purpose of this annual inventory check was to ensure
                  accuracy and accountability in our inventory management
                  processes.{" "}
                </p>
                <p className="indent-6">
                  We are pleased to report that the physical inventory count
                  aligned closely with our recorded inventory levels,
                  demonstrating a high level of accuracy in our tracking
                  systems. Our dedicated team worked diligently to conduct
                  thorough checks, reconcile discrepancies, and address any
                  issues promptly.
                </p> */}

              {/* This will be used when they using react-quill to create the body because it will come with tags and style */}
              {/* <div  dangerouslySetInnerHTML={{
                                  __html: memo.body,
                                }}/> */}

              {formattedBody}
              <br />
              <p>Kind regards,</p>
              <span className="text-[rgba(39, 44, 51, 0)]">
                {(memo?.created_by === "me"
                  ? "Femi Bejide"
                  : memo?.created_by) ?? "[Your Name]"}
              </span>
            </div>
            <div className="my-5">
              <div className="flex gap-9 flex-wrap items-end">
                {approvals?.map((item, index) => (
                  <div
                    className="flex flex-col items-center w-[9rem] "
                    key={index + "_"}
                  >
                    <div className="border-b border-b-2 flex justify-center border-b-black w-full">
                      <img
                        src={item?.signature}
                        alt=""
                        className="max-h-[100%] max-w-[100%]"
                      />
                    </div>
                    <span className="font-Exotic text-black pb-2 font-semibold">
                      {item?.name}
                    </span>
                  </div>
                ))}
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="shadow-md bg-white p-3 mx-3">
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
      </div> */}

      <ExpandedDrawerWithButton isOpen={open.status} onClose={closeDrawer}>
        <div className="mt-10 mx-5">
          {open.type === "signature" ? (
            <SignatureView
              save={save}
              clear={clear}
              sigCanvas={sigCanvas}
              openPinModal={handleOpenPinModal}
            />
          ) : open.type === "viewNote" ? (
            <ViewNotes />
          ) : open.type === "addNote" ? (
            <AddNote />
          ) : null}
        </div>
      </ExpandedDrawerWithButton>

      {/* modal for verification before adding signature */}
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        className="flex items-center justify-center"
        // width="fit"
      >
        <div className="py-5 w-fit">
          <p className="my-2">
            <span>Type in your verification pin to confirm your signature</span>
          </p>
          <div className="w-fit flex items-center flex-col justify-center p-2 rounded shadow">
            <div className="flex gap-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  className="otp-input w-16 h-16 rounded-lg border bg-white border-gray-200 border-2 disabled:cursor-grabbing text-center text-2xl"
                  type="text"
                  value={value}
                  disabled
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 mt-5 justify-end">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "x"].map((item, i) => (
                <Button
                  className={`${
                    item === "x"
                      ? "bg-red-500"
                      : item === "s"
                      ? "bg-green-500"
                      : "bg-white"
                  } text-gray w-12 h-12 text-base font-medium shadow`}
                  onClick={() => {
                    if (item === "x") {
                      handleDeleteButtonClick();
                    } else {
                      handleButtonClick(item);
                    }
                  }}
                  key={i}
                >
                  {item === "x" ? (
                    isLoading ? (
                      <Spinner color="default" />
                    ) : (
                      <LuDelete size={"1.5rem"} color="white" />
                    )
                  ) : (
                    item
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
     
    </>
  );
};

export default SignMemo;
