import { useState } from 'react'
import Card from './Card'
import MedicalInformationDrawer from './profileDrawer/MedicalInformationDrawer'

export default function Medical() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <Card title='HMO' onEditClick={handleEditClick} hasEditIcon={true}>
        <div className='col-md7 divide-y-2'>
          {/* <h2 className='text-[#444e4e] font-[500] text-[0.9rem] uppercase '>
                Add Hospital
              </h2> */}
          <ul className=' mt-2 w-full text-[0.9rem] flex flex-col space-y-3'>
            <li className='grid grid-cols-2'>
              <span className='text-[#444e4e] font-[500] text-[0.9rem] capitalize '>
                {' '}
                Package:
              </span>
              <span className='text-[#888] h-auto hyphens-auto text-end  breakwords pb-2 border-b-2 w-full max-w-sm font-profileFontSize'>
                Reliance HMO
              </span>
            </li>
            <li className='grid grid-cols-2'>
              <span className='text-[#444e4e] font-[500] text-[0.9rem] capitalize '>
                {' '}
                Card NO:
              </span>
              <span className='text-[#888] h-auto hyphens-auto text-end  break-words pb-2 border-b-2 w-full max-w-sm font-profileFontSize'>
                REL566NH988
              </span>
            </li>
          </ul>
          {/* <ul className='personal-info '>
              <li className='flex  lg:w-[500px] gap-8 lg:gap-36 items-start mb-2'>
                <div className='title w-[50%] text-[#333333] font-semibold text-[15px]'>
                  Name:
                </div>
                <div className='text-[#888888] w-[50%]  outline-none no-underline font-profileFontSize text-md hover:no-underline'>
                  Test Membership
                </div>
              </li>

             
            </ul> */}
        </div>
      </Card>
      {isDrawerOpen && (
        <MedicalInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
