import { Fragment, useState } from "react";
import PayrollCard from "../../../components/payroll_components/PayrollCard";
import { BsTicketDetailed } from "react-icons/bs";
import { app_routes } from "../../../utils/app_routes";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../components/payroll_components/FormDrawer";
export default function Report() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        {title: "Active Staff", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, routePath: app_routes.payroll.report.staff},
        {title: "Exit Staff", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, routePath: app_routes.payroll.report.exited_staff},
        {title: "Payroll", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, routePath: app_routes.payroll.report.payroll},
        {title: "External", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, routePath: app_routes.payroll.report.external},
        {title: "Remita Bank report", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, drawer: true},
        {title: "Bank Attribute Reports", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, drawer: true},
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
              <PayrollCard icon={item.icon} title={item.title} routePath={item?.routePath} />
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
        <FormDrawer>
          <p>
            {
              open.id===4? <div >Remita Bank Report</div>: open.id===5 ? <div >Bank Attribute Reports</div>:null
            }
          </p>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </Fragment>
  )
}
