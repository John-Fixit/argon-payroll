import { Fragment } from "react";
import SuspensionListTable from "./SuspensionListTable";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import Separator from "../../../../components/payroll_components/Separator";
export default function SuspensionList() {
  const data = [
    {
      _id: 1,
      employmentType: "ADMIN (HQTRS ABUJA)",
      name: "ADMIN (HQTRS ABUJA)",
      employeeNo: "113",
      grade: "Yes",
      directorate: 'Directorate',
      exitYear: 'Directorate',
      remark: 'Directorate',
      by: 'Directorate',
      attachment: 'Directorate',
    }
  ];
  return (
    <Fragment>
      <section className="suspension_list">
      <PageHeader header_text={'Suspension List'} breadCrumb_data={[{path: app_routes.payroll.staffInformation.index, name: 'Staff Information'}, {path: app_routes.payroll.staffInformation.suspend_list, name: 'Suspension List'}]} buttonProp = { [{button_text: 'Add Staff Suspension'}, {button_text: 'Change Staff Bank'}]} btnAvailable = {false}/>
        
         {/* suspension list table */}
         <section>
         <Separator separator_text={'Suspend List'}/>

          <SuspensionListTable rows={data} />
        </section>
      </section>
    </Fragment>
  );
}
