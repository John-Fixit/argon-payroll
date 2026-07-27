import { useState } from 'react'
import Card from './Card'
import SocialInformationDrawer from './profileDrawer/SocialInformationDrawer'

export default function Social() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <Card title='Social' hasEditIcon={true} onEditClick={handleEditClick}>
        <ul className='font-apple-system text-[15px] flex flex-col space-y-3'>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Instagram:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Osomhe
            </span>
          </li>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> LinkedIn:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Osomhe
            </span>
          </li>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Instagram:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Osomhe
            </span>
          </li>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'>Twitter:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Osomhe
            </span>
          </li>
          <li className='grid grid-cols-2'>
            <span className='text-[#333333] font-semibold'> Google+:</span>
            <span className='text-[#888888] max-w-sm  font-profileFontSize '>
              Osomhe
            </span>
          </li>
        </ul>
      </Card>
      {isDrawerOpen && (
        <SocialInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
