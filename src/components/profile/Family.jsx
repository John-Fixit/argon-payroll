import { useState } from 'react'
import Card from './Card'
import FamilyInformationDrawer from './profileDrawer/FamilyInformationDrawer'

export default function Family() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <Card title='Family' onEditClick={handleEditClick} hasEditIcon={true}>
        <ul className='font-apple-system text-[15px]  flex flex-col space-y-3'>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> John Stphen:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Brother
            </span>
          </li>

          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Grace Hawa:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Cousine
            </span>
          </li>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Jane Twaio:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Sister
            </span>
          </li>
        </ul>
      </Card>
      {isDrawerOpen && (
        <FamilyInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
