/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import EditPensionForm from "../../../../components/payroll_components/EditPensionForm";
import StaffRankTable from "./StaffRankTable";
import EditStaffRankForm from "../../../../components/payroll_components/EditStaffRankForm";
const data = [{
  _id: 1,
  name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
{
  _id: 2,
   name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
{
  _id: 3,
 name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
{
  _id: 4,
 name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
{
  _id: 5,
 name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
{
  _id: 6,
 name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
{
  _id: 7,
 name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
{
  _id: 8,
 name: "A.C.E.O. (ACCT)",
  code: "ACC-001",
  abbrevation: "ACC"
},
]
export default function StaffRank() {
  const [open, setOpen] = useState({status: false, rank: null, role: null});

  const handleOpenDrawer = (__param) => {
    setOpen({...open, status: true, rank: __param?.rank, role: __param?.role});
  };
  const handleCloseDrawer = () => {
    setOpen({...open, status: false});
  };


  return (
    <>
      <section className="header">
        <section>
          <PageHeader header_text={'Staff Ranks'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Setting'}, {path: app_routes.payroll.setting.banks, name: 'Staff Ranks'}]} buttonProp = { [{button_text: 'Add New Rank', fn: handleOpenDrawer, fnParameter: {role: 'create'}}]} btnAvailable={true}/>
        </section>

        {/* attributes table */}
        <section>
          {/* <Separator separator_text={'Staff Rank List'}/> */}
         
          <StaffRankTable rows={data} handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer >
          <EditStaffRankForm rank={open.rank} role={open.role}/>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
