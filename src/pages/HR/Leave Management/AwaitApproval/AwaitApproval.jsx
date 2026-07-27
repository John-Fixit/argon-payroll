/* eslint-disable no-unused-vars */

import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import AwaitApprovalTable from "./AwaitApprovalTable";
export default function AwaitApproval() {
  const data = [
    {
      _id: 1,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 2,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 3,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 4,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    {
      _id: 5,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      leaveBalance: '0',
      leaveReturnDate: '2023-02-09',
      currentApproval: 'Level 2',
      
    },
    
  ];
  return (
    <>
      <section className="">
      <PageHeader header_text={'Leave Requests Awaiting Approvals'} btnAvailable = {false}/>
        
         {/* leave reqeust await approval list table */}
         <section>
         {/* <Separator separator_text={'Leave Request List'}/> */}

          <AwaitApprovalTable rows={data} />
        </section>
      </section>
    </>
  );
}
