import PropTypes from "prop-types";
import { Drawer } from "antd";
import { Button, cn } from "@nextui-org/react";
import { MdDownloadForOffline } from "react-icons/md";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

// import useCurrentUser from "../../../hooks/useCurrentUser";

const SalaryApprovedAdvanceModal = ({ isOpen, setIsOpen, onPrint }) => {
  //   const { userData } = useCurrentUser();
  //   const isLoading = false;

  const [isPrinting, setIsPrinting] = useState(false)


  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   pageStyle: `
  //     @media print {
  //       body {
  //         padding-left: 20px;
  //         padding-right: 20px;
  //         background-color: white;
  //         display: flex;
  //         justify-content: center;
  //       }
  //     }
  //   `,
  // });
  // const handlePrint = () => {
  //   const printContent = componentRef.current;
  //   const newWin = window.open('', '', 'width=800,height=600');
  //   newWin.document.write(`
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <title>Printable Content</title>
  //         <style>
  //           body {
  //             padding: 20px;
  //             background-color: white;
  //             display: flex;
  //             justify-content: center;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         ${printContent.innerHTML}
  //       </body>
  //     </html>
  //   `);
  //   newWin.document.close();
  //   newWin.focus();
  //   newWin.print();
  //   newWin.close();
  // };



  const applicationContent = [
    {
      title: "APPLICANT",
      id: 1,
      data: [
        { name: "NAME OF APPLICANT", answer: "content content content content", space: 3 },
        { name: "STAFF NO", answer: "content content content content", space: 1 },
        { name: "DEPARTMENT OF APPLICANT", answer: "content content content content", space: 2 },
        { name: "DESIGNATION/GL", answer: "content content content content", space: 2 },
        { name: "PURPOSE FOR THE ADVANCE", answer: "content content content content", space: 3 },
        { name: "NUMBER OF MONTHS REQUIRED", answer: "content content content content", space: 1 },
      ],
    },
    {
      title: "GUARANTOR",
      id:2,
      data: [
        { name: "NAME OF GUARANTOR", answer: "content content content content", space: 3 },
        { name: "STAFF NO", answer: "content content content content", space: 1 },
        { name: "DEPT & STATION OF GUARANTOR", answer: "content content content content", space: 2 },
        { name: "DESIGNATION", answer: "content content content content", space: 2 },
        { name: "SIGNATURE OF GUARANTOR", answer: "content content content content", space: 3 },
        { name: "DATE", answer: "content content content content", space: 1 },
      ],
    },
    {
      title: "NOTE:",
      content: "ONLY OFFICERS ON GRADE LEVEL 10 & ABOVE CAN GUARANTEE THIS APPLICATION",
      standAlone: true
    },
    {
      title: "HEAD OF DEPARTMENT",
      id:3,
      data: [
        { name: "THE ABOVE APPLICATION IS RECOMMENDED/NOT RECOMMENDED.", head: true },
        { name: "NAME", answer: "content content content content", space: 3 },
        { name: "SIGNATURE", answer: "content content content content", space: 3 },
        { name: "STAFF NO", answer: "content content content content", space: 1 },
        { name: "DESIGNATION", answer: "content content content content", space: 2 },
        { name: "DATE", answer: "content content content content", space: 1 },
      ],
    },
    {
      title: "HUMAN RESOURCES DEPARTMENT",
      id:4,
      data: [
        { name: "FINANCIAL REGULATION APPLICABLE: 1706 1707 1708 1709 1710 ", head: true },
        { name: "NUMBER OF MONTHS RECOMMENDED", answer: "content content content content", space: 3 },
        { name: "NUMBER OF PAYMENT INSTALLMENTS", answer: "content content content content", space: 3 },
        { name: "EFFECTIVE DATE", answer: "content content content content", space: 1 },
        { name: "SIGNATURE OF OFFICER IN CHARGE", answer: "content content content content", space: 3 },
        { name: "DESIGNATION", answer: "content content content content", space: 2 },
      ],
    },
    {
      title: "APPROVED BY GENERAL MANAGER, HUMAN RESOURCES",
      id:5,
      data: [
        { name: `GENERAL MANAGER (FINANCE)`, head: true },
        { name: `THE ABOVE APPLICATION IS APPROVED/NOT APPROVED.`, head: true },
      ],
    },
  ];



  const startprint = async ()=>{
    setIsPrinting(true)
    
    
    setTimeout(() => {
      handlePrint()
      
      setIsPrinting(false)
    }, 1000);
  }



  return (
    <>
      <Drawer
        width={700}
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className="bg-[#FFF] z-[10]"
        classNames={{
          body: "bg-[#FFF]",
          header: "font-Judson bg-[#FFF]",
        }}
      >
              <Button className={cn("fixed right-1 top-1", isPrinting ? 'hidden' : '')} isIconOnly   onClick={()=>onPrint(startprint)}><MdDownloadForOffline size={20} /> </Button>
        <>
          <div className="bg-[#fff] min-h-screen px-10 py-2 !font-Judson "       ref={componentRef}>
            <div className="flex flex-col gap-2 items-center justify-between mb-4">
              <div className="flex">
                <img
                  src="/assets/images/NCAA.png"
                  className="w-20 h-[4.4rem]"
                  alt=""
                />
              </div>
              <div className="text-black  flex items-center flex-col justify-center">
                <div className="text-lg font-extrabold font-Judson">
                  NIGERIAN CIVIL AVIATION AUTHORITY
                </div>
                <div className="text-xs font-[600] font-Judson">
                  NNAMDI AZIKIWE INTERNATIONAL AIRPORT, ABUJA
                </div>

                <div className="font-bold underline pt-3 font-Judson ">
                  APPLICATION FOR SALARY ADVANCE
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              {applicationContent?.map((value, i) => (
                <div key={i} className="flex flex-col">
                  {
                    value.standAlone ? (
                      <div className="flex text-xs  gap-x-2 gap-y-2">
                             <div className="underline  font-semibold font-Judson">{value.title}</div>
                             <div className=" font-semibold font-Judson">{value.content}</div>
                      </div>
                    ): (
                      <div className="flex flex-col gap-x-2 gap-y-0 ">
                        <div className="flex gap-x-6 font-semibold">
                          <div className="font-Judson">{value.id}.</div>
                          <div className={cn("text-[0.8rem] font-Domine font-[600]", value.id < 5 && 'underline')}>{value.title}</div>
                        </div>
                        <div className=" inline gap-y-0 w-full ">
                          {value?.data?.map((content, j) => (
                            <div key={j} className="inline">
                              {
                                content.head ? (
                                  <div className=" font-[400]  font-Judson text-xs block text-nowrap">
                                    {content.name}
                                  </div>

                                ) : (
                                  <div key={j} className=" inline pr-2">
                                    <div className=" font-Domine font-medium text-[0.8rem] inline-flex text-nowrap py-[0.68rem]">
                                      {content.name}:
                                    </div>
                                    <div className="underline text-[0.75rem] px-1 inline-flex ">
                                      {content.answer}
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                          ))}
                        </div>

                      </div>
                    )
                  }

                </div>
              ))}

              <div className="flex flex-col pt-12 items-start">
                <div className="flex flex-col items-center  justify-center">
                  {/* <hr  className="w-60 bg-black text-black"/> */}
                  <div className="w-60 bg-black h-[0.1rem] text-black"></div>
                  <div className="text-[0.78rem] font-[900] font-Judson">{"GENERAL MANAGER, HUMAN RESOURCES"}</div>
                  <div className="text-[0.78rem] font-medium font-Judson ">SIGNATURE & DATE</div>
                </div>
              </div>

              {/* <div className="flex flex-col  gap-2 ">
                  <div className="flex gap-x-12 font-semibold">
                      <div>1.</div>
                      <div className="underline">APPLICATION</div>
                  </div>
                  <div className=" inline gap-y-2 w-full ">
                    <div className=" inline pr-2">
                      <div className=" font-medium inline-flex text-nowrap py-2">NAME OF APPLICANT:</div>
                      <div className="underline px-1 inline-flex">ADEOLA OLAPOSI TIMILEYIN</div>
                    </div>
                    <div className="inline pr-2">
                      <div className=" font-medium inline-flex text-nowrap  py-2">STAFF NO:</div>
                      <div className="underline px-1 inline-flex">STF220</div>
                    </div>
                    <div className="inline   pr-2">
                      <div className=" font-medium inline-flex text-nowrap  py-2">DEPARTMENT OF APPLICANT:</div>
                      <div className="underline px-1 inline-flex">Department of aviation</div>
                    </div>
                    <div className="inline pr-2">
                      <div className=" font-medium inline-flex text-nowrap  py-2">DESIGNATION/GL:</div>
                      <div className="underline px-1 inline-flex">STF220</div>
                    </div>
                    <div className="inline   pr-2">
                      <div className=" font-medium inline-flex text-nowrap  py-2">PURPOSE FOR THE ADVANCE:</div>
                      <div className="underline px-1 inline-flex">Department of aviation</div>
                    </div>
                  </div>
              </div> */}
            </div>
          </div>
        </>
      </Drawer>
    </>
  );
};

export default SalaryApprovedAdvanceModal;

SalaryApprovedAdvanceModal.propTypes = {
  isOpen: PropTypes.boolean,
  setIsOpen: PropTypes.func,
  onPrint: PropTypes.func,
};
