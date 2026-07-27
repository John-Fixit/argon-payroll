import { Fragment, useState } from "react";
import { BsTicketDetailed } from "react-icons/bs";
import PayrollCard from "../../../../components/payroll_components/PayrollCard";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import LeaveReport_2021 from "./2021_Leave_Report/LeaveReport_2021";
import LeaveReport_2022 from "./2022_Leave_Report/LeaveReport_2022";
import LeaveReport_2023 from "./2023_Leave_Report/LeaveReport_2023";
import LeaveReport_2024 from "./2024_Leave_Report/LeaveReport_2024";
// import PayrollCard from "../../../components/payroll_components/PayrollCard";
// import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
// import FormDrawer from "../../../components/payroll_components/FormDrawer";
// import ProductivitySummary from "../../../components/payroll_components/ProductivitySummary";
// import RunThirtheenthMonth from "../../../components/payroll_components/RunThirtheenthMonth";
// import RecalculatePercentForm from "../../../components/payroll_components/RecalculatePercentForm";
// import AuditReportForm from "../../../components/payroll_components/AuditReportForm";
export default function LeaveReport() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        {title: "Leave Report for 2021", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Leave Report for 2022", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Leave Report for 2023", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Leave Report for 2024", icon: <BsTicketDetailed size={iconSize} color={iconColor} />}
    ]


    //drawer functions
    const handleOpenDrawer = (id) => {
      setOpen({...open, status: true, id});
    };
    const handleCloseDrawer = () => {
      setOpen({...open, status: false});
    };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 my-3">
        {listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div onClick={()=>handleOpenDrawer(index)}>
              <PayrollCard icon={item.icon} title={item.title}/>
              </div>
            </Fragment>
          );
        })}
      </div>

      <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
        maxWidth={"70rem"}
      >
        <FormDrawer tabs={[{title: listData[open.id]?.title}]}>
          {
            open?.id === 0?<LeaveReport_2021 />: open?.id === 1?<LeaveReport_2022 />:
            open?.id === 2?<LeaveReport_2023 />: open?.id === 3?<LeaveReport_2024 />: null
          }
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  )
}
