/* eslint-disable react/prop-types */
import { useState } from 'react'
import ExpandedDrawer from '../../modals/ExpandedDrawer'
import TextForm from '../../socialForm/TextForm'
import ExpandedDrawerWithButton from '../../modals/ExpandedDrawerWithButton'

export default function SocialInformationDrawer({ isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState(0)

  



  const tabs = [
    {
      title: 'Details',
      sub: 'Fill form',
      content: <TextForm setIsOpen={setIsOpen} />,
    },
  ]


  return (
    <>


      <ExpandedDrawerWithButton isOpen={isOpen} onClose={()=>setIsOpen(false)} maxWidth={700}>
      <div className='bg-[#f5f7fa] min-h-screen  px-8 '>
          <h4 className='header_h3 text-2xl'>Social Information</h4>
          <div className='grid grid-cols-1 h-ful md:grid-cols-4 gap-x-7 gap-y-5'>
          <div className="w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white mt-2 rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 ">
                {tabs[selectedTab].content}
              </div>

            <div className='border-0 md:border-l-2 mt16  h-auto relative px-5 font-Exo text-gray-500 order-1 md:order-2'>
              <div className='flex flex-col py-5 md:py28 text-sm gap-3'>
                {tabs?.map((pk, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedTab === pk?.title && 'font-bold'
                    } relative cursor-pointer`}
                    onClick={() => setSelectedTab(index)}
                  >
                    {pk?.title}
                    <span
                      className={`w-3 h-3 rounded-full  ${
                        selectedTab === index ? 'bg-blue-500/80' : 'bg-gray-300'
                      }  border-2 border-white absolute -left-[1.7rem] top-1 duration-200 transition-all`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ExpandedDrawerWithButton>
    </>
  )
}

// const Tab = ({ children }) => {
//   return <div className='h-full md:w-[35rem] mx-auto  p-4'>{children}</div>
// }
