import { useState } from 'react'
import EducationTable from '../../../tables/EducationTable'
import CertificationTable from '../../../tables/CertificationTable'
import { BiSolidCertification } from "react-icons/bi";
import { MdCastForEducation } from "react-icons/md";
import TabCard from './TabCard';

export default function AcedemicTab() {
  const [stepper, setstepper] = useState(1)

  const requestHistory = [
    {
      id: 1,
      label: "Education",
      icon: MdCastForEducation,
      b_color: "bg-amber-100",
      t_color: "text-amber-500",
    },
    {
      id: 2,
      label: "Certification",
      icon: BiSolidCertification,
      b_color: "bg-green-100",
      t_color: "text-green-500",
    },
  ]

  return (
    <div>

     <TabCard data={requestHistory} stepper={stepper} setstepper={setstepper}/>



      {stepper === 1 && (
        <div className='space-y-5'>
          <EducationTable />
        </div>
      )}
      {stepper === 2 && (
        <div className='space-y-5'>
          <CertificationTable />
        </div>
      )}
    </div>
  )
}
