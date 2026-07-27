import { useState } from 'react'
import Card from './Card'
import ProfessionalBodyDrawer from './profileDrawer/ProfessionalBodyDrawer'

export default function ProfessionalBodies() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <Card
        title='Professional Bodies'
        onEditClick={handleEditClick}
        hasEditIcon={true}
      >
        <ul className='font-apple-system text-[15px]  flex flex-col space-y-3'>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Name:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Test Membership
            </span>
          </li>

          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Duration:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Jan 2019 - Dec 2019
            </span>
          </li>
        </ul>
      </Card>
      {isDrawerOpen && (
        <ProfessionalBodyDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
