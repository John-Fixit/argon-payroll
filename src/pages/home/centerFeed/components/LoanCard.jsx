/* eslint-disable react-hooks/exhaustive-deps */

import { Button,  useDisclosure } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import LoanModal from "../../../../components/core/loan/LoanModal";
import { useGetLoanHistory } from "../../../../API/loan";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { hasAppliedThisMonth } from "../../../../utils/utitlities";
import toast from "react-hot-toast";

const LoanCard = () => {
    const [hasApplied, setHasApplied] = useState(false)
    const {userData} = useCurrentUser()
    const { data: history } = useGetLoanHistory({
      staff_id: userData?.data?.STAFF_ID,
      company_id: userData?.data?.COMPANY_ID,
    });
    const {
        isOpen,
        onOpen,
        onClose,
      } = useDisclosure();
    //   console.log(history)

  
        // ---------------------------------------------------
  
        // const  hist = [
        //   {
        //     PRINCIPAL: "20000",
        //     CREATED_ON: "2025-01-06 04:29:22.000",
        //     REPAYMENT_AMOUNT: "230000",
        //     STATUS: "Approved"
        //   },
        //   {
        //     PRINCIPAL: "20000",
        //     CREATED_ON: "2024-11-06 04:29:22.000",
        //     REPAYMENT_AMOUNT: "230000",
        //     STATUS: "Approved"
        //   },
        //   {
        //     PRINCIPAL: "20000",
        //     CREATED_ON: "2024-07-06 04:29:22.000",
        //     REPAYMENT_AMOUNT: "230000",
        //     STATUS: "Approved"
        //   }
        // ]
  
  
        useEffect(() => {
          const checkApplied = () => {
              const result =  hasAppliedThisMonth(history)
              if(result){
                setHasApplied(true)
              }else{
                setHasApplied(false)
              }
            }
            checkApplied()
        }, [history,])
              
        // ---------------------------------------------------
  
  
        const showMessage = ()=>{
          return toast.error("You can only apply once per month. Please try again next month.", {duration: 10000, position: "'bottom-center"  })
        }


  return (
    <div>
        <div className="shadow rounded-lg">
        <div className="relative bg-white rounded-lg w-full">
        <div className="rounded-lg  w-full flex flex-col gap-y-3 ">
            <img
            src="/assets/images/payday2.png"
            alt="payday image"
            onClick={()=> hasApplied ? showMessage() : onOpen()}
            className="inset-0 rounded-t-lg  w-full object-contain object-top z-2 align-middle cursor-pointer"
            />

            <div className="flex flex-col gap-y-2 px-4 pb-5">
            <span className="text-gray-700 font-extrabold text-lg">
                Access Payday Loans
            </span>

            <div className="flex justify-between items-end mt-2">
                <div className="flex gap-3 w-full">
                <Button
                    onClick={()=> hasApplied ? showMessage() : onOpen()}
                    size="sm"
                    className=" ml-auto bg-[#534642] text-white"
                >
                    Get Now
                </Button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <ExpandedDrawerWithButton isOpen={isOpen} onClose={onClose} maxWidth={600} maskClosable={false} > 
                  <LoanModal isOpen={isOpen} closeModal={onClose}/>
          </ExpandedDrawerWithButton>

    </div>
  )
}

export default LoanCard
