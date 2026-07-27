/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@nextui-org/react";
import { useGetLoanHistory } from "../../../../API/loan";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import propTypes from "prop-types"
import { useEffect, useState } from "react";
import { hasAppliedThisMonth } from "../../../../utils/utitlities";
import toast from "react-hot-toast";


const LoanWIdget = ({openLoanModal}) => {
    const {userData} = useCurrentUser()
    const [hasApplied, setHasApplied] = useState(false)

    const { data: history } = useGetLoanHistory({
        staff_id: userData?.data?.STAFF_ID,
        company_id: userData?.data?.COMPANY_ID,
      });
    //   console.log(history)

      // ---------------------------------------------------

    //   const  hist = [
    //     {
    //       PRINCIPAL: "20000",
    //       CREATED_ON: "2025-01-06 04:29:22.000",
    //       REPAYMENT_AMOUNT: "230000",
    //       STATUS: "Approved"
    //     },
    //     {
    //       PRINCIPAL: "20000",
    //       CREATED_ON: "2024-11-06 04:29:22.000",
    //       REPAYMENT_AMOUNT: "230000",
    //       STATUS: "Approved"
    //     },
    //     {
    //       PRINCIPAL: "20000",
    //       CREATED_ON: "2024-07-06 04:29:22.000",
    //       REPAYMENT_AMOUNT: "230000",
    //       STATUS: "Approved"
    //     }
    //   ]


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
      }, [history])
            
      // ---------------------------------------------------


      const showMessage = ()=>{
        return toast.error("You can only apply once per month. Please try again next month.", {duration: 10000, position: "'bottom-right"  })
      }

  return (
    <div className="shadow rounded-lg max-w-[600px]">
          <div className="relative bg-white rounded-lg w-full">
            <div className="rounded-lg  w-full flex flex-col gap-y-3 ">
              <img
                src="/assets/images/payday4.jpg"
                alt="payday image"
                onClick={()=> hasApplied ? showMessage() : openLoanModal()}
                className="inset-0 rounded-t-lg  w-full object-contain object-top z-2 align-middle cursor-pointer"
              />

              <div className="flex flex-col gap-y-2 px-4 pb-5">
                <span className="text-gray-700 font-extrabold text-lg">
                  Access Payday Loans
                </span>

                <div className="flex justify-between items-end mt-2">
                  <div className="flex gap-3 w-full">
                    <Button
                      onClick={()=> hasApplied ? showMessage() : openLoanModal()}
                      size="sm"
                      className=" ml-auto bg-[#47495e] text-white"
                      // bg-[#5724bd]
                    >
                      Get Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}


LoanWIdget.propTypes = {
    openLoanModal: propTypes.func
}

export default LoanWIdget
