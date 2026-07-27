import { useState } from 'react'
import Card from './Card'
import LabourInformationDrawer from './profileDrawer/LabourInformationDrawer'

export default function LabourAssociations() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <Card
        title='Labour Associations'
        onEditClick={handleEditClick}
        hasEditIcon={true}
      >
        <div className='  font-apple-system text-[500] py4'>
          <div className='row lg:w-[550px]'>
            <div className='col-md7 divide-y-2'>
              <h2 className=' text-[#333333] font-semibold text-[15px]'>
                Add Labour Associations
              </h2>
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
          </div>
        </div>
      </Card>
      {isDrawerOpen && (
        <LabourInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
