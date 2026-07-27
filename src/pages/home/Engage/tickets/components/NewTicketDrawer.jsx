/* eslint-disable react/prop-types */
import { useState } from 'react'
import TextForm from './ticketForm/TextForm'
import AttachmentForm from './ticketForm/AttachmentForm'
import NoteForm from './ticketForm/NoteForm'
import ExpandedDrawer from '../../../../../components/modals/ExpandedDrawer'

export default function NewTicketDrawer({ isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    {
      title: 'Form',
      sub: 'Fill form',
      content: (
        <TextForm
          onPrev={() => setSelectedTab(0)}
          onNext={() => setSelectedTab(1)}
        />
      ),
    },
    {
      title: 'Attachments',
      sub: 'Upload ',
      content: (
        <AttachmentForm
          onPrev={() => setSelectedTab(0)}
          onNext={() => setSelectedTab(2)}
        />
      ),
    },
    {
      title: 'Notes',
      sub: 'Add Note',
      content: (
        <NoteForm setIsOpen={setIsOpen} onPrev={() => setSelectedTab(1)} />
      ),
    },
  ]

  return (
    <>
      <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
        {/* <div className='flex h-full flex-col md:flex-row overflow-y-scrol'>
          <div className='flex flex-col w-full md:w-60 bg-chatsidebar'>
            <h3 className=' text-center text-gray-400 border-gray-400 border-b-2 p-2'>
              Work Experience
            </h3>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`${
                  selectedTab === index
                    ? ' text-[#fff] border-b4 borderblue-500 '
                    : 'text-gray-500   '
                }  font-bold font-sans h-16 text-md relative  `}
              >
                {selectedTab === index && (
                  <span className='w-2 h-2 rounded-full absolute left-4 top-6 bg-btnColor duration-200 transition-all'></span>
                )}
                {tab.title}
                <span className='block font-normal'>{tab.sub}</span>
              </button>
            ))}
          </div>
          <Tab>{tabs[selectedTab].content}</Tab>
        </div> */}
        <div className='bg-[#f5f7fa] min-h-screen  p-10'>
          <h4 className='header_h3 text-2xl'>Ticket</h4>
          <div className=' pt-8 grid grid-cols-1 md:grid-cols-[1fr_160px] min-h-full gap-7 md:gap-20 lg:gap-8'>
            {tabs[selectedTab].content}

            <div className='border-0 md:border-l-2 mt16  h-auto relative px-5 font-Exo text-gray-500'>
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
                {/* <button
                  type='submit'
                  onClick={onChangeTab}
                  className='bg-btnColor px-4 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70'
                >
                  {selectedTab === 2 ? 'Submit' : 'Save'}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </ExpandedDrawer>
    </>
  )
}

// const Tab = ({ children }) => {
//   return <div className='h-full md:w-[40rem] mx-auto  p-4'>{children}</div>
// }
