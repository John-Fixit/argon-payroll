
import Onboard_Await_AuditTable from "./Onboard_Await_AuditTable";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../utils/app_routes";
import Separator from "../../../components/payroll_components/Separator";
export default function Onboard_Await_Audit() {
  const data = [
    {
      _id: 1,
      name: "LASISI OLAYINKA",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
    },
    {
      _id: 2,
      name: "LASISI OLAYINKA",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
    },
    {
      _id: 3,
      name: "LASISI OLAYINKA",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)',
    },
    {
      _id: 4,
      name: "LASISI OLAYINKA",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)'
    },
    {
      _id: 5,
      name: "LASISI OLAYINKA",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'OLUTOYIN JOHNSON (NCAA/P.624)'
    },
    
  ];
  return (
    <>
      <section className="Onboard_Await_Audit_list">
      <PageHeader header_text={'staff Awaiting Audit Approval'} breadCrumb_data={[{path: app_routes.audit.index, name: 'Audit'}, {path: app_routes.audit.onboard_awaiting_audit, name: 'Onboard Await Audit'}]} btnAvailable = {false}/>
        
         {/* staffNo AWAITING AUDIT APPROVAL list table */}
         <section>
         <Separator separator_text={'staffNo AWAITING AUDIT APPROVAL'}/>

          <Onboard_Await_AuditTable rows={data} />
        </section>
      </section>
    </>
  );
}
