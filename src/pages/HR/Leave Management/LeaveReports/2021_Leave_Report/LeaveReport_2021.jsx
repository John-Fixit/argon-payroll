/* eslint-disable no-unused-vars */

import { useState } from "react";
import LeaveReport_2021_Table from "./LeaveReport_2021_Table";
import PageHeader from "../../../../../components/payroll_components/PageHeader";
import Separator from "../../../../../components/payroll_components/Separator";
export default function LeaveReport_2021() {
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

  return (
    <>
      <section className="">
      <PageHeader header_text={'Leave Report for 2021'} btnAvailable = {false}/>
        
         {/* leave report list table */}
         <section>
         <Separator separator_text={'2021 Leave Report'}/>

          <LeaveReport_2021_Table rows={data}/>
        </section>
      </section>

    </>
  );
}
