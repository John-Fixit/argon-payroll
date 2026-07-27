
import {cn } from "@nextui-org/react";

const SalaryPreview = () => {
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

  return (
    <div style={{width: "800px"}} className="flex flex-col bg-[#FFF] font-Judson ">
          <div className="bg-[#fff] min-h-screen px-10 py-2 !font-Judson ">
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
                  <div className="w-60 bg-black h-[0.1rem] text-black"></div>
                  <div className="text-[0.78rem] font-[900] font-Judson">{"GENERAL MANAGER, HUMAN RESOURCES"}</div>
                  <div className="text-[0.78rem] font-medium font-Judson ">SIGNATURE & DATE</div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default SalaryPreview;

SalaryPreview.propTypes = {
  // isOpen: PropTypes.boolean,
  // setIsOpen: PropTypes.func,
  // onPrint: PropTypes.func,
};
