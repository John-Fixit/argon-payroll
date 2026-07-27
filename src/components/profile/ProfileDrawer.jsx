/* eslint-disable react/prop-types */
import { useState } from 'react'
import NoteForm from '../formRequest/NoteForm'
import ExpandedDrawer from '../modals/ExpandedDrawer'
import AttachmentForm from '../formRequest/AttarchmentForm'

export default function ProfileDrawer({ isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    { title: 'Form', sub: 'Fill form', content: <div>Content for Tab 1</div> },
    {
      title: 'Attachments',
      sub: 'Upload ',
      content: <AttachmentForm />,
    },
    { title: 'Notes', sub: 'Add Note', content: <NoteForm /> },
    {
      title: 'HandOver',
      sub: 'Upload ',
      content: <div>Content for Tab 2</div>,
    },
    {
      title: 'Approval',
      sub: 'Add Note',
      content: <div>Content for Tab 3</div>,
    },
  ]

  return (
    <>
      <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
        <div className='flex h-full  overflow-y-scrol'>
          <div className='flex flex-col  w-60 bg-chatsidebar    '>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`${
                  selectedTab === index
                    ? ' text-[#fff] border-b-4 border-blue-500 '
                    : 'text-gray-500   '
                }  font-bold font-sans h-16 text-md px14 py2`}
              >
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
  return <div className='h-full w-[35rem] mx-auto  p-4'>{children}</div>
}
