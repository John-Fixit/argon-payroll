/* eslint-disable no-unused-vars */
import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import PromotionTable from "./PromotionTable";
import AddStaffPromotion from "../../../../components/payroll_components/AddStaffPromotionForm";
const data = [{
  _id: 100,
  staffName: "ACCESS PENSION",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",
  
},
{
  _id: 200,
   staffName: "AIICO PENSIONS MANAGERS LTD",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",},
{
  _id: 300,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",
},
{
  _id: 467,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",
},
{
  _id: 590,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",
},
{
  _id: 629,
 staffName: "ACCESS BANK PLC",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",
},
{
  _id: 701,
 staffName: "FIRST GUARANTEE PENSIONS",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",
},
{
  _id: 8099,
    staffName: "FIDELITY PENSIONS",
  empNo: "ACC-001",
  gradeFrom: "ACC-001",
  stepFrom: "ACC-001",
  gradeTo: "ACC-001",
  stepTo: "ACC-001",
  date: "ACC-001",
},
]
export default function Promotion() {
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
          <PageHeader header_text={'Promotions'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Payroll'}, {path: app_routes.payroll.setting.banks, name: 'promotions'}]} buttonProp = { [{button_text: 'Add Staff Promotions', fn: handleOpenDrawer}]} btnAvailable={true}/>
        </section>

        {/* Promotion table */}
        <section>
          {/* <Separator separator_text={'Attributes List'}/> */}
         
          <PromotionTable rows={data} handleOpenDrawer={handleOpenDrawer} />
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer >
          <AddStaffPromotion  />
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
}
