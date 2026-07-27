import { Fragment, useState } from "react";
import { BsTicketDetailed } from "react-icons/bs";
import PayrollCard from "../../../components/payroll_components/PayrollCard";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../components/payroll_components/FormDrawer";
import ProductivitySummary from "../../../components/payroll_components/ProductivitySummary";
import RunThirtheenthMonth from "../../../components/payroll_components/RunThirtheenthMonth";
import RecalculatePercentForm from "../../../components/payroll_components/RecalculatePercentForm";
import AuditReportForm from "../../../components/payroll_components/AuditReportForm";
export default function Productivity() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        {title: "Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Run 13th Month", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Recalculate percent", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Audit Report", icon: <BsTicketDetailed size={iconSize} color={iconColor} />}
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
        maxWidth={"60rem"}
      >
        <FormDrawer tabs={[{title: listData[open.id]?.title}]}>
          <p>
            {
              open.id===0? <ProductivitySummary /> : open.id===1? <RunThirtheenthMonth />: open.id===2? <RecalculatePercentForm />: open.id===3? <AuditReportForm /> : null
            }
          </p>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  )
}
