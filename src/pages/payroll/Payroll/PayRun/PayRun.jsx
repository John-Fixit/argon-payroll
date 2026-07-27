/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import PayRunTable from "./PayRunTable";
import PayRunForm from "../../../../components/payroll_components/PayRunForm";
const data = [{
  _id: 100,
  month: "ACCESS PENSION",
  year: "ACC-001",
  status: "ACC-001"
},
{
  _id: 200,
   month: "AIICO PENSIONS MANAGERS LTD",
  year: "ACC-001",
  contribution: "ACC-001",
  status: "ACC-001",
  
},
{
  _id: 300,
 month: "ACCESS BANK PLC",
  year: "ACC-001",
  status: "ACC-001",
},
{
  _id: 467,
 month: "ACCESS BANK PLC",
  year: "ACC-001",
  status: "ACC-001",
},
{
  _id: 590,
 month: "ACCESS BANK PLC",
  year: "ACC-001",contribution: "ACC-001",
  status: "ACC-001",
  paySlip: "ACC-001",
},
{
  _id: 629,
 month: "ACCESS BANK PLC",
  year: "ACC-001",
  status: "ACC-001",
},
{
  _id: 701,
 month: "FIRST GUARANTEE PENSIONS",
  year: "ACC-001",
  status: "ACC-001",
},
{
  _id: 8099,
    month: "FIDELITY PENSIONS",
  year: "ACC-001",
  status: "ACC-001",
},
]
export default function PayRun() {
  const [open, setOpen] = useState({status: false, attribute: null, role: null});

  const handleOpenDrawer = (__param) => {
    setOpen({...open, status: true});
  };
  const handleCloseDrawer = () => {
    setOpen({...open, status: false});
  };

  return (
    <>
      <section className="header">
        <section>
          <PageHeader header_text={'PAYROLLS'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Payroll'}, {path: app_routes.payroll.setting.banks, name: 'Pay Run'}]} buttonProp = { [{button_text: 'Generate Payroll for new month', fn: handleOpenDrawer}]} btnAvailable={true}/>
        </section>

        {/* attributes table */}
        <section>
          {/* <Separator separator_text={'Attributes List'}/> */}
         
          <PayRunTable rows={data} handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer >
          <PayRunForm  />
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
