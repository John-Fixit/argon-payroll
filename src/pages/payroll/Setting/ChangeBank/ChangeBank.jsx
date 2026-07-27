/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import ChangeBankTable from "./ChangeBankTable";
import ChangeStaffPfaForm from "../../../../components/payroll_components/ChangeStaffPfaForm";
import ChangeStaffBankForm from "../../../../components/payroll_components/ChangeStaffBankForm";
const data = [{
  _id: 1,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 2,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 3,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 4,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 5,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 6,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 7,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
{
  _id: 8,
  staffName: "MUBARAK MOHAMMED MAKERA",
  staffNo: "P2005",
  previousBank: "FIRST GUARANTEE PENSIONS(8)",
  currentBank: "FIRST GUARANTEE PENSIONS(8)",
},
]
export default function ChangeBank() {
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
          <PageHeader header_text={'Banks'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Setting'}, {path: app_routes.payroll.setting.banks, name: 'Change Bank'}]} buttonProp = { [{button_text: 'Change Staff Bank', fn: handleOpenDrawer, fnParameter: {role: "edit"}}]} btnAvailable={true}/>
        </section>

        {/* pension table */}
        <section>
          <Separator separator_text={'Changed Bank List'}/>
         
          <ChangeBankTable rows={data} handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer tabs={[{title: 'Change Staff Bank'}]}>
          <ChangeStaffBankForm pension={open.pension} role={open.role}/>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
