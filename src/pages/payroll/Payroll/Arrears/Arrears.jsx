/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import ArrearsTable from "./ArrearsTable";
import NewAttributeForm from "../../../../components/payroll_components/NewAttributeForm";
import Add_UploadStaffArrearForm from "../../../../components/payroll_components/Add_UploadStaffArrearForm";
const data = [{
  _id: 100,
  name: "ACCESS PENSION",
  attributeName: "ACC-001",
  arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001"
},
{
  _id: 200,
   name: "AIICO PENSIONS MANAGERS LTD",
  attributeName: "ACC-001",
  arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001",
},
{
  _id: 300,
 name: "ACCESS BANK PLC",
  attributeName: "ACC-001",
  arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001",
},
{
  _id: 467,
 name: "ACCESS BANK PLC",
  attributeName: "ACC-001",
  arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001",
},
{
  _id: 590,
 name: "ACCESS BANK PLC",
  attributeName: "ACC-001",arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001",
},
{
  _id: 629,
 name: "ACCESS BANK PLC",
  attributeName: "ACC-001",
  arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001",
},
{
  _id: 701,
 name: "FIRST GUARANTEE PENSIONS",
  attributeName: "ACC-001",
  arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001",
},
{
  _id: 8099,
    name: "FIDELITY PENSIONS",
  attributeName: "ACC-001",
  arrearsYear: "ACC-001",
  arrearsMonth: "ACC-001",
  payrollYear: "ACC-001",
  payrollMonth: "ACC-001",
  amount: "ACC-001",
},
]
export default function Arrears() {
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
          <PageHeader header_text={'Arrears'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Payroll'}, {path: app_routes.payroll.setting.banks, name: 'Arrears'}]} buttonProp = { [{button_text: 'Upload/Add Staff Arrears', fn: handleOpenDrawer}]} btnAvailable={true}/>
        </section>

        {/* arrears table */}
        <section>
          {/* <Separator separator_text={'Attributes List'}/> */}
         
          <ArrearsTable rows={data} handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer >
          <Add_UploadStaffArrearForm  />
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
