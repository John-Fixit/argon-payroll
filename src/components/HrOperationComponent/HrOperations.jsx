import { Fragment, useState } from "react";
import { LuCombine } from "react-icons/lu";
import { MdOutlineMoney } from "react-icons/md";
import { RiMoneyCnyBoxLine } from "react-icons/ri";
import { MdCalendarViewMonth } from "react-icons/md";
import { MdReviews } from "react-icons/md";
import { PiContactlessPaymentLight } from "react-icons/pi";
import { MdHistoryEdu } from "react-icons/md";
import PayrollCard from "../payroll_components/PayrollCard";
import { app_routes } from "../../utils/app_routes";

export default function HrOperations() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        { title: "Staff Information", icon: <LuCombine size={iconSize} color={iconColor} />, routePath: app_routes.hrOperation.staff_information.index},
        { title: "Leave Management", icon: <MdOutlineMoney size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.leave_management},
        { title: "Performance", icon: <MdOutlineMoney size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.performance},
        { title: "Training", icon: <RiMoneyCnyBoxLine size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.training},
        { title: "Settings", icon: <MdCalendarViewMonth size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.settings},
        { title: "Industrial Relations", icon: <MdOutlineMoney size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.industrial_relations},
        { title: "Promotions", icon: <MdReviews size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.promotions},
        { title: "Variations", icon: <PiContactlessPaymentLight size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.variations},
        { title: "HR Forms", icon: <MdHistoryEdu size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.hr_form},
        { title: "Report", icon: <MdHistoryEdu size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.report},
        { title: "Deployment & Transfer", icon: <MdHistoryEdu size={iconSize} color={iconColor} />, routePath :app_routes.hrOperation.deployment},
    ]

    //drawer functions
    const handleOpenDrawer = (id) => {
      setOpen({...open, status: true, id});
    };
    // const handleCloseDrawer = () => {
    //   setOpen({...open, status: false});
    // };


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
    </Fragment>
  )
}