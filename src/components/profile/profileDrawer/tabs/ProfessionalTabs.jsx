import { useState } from 'react'
import WorkTable from '../../../tables/WorkTable'
import ProfessionalBodiesTable from '../../../tables/ProfessionalBodiesTable'
import CooprativeTable from '../../../tables/CooprativeTable'
import LabourTable from '../../../tables/LabourTable'
import TabCard from './TabCard'
import { FaBriefcase } from 'react-icons/fa';
import { FaIdeal } from "react-icons/fa";
export default function ProfessionalTabs() {
  const [stepper, setstepper] = useState(1)


  const data = [
    {
      id: 1,
      label: "Work Experience",
      icon: FaIdeal,
      b_color: "bg-amber-100",
      t_color: "text-amber-500",
    },
    {
      id: 2,
      label: "Profession",
      icon: FaBriefcase,
      b_color: "bg-green-100",
      t_color: "text-green-500",
    },
  ]



  return (
    <div>

<TabCard data={data} stepper={stepper} setstepper={setstepper}/>


      {stepper === 1 && (
        <div className='space-y-5'>
          <WorkTable />
        </div>
      )}
      {stepper === 2 && (
        <div className='space-y-5'>
           <ProfessionalBodiesTable />
        </div>
      )}
      {stepper === 3 && (
        <div className='space-y-5'>
         <LabourTable />
        </div>
      )}
      {stepper === 4 && (
        <div className='space-y-5'>
          <CooprativeTable />
        </div>
      )}
    </div>
  )
}
