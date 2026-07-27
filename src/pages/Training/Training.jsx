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
export default function Training() {
  const [open, setOpen] = useState({status: false, id: null})
    const iconSize = "5vh";
    const iconColor = "#344860"
    const listData = [
        {title: "Department Trainings", icon: <BsTicketDetailed size={iconSize} color={iconColor} />, drawer: true},
        {title: "Pending Trainings", icon: <TbUserPause size={iconSize} color={iconColor} />, routePath: app_routes.training.pending_training},
        {title: "Set Transportation", icon: <GrGroup size={iconSize} color={iconColor} />, drawer: true},
        {title: "Set Fees", icon: <TbUserCancel size={iconSize} color={iconColor} />, routePath: app_routes.training.training_fee},
        {title: "Approved Training", icon: <TbUserCancel size={iconSize} color={iconColor} />, routePath: app_routes.training.approve_training},
        {title: "Training Status", icon: <TbUserCancel size={iconSize} color={iconColor} />, routePath: app_routes.training.training_status},
        {title: "Reports", icon: <TbUserCancel size={iconSize} color={iconColor} />, drawer: true},
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
