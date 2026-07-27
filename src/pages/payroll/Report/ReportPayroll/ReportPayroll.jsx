import { Fragment, useState } from "react";
import { BsTicketDetailed } from "react-icons/bs";
import PayrollCard from "../../../../components/payroll_components/PayrollCard";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import { CgAttribution } from "react-icons/cg";
export default function ReportPayroll() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        {title: "Attribute Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Location/ Dept Summary", icon: <CgAttribution size={iconSize} color={iconColor} />},
        {title: "Grade Level Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Bank Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Contribution Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Pension Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Loans Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Tax Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Arrears Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Salary Summary", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Arrears Info", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
        {title: "Negative Report", icon: <BsTicketDetailed size={iconSize} color={iconColor} />},
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
        <FormDrawer tabs={[{title: listData[open?.id]?.title}]}>
          <p>
            {listData[open?.id]?.title}
          </p>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  )
}
