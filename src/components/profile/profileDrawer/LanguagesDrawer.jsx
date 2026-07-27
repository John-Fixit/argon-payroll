/* eslint-disable react/prop-types */
import { useState } from 'react'
import ExpandedDrawer from '../../modals/ExpandedDrawer'
import TextForm from '../../languagesForm/TextForm'
import AttachmentForm from '../../languagesForm/AttarchmentForm'
import NoteForm from '../../languagesForm/NoteForm'

export default function LanguagesDrawer({ isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    { title: 'Form', sub: 'Fill form', content: <TextForm /> },
    {
      title: 'Attachments',
      sub: 'Upload ',
      content: <AttachmentForm />,
    },
    {
      title: 'Notes',
      sub: 'Add Note',
      content: <NoteForm setIsOpen={setIsOpen} />,
    },
  ]

  return (
    <>
      <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
        <div className='flex h-full flex-col md:flex-row overflow-y-scrol'>
          <div className='flex flex-col w-full md:w-60 bg-chatsidebar'>
            <h3 className=' text-center text-gray-400 border-gray-400 border-b-2 p-2'>
              Languages
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
        </div>
      </ExpandedDrawer>
    </>
  )
}

const Tab = ({ children }) => {
  return <div className='h-full md:w-[35rem] mx-auto  p-4'>{children}</div>
}
