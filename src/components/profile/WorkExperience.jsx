import { useState } from 'react'
import Card from './Card'
import WorkInformationDrawer from './profileDrawer/WorkInformationDrawer'
// import WorkTable from '../workTable/WorkTable'

export default function WorkExperience() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <Card
        title='Work Experience'
        onEditClick={handleEditClick}
        hasEditIcon={true}
      >
        <ul className='font-apple-system text-[15px]  flex flex-col space-y-3'>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'>
              {' '}
              Name of Company:
            </span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Clan Africa
            </span>
          </li>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'>Title:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Teacher
            </span>
          </li>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Duration:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Jan 2019 - Dec 2022
            </span>
          </li>
        </ul>
      </Card>
      {/* <div className=''>
        <WorkTable />
      </div> */}
      {isDrawerOpen && (
        <WorkInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
