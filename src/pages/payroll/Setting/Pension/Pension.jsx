/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import PensionTable from "./PensionTable";
import EditPensionForm from "../../../../components/payroll_components/EditPensionForm";
const data = [{
  _id: 1,
  name: "ACCESS PENSION",
  code: "ACC-001"
},
{
  _id: 2,
   name: "AIICO PENSIONS MANAGERS LTD",
  code: "ACC-001"
},
{
  _id: 3,
 name: "ACCESS BANK PLC",
  code: "ACC-001"
},
{
  _id: 4,
 name: "ACCESS BANK PLC",
  code: "ACC-001"
},
{
  _id: 5,
 name: "ACCESS BANK PLC",
  code: "ACC-001"
},
{
  _id: 6,
 name: "ACCESS BANK PLC",
  code: "ACC-001"
},
{
  _id: 7,
 name: "FIRST GUARANTEE PENSIONS",
  code: "ACC-001"
},
{
  _id: 8,
 name: "FIDELITY PENSIONS",
  code: "ACC-001"
},
]
export default function Pension() {
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
          <PageHeader header_text={'Pension'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Setting'}, {path: app_routes.payroll.setting.banks, name: 'Pension'}]} buttonProp = { [{button_text: 'Add New PFA', fn: handleOpenDrawer, fnParameter: {role: "create"}}]} btnAvailable={true}/>
        </section>

        {/* pension table */}
        <section>
          <Separator separator_text={'Pension List'}/>
         
          <PensionTable rows={data} handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer >
          <EditPensionForm pension={open.pension} role={open.role}/>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
