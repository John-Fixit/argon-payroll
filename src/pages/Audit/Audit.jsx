import { Fragment, useState } from "react";
import { BsTicketDetailed } from "react-icons/bs";
import { TbUserPause } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";
import { TbUserCancel } from "react-icons/tb";
import PayrollCard from "../../components/payroll_components/PayrollCard";
import { app_routes } from "../../utils/app_routes";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../components/payroll_components/FormDrawer";
import DepartmentalTrainingForm from "../../components/TraningComponents/DepartmentalTrainingForm";
import TrainingTransportForm from "../../components/TraningComponents/TrainingTransportForm";
import TrainingReportForm from "../../components/TraningComponents/TrainingReportForm";
export default function Audit() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        {title: "Onboarding Awaiting Approval", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, routePath: app_routes.audit.onboard_awaiting_audit, drawer: true},
        {title: "Approved Onboarding", icon: <TbUserPause size={iconSize} color={iconColor} />, routePath: app_routes.audit.onboard_approved, drawer: true},
        {title: "Audit Pending Variations", icon: <GrGroup size={iconSize} color={iconColor} />, routePath: app_routes.audit.audit_pending, drawer: true},
        {title: "Audit Rejected Variations", icon: <TbUserCancel size={iconSize} color={iconColor} />, routePath: app_routes.audit.audit_rejected, drawer: true},
        {title: "Audit Approved Variations", icon: <TbUserCancel size={iconSize} color={iconColor} />, routePath: app_routes.audit.audit_approved, drawer: true},
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
        <FormDrawer tabs={[{title: open?.id===0?"Add New Departmental Training": open?.id===2?"Set Training Transport": open?.id===6?"Training Reports": listData[open.id]?.title}]}>
          {/* <p>
            {listData[open.id]?.title}
          </p> */}
          {
            open?.id===0? <DepartmentalTrainingForm /> : open?.id===2? <TrainingTransportForm /> :  open?.id===6? <TrainingReportForm /> : listData[open.id]?.title
          }
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </Fragment>
  );
}
