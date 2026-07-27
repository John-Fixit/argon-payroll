/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import ChangePfaTable from "./ChangePfaTable";
import ChangeStaffPfaForm from "../../../../components/payroll_components/ChangeStaffPfaForm";
const data = [{
  _id: 1,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 2,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 3,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 4,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 5,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 6,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 7,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 8,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousPfa: "FIRST GUARANTEE PENSIONS(8)",
  currentPfa: "FIRST GUARANTEE PENSIONS(8)",
},
]
export default function ChangePfa() {
  const [open, setOpen] = useState({status: false, pension: null, role: null});

  const handleOpenDrawer = ({pension, role}) => {
    setOpen({...open, status: true, pension, role});
  };
  const handleCloseDrawer = () => {
    setOpen({...open, status: false});
  };

  return (
    <>
      <section className="header">
        <section>
          <PageHeader header_text={'PFAs'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Setting'}, {path: app_routes.payroll.setting.banks, name: 'Change PFA'}]} buttonProp = { [{button_text: 'Change Staff PFA', fn: handleOpenDrawer, fnParameter: {role: "edit"}}]} btnAvailable={true}/>
        </section>

        {/* change PFA table */}
        <section>
          <Separator separator_text={'Changed PFA List'}/>
         
          <ChangePfaTable rows={data} handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer tabs={[{title: 'Change Staff PFA'}]}>
          <ChangeStaffPfaForm pension={open.pension} role={open.role}/>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
