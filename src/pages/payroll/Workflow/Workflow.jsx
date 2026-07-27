/* eslint-disable no-unused-vars */
import { useState } from "react";
import Separator from "../../../components/payroll_components/Separator";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import WorkflowTable from "./WorkflowTable";
const data = [{
  _id: 100,
  level: "Audit",
  description: "Payment"
  
},
{
  _id: 200,
   level: "Payment",
  description: "Payment",
},
{
  _id: 300,
 level: "Salary",
  description: "Salary",
}
]
export default function PayRun() {
  const [open, setOpen] = useState({status: false, attribute: null, role: null});

  // drawer functions if needed
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
          <PageHeader header_text={'WORKFLOW'} breadCrumb_data={[{path: app_routes.payroll.setting.index, name: 'Payroll'}, {path: app_routes.payroll.setting.banks, name: 'Workflow'}]} btnAvailable={false}/>
        </section>

        {/* workflow table */}
        <section>
          {/* <Separator separator_text={'Workflow List'}/> */}
         
          <WorkflowTable rows={data}  />
        </section>
      </section>
    </>
  );
}
