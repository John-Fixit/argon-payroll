/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import PayrollCard from "../../../components/payroll_components/PayrollCard";
import { CiBank } from "react-icons/ci";
import { CgAttribution } from "react-icons/cg";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineGroupAdd } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { app_routes } from "../../../utils/app_routes";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../components/payroll_components/FormDrawer";
import AttributeTable from "./Attribute/Attributetable";
import AddStaffPayrollTable from "../../../components/payroll_components/AddStaffPayrollTable";
export default function Setting() {
  //usestate
  const [open, setOpen] = useState(false);

  const iconSize = "5vh";
  const iconColor = "#344860";
  const listData = [
    {
      title: "Banks",
      icon: <CiBank size={iconSize} color={iconColor} />,
      routePath: app_routes.payroll.setting.banks,
    },
    {
      title: "PFA",
      icon: <GiTakeMyMoney size={iconSize} color={iconColor} />,
      routePath: app_routes.payroll.setting.pfas,
    },
    {
      title: "Attributes",
      icon: <CgAttribution size={iconSize} color={iconColor} />,
      routePath: app_routes.payroll.setting.attributes,
    },
    {
      title: "Staff Ranks",
      icon: <IoAnalytics size={iconSize} color={iconColor} />,
      routePath: app_routes.payroll.setting.staff_rank,
    },
    {
      title: "Add Staff to Payroll",
      icon: <MdOutlineGroupAdd size={iconSize} color={iconColor} />,
    },
    {
      title: "Generate Audit Report",
      icon: <AiOutlineAudit size={iconSize} color={iconColor} />,
    },
    {
      title: "Reset Payroll",
      icon: <BiReset size={iconSize} color={iconColor} />,
    },
  ];

  const handleOpenDrawer = () => {
    setOpen(true);
  };
  const handleCloseDrawer = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 my-3">
        {listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div onClick={item.title==="Add Staff to Payroll"?handleOpenDrawer:null}>
              <PayrollCard
                icon={item.icon}
                title={item.title}
                routePath={item.routePath}
              />
              </div>
            </Fragment>
          );
        })}
      </div>

      <ExpandedDrawerWithButton
        isOpen={open}
        onClose={handleCloseDrawer}
        maxWidth={"60rem"}
      >
        <FormDrawer tabs={[{title: "ADD STAFF PAYROLL"}]}>
          <AddStaffPayrollTable />
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
