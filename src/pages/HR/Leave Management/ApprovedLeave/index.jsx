/* eslint-disable no-unused-vars */

import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import ApprovedLeaveTable from "./ApprovedLeaveTable";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
export default function ApprovedLeave() {
  const data = [
    {
      _id: 1,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      currentStage: 'Level 2',
      approval1: 'MARUFAT MUHAMMED (NCAA/P.2035)',
      approval2: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      
      
    },
    {
      _id: 2,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      currentStage: 'Level 2',
      approval1: 'MARUFAT MUHAMMED (NCAA/P.2035)',
      approval2: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      
      
    },
    {
      _id: 3,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      currentStage: 'Level 2',
      approval1: 'MARUFAT MUHAMMED (NCAA/P.2035)',
      approval2: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      
      
    },
    {
      _id: 4,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      currentStage: 'Level 2',
      approval1: 'MARUFAT MUHAMMED (NCAA/P.2035)',
      approval2: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      
      
    },
    {
      _id: 5,
      staff: "ROTIMI AROGUNJO (NCAA/P.85)",
      date: "2023-12-01",
      type: "Annual",
      duration: "30",
      startDate: '2023-12-11',
      endDate: '2023-12-11',
      currentStage: 'Level 2',
      approval1: 'MARUFAT MUHAMMED (NCAA/P.2035)',
      approval2: 'OLUTOYIN JOHNSON (NCAA/P.624)',
      
    },
    
  ];

  const [open, setOpen] = useState({status: false, data: null})

  const handleOpenDrawer=(data)=>{
    setOpen({...open, status: true, data})
  }

  const handleCloseDrawer=()=>{
    setOpen({...open, status: false})
  }
  return (
    <>
      <section className="">
      <PageHeader header_text={'Approved Leave Requests'} btnAvailable = {false}/>
        
         {/* approved leave list table */}
         <section>
         <Separator separator_text={'Approved Leave'}/>

          <ApprovedLeaveTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>


      {/* <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer tabs={[{title: 'Request'}]}>
          View Request {open?.data?.staff}
        </FormDrawer>
      </ExpandedDrawerWithButton> */}
    </>
  );
}
