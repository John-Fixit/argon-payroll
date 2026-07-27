
import OnboardApprovedTable from "./OnboardApprovedTable";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import Separator from "../../../components/payroll_components/Separator";
export default function OnboardApproved() {
  const data = [
    {
      _id: 1,
      employmentType: "FULL TIME",
      name: "10000",
      employeeNo: "NCAA/P.2356",
      hrApprovalDate: "1970-01-01",
      onboardApprovedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      status: 'Approved',
      auditApprovalDate: 'EMMANUEL OWOWA (NCAA/P.472)',
      auditApprovedBy: '2024-09-02',
      auditRemark: '',
      
    },
    {
      _id: 2,
      employmentType: "FULL TIME",
      name: "14000",
      employeeNo: "NCAA/P.2356",
      hrApprovalDate: "1970-01-01",
      onboardApprovedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      status: 'Approved',
      auditApprovalDate: 'EMMANUEL OWOWA (NCAA/P.472)',
      auditApprovedBy: '2024-09-02',
      auditRemark: '',
      
    },
    {
      _id: 3,
      employmentType: "FULL TIME",
      name: "OLUFEMI ODUKOYA",
      employeeNo: "NCAA/P.2356",
      hrApprovalDate: "1970-01-01",
      onboardApprovedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      status: 'Approved',
      auditApprovalDate: 'EMMANUEL OWOWA (NCAA/P.472)',
      auditApprovedBy: '2024-09-02',
      auditRemark: '',
      
    },
    {
      _id: 4,
      employmentType: "FULL TIME",
      name: "OLUFEMI ODUKOYA",
      employeeNo: "NCAA/P.2356",
      hrApprovalDate: "1970-01-01",
      onboardApprovedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      status: 'Approved',
      auditApprovalDate: 'EMMANUEL OWOWA (NCAA/P.472)',
      auditApprovedBy: '2024-09-02',
      auditRemark: '',
      
    },
    {
      _id: 5,
      employmentType: "FULL TIME",
      name: "OLUFEMI ODUKOYA",
      employeeNo: "NCAA/P.2356",
      hrApprovalDate: "1970-01-01",
      onboardApprovedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      status: 'Approved',
      auditApprovalDate: 'EMMANUEL OWOWA (NCAA/P.472)',
      auditApprovedBy: '2024-09-02',
      auditRemark: '',
      
    },
    
  ];
  return (
    <>
      <section className="onboard_approved_list">
      <PageHeader header_text={'Staff Approved Nominomal Rolls by Audit'} breadCrumb_data={[{path: app_routes.audit.index, name: 'Audit'}, {path: app_routes.audit.onboard_approved, name: 'Onboard Approved'}]} btnAvailable = {false}/>
        
         {/* pending training list table */}
         <section>
         <Separator separator_text={'Staff Approved'}/>

          <OnboardApprovedTable rows={data} />
        </section>
      </section>
    </>
  );
}
