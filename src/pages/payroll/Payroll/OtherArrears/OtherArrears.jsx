/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import OtherArrearsTable from "./OtherArrearsTable";
import Add_UploadStaffArrearForm from "../../../../components/payroll_components/Add_UploadStaffArrearForm";

const data = [{
  _id: 100,
  staffName: "ACCESS PENSION",
  empNo: "ACC-001",
  arrear: "ACC-001",
  monthPayment: "ACC-001",
  
  
},
{
  _id: 200,
   staffName: "AIICO PENSIONS MANAGERS LTD",
  empNo: "ACC-001",
  arrear: "ACC-001",
  monthPayment: "ACC-001",
  paySlip: "ACC-001"
},
{
  _id: 300,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",
  arrear: "ACC-001",
  monthPayment: "ACC-001",
  
},
{
  _id: 467,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",
  arrear: "ACC-001",
  monthPayment: "ACC-001",
  
},
{
  _id: 590,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",arrear: "ACC-001",
  monthPayment: "ACC-001",
  
},
{
  _id: 629,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",
  arrear: "ACC-001",
  monthPayment: "ACC-001",
  
},
{
  _id: 701,
 staffName: "FIRST GUARANTEE PENSIONS",
  empNo: "ACC-001",
  arrear: "ACC-001",
  monthPayment: "ACC-001",
  
},
{
  _id: 8099,
    staffName: "FIDELITY PENSIONS",
  empNo: "ACC-001",
  arrear: "ACC-001",
  monthPayment: "ACC-001",
  
},
]
export default function OtherArrears() {
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
          <PageHeader header_text={'Other Arrears'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Payroll'}, {path: app_routes.payroll.setting.banks, name: 'Other Arrears'}]} buttonProp = { [{button_text: 'Upload/ Add Staff Arrears', fn: handleOpenDrawer}]} btnAvailable={true}/>
        </section>

        {/* attributes table */}
        <section>
          {/* <Separator separator_text={'Other Arrears List'}/> */}
         
          <OtherArrearsTable rows={data} handleOpenDrawer={handleOpenDrawer} />
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
