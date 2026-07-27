/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Card from './Card'
import CertInformationDrawer from './profileDrawer/CertInformationDrawer'
import WorkTable from '../tables/WorkTable'

export default function Certifications() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      {/* <Card
        title='Certifications'
        hasEditIcon={true}
        onEditClick={handleEditClick}
      >
        <div className='divide-y-2'>
          <ul className='font-apple-system text-[15px] py-2  flex flex-col space-y-3'>
            <li className='grid grid-cols-2'>
              <span className='text-[#333333] font-semibold'>
                Certifications Name
              </span>
              <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                Amazon Cloud
              </span>
            </li>
            <li className='grid grid-cols-2'>
              <span className='text-[#333333] font-semibold'>
                {' '}
                Certifications Type:
              </span>
              <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                Aws
              </span>
            </li>
            <li className='grid grid-cols-2'>
              <span className='text-[#333333] font-semibold'> Duration:</span>
              <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                Jan 2019 - Dec 2019
              </span>
            </li>
          </ul>
          <ul className='font-apple-system text-[15px] py-2  flex flex-col space-y-3'>
            <li className='grid grid-cols-2'>
              <span className='text-[#333333] font-semibold'>
                {' '}
                Certifications Name
              </span>
              <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                Reeact
              </span>
            </li>
            <li className='grid grid-cols-2'>
              <span className='text-[#333333] font-semibold'>
                {' '}
                Certifications Type:
              </span>
              <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                Cloud
              </span>
            </li>
            <li className='grid grid-cols-2'>
              <span className='text-[#333333] font-semibold'> Duration:</span>
              <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                Feb 2019 - Nov 2019
              </span>
            </li>
          </ul>
        </div>
      </Card> */}
      <WorkTable />
      {isDrawerOpen && (
        <CertInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
