import { Fragment, useState } from "react";
import PayrollCard from "../../../components/payroll_components/PayrollCard";
import { LuCombine } from "react-icons/lu";
import { MdOutlineMoney } from "react-icons/md";
import { RiMoneyCnyBoxLine } from "react-icons/ri";
import { MdCalendarViewMonth } from "react-icons/md";
import { MdOutlineLocalConvenienceStore } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { MdHistoryEdu } from "react-icons/md";
import { app_routes } from "../../../utils/app_routes";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../components/payroll_components/FormDrawer";
const ArrearsIcon = ()=>{
    return (
        <svg className="svg-icon" height={'5vh'} width={'5vh'} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M706.4 977.142857H46.628571c3.885714-109.257143 36.685714-216.571429 91.314286-297.485714 44.914286-66.514286 125.257143-145.828571 253.257143-145.828572h0.228571c6.971429 0.571429 14.057143 0.8 21.142858 0.8 71.314286 0 138.514286-27.771429 188.914285-78.285714 50.514286-50.514286 78.285714-117.6 78.285715-188.914286s-27.771429-138.514286-78.285715-188.914285C550.971429 28 483.885714 0.228571 412.571429 0.228571S274.057143 28 223.542857 78.514286 145.257143 196.114286 145.257143 267.428571s27.771429 138.514286 78.285714 188.914286c19.428571 19.428571 41.257143 35.428571 64.914286 47.885714-22.857143 7.542857-44.914286 17.6-65.942857 30.285715-46.857143 28.228571-88.114286 68.342857-122.514286 119.428571C36.8 747.657143 0.457143 873.485714 0.457143 999.2c0 13.028571 10.628571 23.542857 23.542857 23.542857h682.4c12.571429 0 22.857143-10.285714 22.857143-22.857143s-10.171429-22.742857-22.857143-22.742857zM191.085714 267.428571c0-122.171429 99.314286-221.485714 221.485715-221.485714s221.485714 99.428571 221.485714 221.485714-99.428571 221.485714-221.485714 221.485715S191.085714 389.6 191.085714 267.428571z"  /><path d="M741.371429 754.514286c-8.457143 0-16.571429-4.685714-20.571429-12.914286-27.542857-56.571429-62.514286-103.085714-104.114286-138.057143-9.6-8.114286-10.857143-22.514286-2.742857-32.228571 8.114286-9.6 22.514286-10.857143 32.228572-2.742857 46.4 39.2 85.371429 90.628571 115.771428 153.028571 5.485714 11.314286 0.8 25.028571-10.514286 30.514286-3.314286 1.714286-6.742857 2.4-10.057142 2.4zM878.628571 1023.428571c-79.771429 0-144.571429-64.8-144.571428-144.571428S798.857143 734.285714 878.628571 734.285714c12.571429 0 22.857143 10.285714 22.857143 22.857143s-10.285714 22.857143-22.857143 22.857143c-54.514286 0-98.857143 44.342857-98.857142 98.857143s44.342857 98.857143 98.857142 98.857143 98.857143-44.342857 98.857143-98.857143c0-12.571429 10.285714-22.857143 22.857143-22.857143s22.857143 10.285714 22.857143 22.857143c0 79.771429-64.8 144.571429-144.571429 144.571428z"  /><path d="M1000.228571 832.114286h-44.114285c-12.571429 0-22.857143-10.285714-22.857143-22.857143s10.285714-22.857143 22.857143-22.857143h44.114285c12.571429 0 22.857143 10.285714 22.857143 22.857143s-10.285714 22.857143-22.857143 22.857143z"  /></svg>
    )
}
const RecalculateIcon=()=>{
    return (
        <svg className="svg-icon" width={'5vh'} height="5vh" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M416 224V150.624l-52.672 52.704-22.656-22.656L432 89.376l91.328 91.296-22.656 22.656L448 150.624V224h384v32l-1.504 1.28 1.152 318.72h-32l-1.024-290.784L608 452V576h-32v-96H128v416h448v-64h32v33.056L638.752 832h51.264L608 924.416V928H96V448l256-224h64z m0 32h-50.752L147.2 448H576l219.424-192H448v96h96v32h-128V256zM310.624 800H352v32H256v-96h32v41.376L393.376 672l-84.704-84.672 22.656-22.656L406.624 640H480v32h-41.376l-128 128z m301.408-64H672v32h-128v-128h32v96h3.2a160.064 160.064 0 0 1 316.8 32 160 160 0 0 1-160 160v-32a128 128 0 1 0-123.968-160z"  /></svg>
    )
}
export default function Payroll() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        { title: "Contributions", icon: <LuCombine size={iconSize} color={iconColor} />, routePath: app_routes.payroll.payroll.contribution},
        { title: "Loans", icon: <MdOutlineMoney size={iconSize} color={iconColor} />, routePath :app_routes.payroll.payroll.loans},
        { title: "Arrears", icon: <ArrearsIcon size={iconSize} color={iconColor} />, routePath :app_routes.payroll.payroll.arrears},
        { title: "Upload Other Arrears", icon: <RiMoneyCnyBoxLine size={iconSize} color={iconColor} />, routePath :app_routes.payroll.payroll.other_arrears},
        { title: "Run 11th month", icon: <MdCalendarViewMonth size={iconSize} color={iconColor} />, drawer: true},
        { title: "Recalculate", icon: <RecalculateIcon size={iconSize} color={iconColor} />, routePath :app_routes.payroll.payroll.calculation},
        { title: "Calculate Pro Rata", icon: <MdOutlineLocalConvenienceStore size={iconSize} color={iconColor} />, drawer: true},
        { title: "Grade Review", icon: <MdReviews size={iconSize} color={iconColor} />, routePath :app_routes.payroll.payroll.promotions},
        { title: "Pay Run", icon: <PiContactlessPaymentLight size={iconSize} color={iconColor} />, routePath :app_routes.payroll.payroll.pay_run},
        { title: "History", icon: <MdHistoryEdu size={iconSize} color={iconColor} />, drawer: true}
    ]

    //drawer functions
    const handleOpenDrawer = (id) => {
      setOpen({...open, status: true, id});
    };
    const handleCloseDrawer = () => {
      setOpen({...open, status: false});
    };


  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 my-3">
        {listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div onClick={()=>item?.drawer?handleOpenDrawer(index):null}>
              <PayrollCard icon={item.icon} title={item.title} routePath={item.routePath}/>
              </div>
            </Fragment>
          );
        })}
      </div>

      <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
        maxWidth={"60rem"}
      >
        <FormDrawer tabs={[{title: listData[open.id]?.title}]}>
          <p>
            {
              open.id===4? <div >Run Eleventh Month</div>: open.id===6 ? <div >Calculate pro data</div>: open.id===9?<div >History</div>:null
            }
          </p>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </Fragment>
  )
}
