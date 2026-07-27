/* eslint-disable react/prop-types */
import { useState } from 'react'
import ExpandedDrawer from '../modals/ExpandedDrawer'

export default function FormRequestDrawer({ isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [
    { title: 'Form', sub: 'Fill form', content: <div>Content for Tab 1</div> },
    {
      title: 'Attachments',
      sub: 'Upload Documents',
      content: <div>Content for Tab 2</div>,
    },
    { title: 'Notes', sub: 'Add Note', content: <div>Content for Tab 3</div> },
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
                    ? ' text-[#fff] border-t-4 border-blue-500 '
                    : 'text-gray-500 bg-gray-100 border-1 '
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
  return <div className='h-full p-4'>{children}</div>
}
