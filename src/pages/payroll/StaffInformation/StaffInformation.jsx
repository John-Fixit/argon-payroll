import { Fragment } from "react";
import { BsTicketDetailed } from "react-icons/bs";
import { TbUserPause } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";
import { TbUserCancel } from "react-icons/tb";
import PayrollCard from "../../../components/payroll_components/PayrollCard";
import { app_routes } from "../../../utils/app_routes";
export default function StaffInformation() {
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        {title: "Staff details", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, routePath: app_routes.payroll.staffInformation.details},
        {title: "Suspend Staff", icon: <TbUserPause size={iconSize} color={iconColor} />, routePath: app_routes.payroll.staffInformation.suspend_staff},
        {title: "Staff Groups", icon: <GrGroup size={iconSize} color={iconColor} />, routePath: app_routes.payroll.staffInformation.groups},
        {title: "Suspended/Exited Staff", icon: <TbUserCancel size={iconSize} color={iconColor} />, routePath: app_routes.payroll.staffInformation.suspend_list}
    ]
  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 my-3">
        {listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <PayrollCard icon={item.icon} title={item.title} routePath={item.routePath}/>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}
