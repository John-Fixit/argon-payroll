/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Button, cn, Spinner, Tooltip, useDisclosure } from "@nextui-org/react";
import styles from "./body.module.css";
import { useCallback,  useRef, useState } from "react";
import { MdSaveAlt } from "react-icons/md";

import { dataURLToFile, toStringDate } from "../../../../../utils/utitlities";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { ImCancelCircle } from "react-icons/im";
import { Edit2Icon } from "lucide-react";
import QuilInput from "../../../../../components/core/approvals/QuilInput";

import useMemoData from "../../../../../hooks/useMemoData";
import generatePDF, { Margin } from "react-to-pdf";
import { toPng } from 'html-to-image';
import { uploadFileData } from "../../../../../utils/uploadfile";
import { useCreateMemo } from "../../../../../API/memo";
import toast from "react-hot-toast";


const RenderMemo = ({ handleClose }) => {
  const { userData } = useCurrentUser();
  const [isEditingMemo, setisEditingMemo] = useState(false);
  const [editedMemo, setEditedMemo] = useState(null);
  const [isLoading, setIsLoading]= useState(false)
  const {mutateAsync:create} = useCreateMemo()

  const { data } = useMemoData();
  const targetRef = useRef();

  const options = {
    filename: `${"memo"}.pdf`,
    method: "save",
    page: {
      margin: Margin.MEDIUM,
    },
  };

  // download PDF
  const downloadPDF = () => generatePDF(targetRef, options);

  // edit memo
  const handleEditMemoContent = () => {
    if (isEditingMemo) {
      setEditedMemo(null);
      setisEditingMemo(!isEditingMemo);
    } else {
      setisEditingMemo(!isEditingMemo);
    }
  };

  const handleEditMemo = (value) => {
    setEditedMemo(value);
    setisEditingMemo(!isEditingMemo);
  };






  const handleDownloadImage = useCallback( async() => {
    if (targetRef.current === null) {
      return;
    }

    setIsLoading((prev)=> !prev)

    try {
       await toPng(targetRef.current, { cacheBust: false })
          .then((dataUrl) => {
            // Convert data URL to a File object
            const file =  dataURLToFile(dataUrl,   `${data?.memo_subject}.png`)
            // console.log('File created:', file);


            createMemo(file)
    
            // Create a link element
            const link = document.createElement('a');
            // Set the download attribute with a filename
            link.download = `${data?.memo_subject}.png`;
            // Set the href attribute to the data URL of the image
            link.href = dataUrl;
            // Trigger the download by programmatically clicking the link
            link.click();
            
            // You can now use the file object, e.g., upload it, display it, etc.
          })
          .catch((err) => {
            console.error('Failed to capture the image: ', err);
          });
        
    } catch (error) {
       console.log(error) 
    } finally {
        setIsLoading((prev)=> !prev)
    }
  }, [targetRef, data]);





 


const createMemo = async (file)=>{

    if(!file) return

    const attachId = await uploadFileData(file, userData?.token)
    try {
        const date =  Date.now()
        const user =  (data?.from === "Me" || !data?.from ) ? userData?.data?.STAFF_ID : data?.from
        const recp =  data?.recipient_type === "STAFF" ?  data?.recipients : null; 
      
        // const value = {...data, }
        // memo_subject: draft?.SUBJECT,
        // content: draft?.MEMO_CONTENT,
        // from: null,
        // recipient_type: draft?.RECIPIENT_TYPE,
        // recipient_value: null,
        // recipients: [],
        // approvals: draft?.APPROVALS?.length ?  draft?.APPROVALS?.split(',') : [],
        // is_draft: 0,
        // package_id: 19,
        // staff_id: null,
        // company_id: null,
        // memo_number: null,
        // memo_id: draft?.MEMO_ID
    
        const val = {...data, company_id: userData?.data?.COMPANY_ID, staff_id: userData?.data?.STAFF_ID,  memo_number: date, for: user,   }

        const json = {
            ...val,
            memo_image: attachId?.file_url_id,
        }

        const res = await create(json)
        if(res){
            toast.success("You successfully create memo", {duration: 7000})
            handleClose();
        }else{
            toast.error("Error creating memo. Please retry.", {duration: 7000})
        }
    } catch (error) {
        console.log(error)
        toast.error("Error creating memo. Please retry.", {duration: 7000})
    }
}













//   const handleDownloadImage = async () => {
//     if (targetRef.current === null) {
//       return;
//     }

//     setIsLoading(true)

//     try {
//        await toPng(targetRef.current, { cacheBust: false })
//           .then((dataUrl) => {
//             // Convert data URL to a File object
//             const file =  dataURLToFile(dataUrl,   `${data?.memo_subject}.png`)
//             console.log('File created:', file);
    
//             // Create a link element
//             const link = document.createElement('a');
//             // Set the download attribute with a filename
//             link.download = `${data?.memo_subject}.png`;
//             // Set the href attribute to the data URL of the image
//             link.href = dataUrl;
//             // Trigger the download by programmatically clicking the link
//             link.click();
            
//             // You can now use the file object, e.g., upload it, display it, etc.
//           })
//           .catch((err) => {
//             console.error('Failed to capture the image: ', err);
//           });
        
//     } catch (error) {
//        console.log(error) 
//     } finally {
//         setIsLoading(false)
//         console.log('here')
//     }
//   }



//   useEffect(() => {
//     handleDownloadImage()  
//   }, [handleDownloadImage])


// const draw = ()=>{
    // var node= document.getElementById("elementId");
    // var canvas = document.createElement("canvas");
    // canvas.height = node.offsetHeight;
    // canvas.width = node.offsetWidth;
    // var name = "test.png"
    // // rasterizeHTML.drawHTML(node.innerHTML, canvas)
    // rasterizeHTML.drawHTML(node.outerHTML, canvas)
    //  .then(function (renderResult) {
    //         if (navigator.msSaveBlob) {
    //             window.navigator.msSaveBlob(canvas.msToBlob(), name);
    //         } else {
    //             const a = document.createElement("a");
    //             document.body.appendChild(a);
    //             a.style = "display: none";
    //             a.href = canvas.toDataURL();
    //             a.download = name;
    //             a.click();
    //             document.body.removeChild(a);
    //         }
    //  });
    //  2
    // html2canvas(document.getElementById("image-wrap")).then(function(canvas) {
    //     var link = document.createElement("a");
    //     document.body.appendChild(link);
    //     link.download = "manpower_efficiency.jpg";
    //     link.href = canvas.toDataURL();
    //     link.target = '_blank';
    //     link.click();
    // });
// }
  





  return (
    <>
      <div

        className={`flex-1 shadow-md p-3 mb-10 overflow-y-scroll min-w-full ${styles.custom_scrollbar}`}
      >
        <div className="bg-white  p-8 relative py-14 w-full">

          <div className="absolute top-2 right-20 mb-3 flex gap-3">
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
          </div>
          <div className="absolute top-2 right-8 mb-3 flex gap-3">
            {
              <Tooltip
                showArrow
                color="default"
                content={isEditingMemo ? "Cancel" : "Edit"}
                delay={300}
              >
                <button
                  className={cn(
                    "p-2 rounded-lg",
                    isEditingMemo ? "bg-red-50 " : "bg-blue-100 "
                  )}
                  onClick={handleEditMemoContent}
                >
                  {isEditingMemo ? (
                    <ImCancelCircle className="w-4 h-4 text-red-300" />
                  ) : (
                    <Edit2Icon className="w-4 h-4 text-blue-400" />
                  )}
                </button>
              </Tooltip>
            }
          </div>







          <div ref={targetRef} className="w-full" id="my-jsx-element" style={{ background: "white", padding: '12px 16px', width: "100%"}}>
            <div className="header_address w-full">
              <table
                border={0}
                className="leading-7 md:leading-8 w-full bg-white  relative"
              >
                <tbody className=" ">
                  <tr>
                    <td className="font-semibold font-Exotic">To: </td>
                    <td className="pl-2 md:pl-2 ">
                      {" "}
                      {data?.recipient_type && data?.recipient_type !== "STAFF"
                        ? `${data?.to_value} (${data?.recipient_type})`
                        : data?.recipient_value_array?.map((el) => (
                            <span className="px-2" key={el?.key}>
                              {el?.label},
                            </span>
                          ))}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">From: </td>
                    <td className="pl-2 md:pl-2">
                      {data?.from === "Me" || !data?.from ? (
                        <span>
                          {userData?.data?.LAST_NAME}{" "}
                          {userData?.data?.FIRST_NAME}
                        </span>
                      ) : (
                        <span> {data?.from_value?.label} </span>
                      )}
                      {/* {memo?.LAST_NAME} {memo?.FIRST_NAME} {memo?.DESIGNATION_NAME &&  `(${memo?.DESIGNATION_NAME})`} */}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">Date: </td>
                    <td className="pl-2 md:pl-2">{toStringDate(new Date())}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold font-Exotic ">Subject: </td>
                    <td className="font-bold text-base font-Exotic pl-2 md:pl-2">
                      {data?.memo_subject}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <hr className="my-3 border-t-2 border-gray-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {isEditingMemo ? (
              <QuilInput
                initialValue={data?.content}
                handleConfirm={handleEditMemo}
                handleCancel={handleEditMemoContent}
              />
            ) : (
              <div className="body_of_memo !text-black font-Exotic text-base mt-2">
                <p
                  dangerouslySetInnerHTML={{
                    __html: editedMemo ? editedMemo : data?.content,
                  }}
                />
                <br />
                <span className="text-gray-500">
                  {data?.from === "Me" || !data?.from ? (
                    <span>
                      {userData?.data?.LAST_NAME} {userData?.data?.FIRST_NAME}
                    </span>
                  ) : (
                    <span> {data?.from_value?.label} </span>
                  )}
                </span>
              </div>
            )}

            {!isEditingMemo && (
              <div className="my-5">
                <div className="flex gap-9 flex-wrap items-start">
                  {data?.signers?.map((item, index) => (
                    <div
                      className="flex flex-col items-center w-[9.2rem] "
                      key={index + "_"}
                    >
                      <div className="border-b-2 flex items-end justify-center border-b-black w-full max-h-[100%]">
                        {
                           item?.file ? 
                            <img
                                src={item?.file}
                                alt=""
                                className="max-h-[100%] max-w-[100%]"
                                />  : 
                                <div className="h-14">
                                        
                                </div>
                        } 
                      </div>
                      <span className="font-Exotic text-black pb-2 font-semibold text-xs">
                        {item?.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>




            <div className="w-full  flex justify-end">
                <button
                    disabled={isLoading}
                    className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-3 text-[0.7125rem] flex items-center gap-2  px-[16px] uppercase `}
                    onClick={() => handleDownloadImage("signature")}
                    >
                        {
                            isLoading ? (
                            <Spinner color="white" size="sm"/>
                            ): (
                            ""
                            )
                        }
                        
                        Send
                </button>
            </div>

        </div>
      </div>
    </>
  );
};
export default RenderMemo;
