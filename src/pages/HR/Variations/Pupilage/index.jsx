/* eslint-disable no-unused-vars */

import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import PupilageTable from "./PupilageTable";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
export default function Pupilage() {
  const data = [
    {
      _id: 1,
      name: "	OBAFEMI OLU",
      directorate: "DIRECTORATE OF AIRWORTHINESS STANDARD",
      department: "AIRWORTHINESS STANDARDS & APPROVALS (ASA)",
      firstAppointment: "2021-04-12",
      currentAppointment: '2021-04-12',
      profession: 'Engineer',
      grade: '9'
    },
    {
      _id: 2,
      name: "MOHAMMAD ALKALI",
      directorate: "DIRECTORATE OF AIRWORTHINESS STANDARD",
      department: "AIRWORTHINESS STANDARDS & APPROVALS (ASA)",
      firstAppointment: "2021-04-12",
      currentAppointment: '2021-04-12',
      profession: 'Engineer',
      grade: '9'
    },
    {
      _id: 3,
      name: "	OBAFEMI OLU",
      directorate: "DIRECTORATE OF AIRWORTHINESS STANDARD",
      department: "AIRWORTHINESS STANDARDS & APPROVALS (ASA)",
      firstAppointment: "2021-04-12",
      currentAppointment: '2021-04-12',
      profession: 'Engineer',
      grade: '9'
      
      
    },
    {
      _id: 4,
      name: "	OBAFEMI OLU",
      directorate: "DIRECTORATE OF AIRWORTHINESS STANDARD",
      department: "AIRWORTHINESS STANDARDS & APPROVALS (ASA)",
      firstAppointment: "2021-04-12",
      currentAppointment: '2021-04-12',
      profession: 'Engineer',
      grade: '9'
      
      
    },
    {
      _id: 5,
      name: "MOHAMMAD ALKALI",
      directorate: "DIRECTORATE OF AIRWORTHINESS STANDARD",
      department: "AIRWORTHINESS STANDARDS & APPROVALS (ASA)",
      firstAppointment: "2021-04-12",
      currentAppointment: '2021-04-12',
      profession: 'Engineer',
      grade: '9'
      
    },
    
  ];

  const [open, setOpen] = useState({status: false, data: null})

  const handleOpenDrawer=()=>{
    setOpen({...open, status: true})
  }

  const handleCloseDrawer=()=>{
    setOpen({...open, status: false})
  }
  return (
    <>
      <section className="">
      <PageHeader header_text={'Pupilage'} btnAvailable = {false}/>
        

         <section>
         <Separator separator_text={'pupilage list'}/>

          <PupilageTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>

    {/* <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer} maxWidth={'70rem'}>
        <FormDrawer tabs={[{title: 'Variations'}]}>
        </FormDrawer>
      </ExpandedDrawerWithButton> */}
    </>
  );
}
