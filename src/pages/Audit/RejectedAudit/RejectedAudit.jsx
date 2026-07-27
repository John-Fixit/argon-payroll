
import RejectedAuditTable from "./RejectedAuditTable";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import Separator from "../../../components/payroll_components/Separator";
export default function RejectedAudit() {
  const data = [
    // {
    //   _id: 1,
    //   name: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
    //   year: "10000",
    //   month: "LOCAL",
    //   staff: "0",
    //   comment: '2024-10-21'
    // },
    // {
    //   _id: 2,
    //   name: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
    //   year: "14000",
    //   month: "LOCAL",
    //   staff: "0",
    //   comment: '2024-10-21'
      
    // },
    // {
    //   _id: 3,
    //   name: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
    //   year: "20000",
    //   month: "LOCAL",
    //   staff: "0",
    //   comment: '2024-10-21',
    // },
    // {
    //   _id: 4,
    //   name: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
    //   year: "30000",
    //   month: "LOCAL",
    //   staff: "0",
    //   comment: '2024-10-21'
      
    // },
    // {
    //   _id: 5,
    //   name: "ADVANCED AVIATION PLANNING OPERATIONS AND MANAGEMENT",
    //   year: "40000",
    //   month: "LOCAL",
    //   staff: "0",
    //   comment: '2024-10-21'
    // },
    
  ];
  return (
    <>
      <section className="audit_rejected">
      <PageHeader header_text={'Rejected Audit Variations'} breadCrumb_data={[{path: app_routes.audit.index, name: 'Audit'}, {path: app_routes.audit.audit_rejected, name: 'Variation'}]} btnAvailable = {false}/>
        
         {/* rejected audit list table */}
         <section>
         <Separator separator_text={'Rejected Audit'}/>

          <RejectedAuditTable rows={data} />
        </section>
      </section>
    </>
  );
}
