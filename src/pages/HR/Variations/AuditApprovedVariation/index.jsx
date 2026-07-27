/* eslint-disable no-unused-vars */

import { useState } from "react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import AuditApprovedVariationTable from "./AuditApprovedVariationTable";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
export default function AuditApprovedVariation() {
  const data = [
    // {
    //   _id: 1,
    //   name: "ANNUAL",
    //   year: "2023",
    //   month: "6",
    //   staff: "964",
    //   comment: 'Lorem Ipsum'
    // },
    // {
    //   _id: 2,
    //   name: "ANNUAL",
    //   year: "2023",
    //   month: "6",
    //   staff: "964",
    //   comment: 'Lorem Ipsum'
    // },
    // {
    //   _id: 3,
    //   name: "ANNUAL",
    //   year: "2023",
    //   month: "6",
    //   staff: "964",
    //   comment: 'Lorem Ipsum'
      
      
    // },
    // {
    //   _id: 4,
    //   name: "ANNUAL",
    //   year: "2023",
    //   month: "6",
    //   staff: "964",
    //   comment: 'Lorem Ipsum'
      
      
    // },
    // {
    //   _id: 5,
    //   name: "ANNUAL",
    //   year: "2023",
    //   month: "6",
    //   staff: "964",
    //   comment: 'Lorem Ipsum'
      
    // },
    
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
      <PageHeader header_text={'Audit Approved Variations'} btnAvailable = {false}/>
        

         <section>
         <Separator separator_text={'Variations'}/>

          <AuditApprovedVariationTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>

    {/* <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer} maxWidth={'70rem'}>
        <FormDrawer tabs={[{title: 'Variations'}]}>
        </FormDrawer>
      </ExpandedDrawerWithButton> */}
    </>
  );
}
