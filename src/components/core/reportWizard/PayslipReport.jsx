/* eslint-disable no-unused-vars */


/* eslint-disable react/prop-types */
import { Button, cn } from "@nextui-org/react";
import { useMemo, useRef, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { formatNumberWithComma } from "../../../utils/utitlities";
import { Loader } from "lucide-react";


const monthNames = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"
];


// const data = [
//   {
//     description: "CONSOLIDATED SALARY",
//     amount: "1,252,444.08",
//     ytd: "6,966,747.48",
//   },
//   {
//     description: "INDUCEMENT ALLOWANCE",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "INCONVINIENCE ALLOWANCE",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "PENSION EMPLOYER IN",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "ADMINISTRATIVE ALLOWANCE",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   // Add more data as needed
// ];
// const dataDeduction = [
//   {
//     description: "TAX",
//     amount: "1,252,444.08",
//     ytd: "6,966,747.48",
//   },
//   {
//     description: "PENSIONTRIBUTION",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "PENSION (EMPLOYER) OUT",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "NATIONAL HOUSING FUND",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "ATTSAN",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "NCAA M/PURPOSE CO-OP",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "DFA WELFARE FORUM",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "FMT&A COOP. MULTIPURPOSE",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   {
//     description: "AF&SCT&CS (SAVINGS)",
//     amount: "25,142.33",
//     ytd: "120,357,49",
//   },
//   // Add more data as needed
// ];

const PayslipReport = ({data, isFetching}) => {

  const [isPrinting, setIsPrinting] = useState(false)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

//   const {data:val, isFetching} = useGetProfilePayslip({
//     "staff_id": userData?.data?.STAFF_ID,
//     "company_id": userData?.data?.COMPANY_ID,
//     "month":user?.month,
//     "year":user?.year
//   })


console.log(data)


const paymentData = useMemo(() =>{
  if(!data){
    return []
  }
    const value = Object.values(data?.payslip)?.filter(slip => !slip?.pay_deduct)

    const latest = value?.map(slp => {
      data?.ytd?.map(yt => {
        if(yt?.attribute_id === slp?.attribute_id ){
          slp.ytd = yt

          return yt
        }
        return yt
      })

      return slp
    })
    return latest
}, [data])



const paymentGross = useMemo(() =>{
    const value = paymentData?.reduce((a,b)=> a + Number(b?.amount_to_pay), 0)

    return value
}, [paymentData])


const deductData = useMemo(() =>{
  if(!data){
    return []
  }
    const value = Object.values(data?.payslip)?.filter(slip => slip?.pay_deduct)


    const latest = value?.map(slp => {
      data?.ytd?.map(yt => {
        if(yt?.attribute_id === slp?.attribute_id ){
          slp.ytd = yt

          return yt
        }
        return yt
      })

      return slp
    })

    return latest
}, [data])


const deductGross = useMemo(() =>{
  const value = deductData?.reduce((a,b)=> a + Number(b?.amount_to_pay), 0)
  return value
}, [deductData])









  const startprint = async ()=>{
    setIsPrinting(true)
    
    
    setTimeout(() => {
      handlePrint()
      
      setIsPrinting(false)
    }, 1000);
  }














  return (
    <div
      className="flex flex-col px-6 py-3 bg-white !font-open-sans"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("/assets/images/NCAA.png")`,
        backgroundSize: "600px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
      }}

      ref={componentRef}
    >

      <Button className={cn("fixed right-1 top-1", isPrinting ? 'hidden' : '')} isIconOnly   onClick={startprint}><MdDownloadForOffline size={20}/> </Button>


      <div className="flex gap-2 items-center justify-between mb-10">
        <div className="flex">
          <img src="/assets/images/NCAA.png" className="w-20 h-20" alt="" />
        </div>
        <div className="text-4xl text-black font-open-sans font-[500]">Payslip</div>
      </div>

      <div className="flex flex-col ">
        <hr className="border border-gray-300" />
        <span className="ml-auto text-lg py-1 text-black font-open-sans font-[600] px-2">
          PAY PERIOD : {monthNames[data?.MONTH -1]} {data?.YEAR}

           {/* {monthNames[user?.month -1]} {user?.year} */}
        </span>
        <hr className="border border-gray-300" />
      </div>


      {
        isFetching ? <div className="flex items-center justify-center w-full h-full">
              <Loader className=" animate-spin"/>
        </div> : 
        !data ? (
            <div className="flex items-center justify-center w-full h-full text-gray-400"> Empty Data</div>
        ) :
      <div className="flex flex-col font-[500] text-black font-open-sans  mb-32">
        <div className="grid grid-cols-3 font-open-sans">
          <div className="block w-full p-1 text-xs font-open-sans ">
            <div className="flex flex-col mb-10 font-open-sans">
              <div className="flex justify-between bg-[#cce6f7] px-1 font-open-sans gap-2">
                <div className="font-open-sans">PAYROLL ID</div>
                <div className="font-open-sans">{data?.emp_details?.empno}</div>
              </div>
              <div className="flex justify-between px-1 gap-2">
                <div className="font-open-sans">STAFF NAME</div>
                <div className="text-end font-open-sans">{data?.emp_details?.fullname}</div>
              </div>
              <div className="flex justify-between bg-[#cce6f7] px-1  gap-2">
                <div className="font-open-sans">DIVISION NAME</div>
                <div className="text-end font-open-sans">{data?.emp_details?.division_group_name}</div>
              </div>
              <div className="flex justify-between px-1 gap-2">
                <div className="font-open-sans">GRADE LEVEL</div>
                <div className="font-open-sans">{data?.emp_details?.grade}</div>
              </div>
              <div className="flex justify-between bg-[#cce6f7] px-1 gap-2">
                <div className="font-open-sans">STEP</div>
                <div className="font-open-sans">{data?.emp_details?.step}</div>
              </div>
              <div className="flex justify-between px-1  gap-2">
                <div className=" font-open-sans">ACCOUNT NUMBER</div>
                <div className="font-open-sans">{data?.emp_details?.account_no}</div>
              </div>
              <div className="flex justify-between bg-[#cce6f7] px-1 gap-2 ">
                <div className="font-open-sans">BANK_NAME</div>
                <div className="text-end font-open-sans">{data?.emp_details?.bank_name}</div>
              </div>
              <div className="flex justify-between px-1 gap-2 ">
                <div className="font-open-sans">RANK</div>
                <div className="font-open-sans">{data?.emp_details?.rank_name}</div>
              </div>
            </div>
 
            <div>
              {
                  paymentData?.length > 0 && deductData.length > 0 && 
              <div className="flex flex-col space-y-2 font-open-sans ">
                  <div className="text-sm font-[500]">
                    <h1 className="text-lg font-bold font-open-sans">Gross Income</h1>
                    <div className="border-t flex items-center justify-between font-open-sans">
                        <span className="font-open-sans">Amount</span>
                        <span className="font-open-sans font-bold">N {formatNumberWithComma(data?.gross_amount)}</span>
                    </div>
                  </div>
                  <div className="text-sm font-[500]">
                    <h1 className="text-lg font-bold font-open-sans">Total Deduction</h1>
                    <div className="border-t flex items-center justify-between">
                        <span className="font-open-sans">Amount</span>
                        <span className="font-open-sans font-bold">N {formatNumberWithComma(data?.total_deduction)}</span>
                    </div>
                  </div>
                  <div className="text-sm font-[500]">
                    <h1 className="text-lg font-bold font-open-sans">Net Pay</h1>
                    <div className="border-t flex items-center justify-between">
                        <span className="font-open-sans">Amount</span>
                        <span className="font-open-sans font-bold">N { formatNumberWithComma(data?.gross_amount - data?.total_deduction)}</span>
                    </div>
                  </div>
              </div>
              }

            </div>
          </div>

          <div className="col-span-2 border-l-1 border-gray-300  block p-1">

            <div className="flex flex-col mb-16">
                <div className="flex flex-col bg-[#cce6f7] py-3 px-2">
                  <div className="font-open-sans font-semibold">Payment</div>
                </div>

                <div className="flex flex-col ">
                  <div className="overflow-x-auto scrollbar-none">

                    {
                      paymentData?.length === 0 ?  <div>
                      <div className="flex items-center justify-center w-full h-full text-gray-400"> Empty Data</div>
                    </div>   : 
                      <table className="min-w-full  border-gray-300">
                        <thead className="">
                          <tr className="  text-[1rem] leading-normal font-open-sans">
                            <th className="py-[0.1rem] px-1  text-left font-open-sans">Description</th>
                            <th className="py-[0.1rem]  text-left font-open-sans">Amount (N)</th>
                            <th className="py-[0.1rem]  text-right font-open-sans">YTD (N)</th>
                          </tr>
                        </thead>
                        <tbody className=" text-sm  font-[400]  leading-3 ">
                          {  paymentData.map((item, index) => (
                            <tr
                              key={index}
                              className={` ${
                                index % 2 === 0 ? "bg-[#f0f0f0]" : ""
                              } opacity-90 `}
                            >
                              <td className=" py-[0.3rem] font-open-sans font-[500] px-1 text-left whitespace-nowrap text-[0.9rem]">
                                {item?.name}
                              </td>
                              <td className="py-[0.3rem] font-open-sans font-[500] text-left whitespace-nowrap text-[0.9rem]">
                                { formatNumberWithComma(item?.amount_to_pay)}
                              </td>
                              <td className=" py-[0.3rem] font-open-sans font-[500] px-1 text-right whitespace-nowrap text-[0.9rem]">
                                {formatNumberWithComma(item?.ytd?.sum_pay)}
                              </td>
                            </tr>
                          ))}

                          <tr className="font-bold font-open-sans ">
                            <td className="font-open-sans font-bolder">GROSS AMOUNT</td>
                            <td className="font-open-sans">N {formatNumberWithComma(paymentGross)}</td>
                          </tr>
                        </tbody>
                      </table>
                    }
                  </div>
                </div>
            </div>
            <div className="flex flex-col mb-16">
                <div className="flex flex-col bg-[#cce6f7] opacity-80 py-3 px-2 text-lg font-normal">
                  <div>Deductions</div>
                </div>

                <div className="flex flex-col ">
                  <div className="overflow-x-auto scrollbar-none">

                    {
                       deductData?.length === 0 ?  <div>
                       <div className="flex items-center justify-center w-full h-full text-gray-400"> Empty Data</div>
                     </div>   : 
                      <table className="min-w-full  border-gray-300">
                        <thead className="">
                          <tr className="  text-[1rem] leading-normal">
                            <th className="py-1 px-1  text-left font-open-sans">Description</th>
                            <th className="py-1  text-left font-open-sans">Amount (N)</th>
                            <th className="py-1  text-right font-open-sans">YTD (N)</th>
                          </tr>
                        </thead>
                        <tbody className=" text-sm  font-[400]  leading-3 ">
                          {deductData.map((item, index) => (
                            <tr
                              key={index}
                              className={` ${
                                index % 2 === 0 ? "bg-[#f0f0f0]" : ""
                              } opacity-90 tracking-wide`}
                            >
                              <td className=" py-[0.3rem] font-open-sans font-[500] px-1 text-left whitespace-nowrap text-[0.9rem]">
                                {item?.name}
                              </td>
                              <td className="py-[0.3rem] font-open-sans font-[500] text-left whitespace-nowrap text-[0.9rem]">
                                {formatNumberWithComma(item?.amount_to_pay)}
                              </td>
                              <td className=" py-[0.3rem] font-open-sans font-[500] px-1 text-right whitespace-nowrap text-[0.9rem]">
                              {formatNumberWithComma(item?.ytd?.sum_pay)}
                              </td>
                            </tr>
                          ))}

                          <tr className="font-bold">
                            <td className="font-open-sans">TOTAL DEDUCTION</td>
                            <td className="font-open-sans">N {formatNumberWithComma(deductGross)}</td>
                          </tr>
                        </tbody>
                      </table>
                    }
                  </div>
                </div>
            </div>



            <div>

              {
                 paymentData?.length > 0 && deductData.length > 0 && 
                <div className="flex justify-between bg-[#cce6f7] px-1 font-bold ">
                  <div className="font-open-sans">NET PAY</div>
                  <div className="font-open-sans">N {formatNumberWithComma(paymentGross - deductGross)}</div>
                </div>
              }

            </div>

          </div>
          
        </div>
      </div>
      }

    </div>
  );
};

export default PayslipReport;
