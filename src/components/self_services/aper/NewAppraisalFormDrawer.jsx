/* eslint-disable react/prop-types */
import { useState } from 'react'
import ExpandedDrawerWithButton from '../../modals/ExpandedDrawerWithButton'
import ApprasealForm from './ApprasealForm'

export default function NewAppraisalFormDrawer({ isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = [{ title: 'Form', sub: 'Fill form', content: <ApprasealForm /> }]

  return (
    <>
      <ExpandedDrawerWithButton
        maxWidth={'80rem'}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <div className='grid grid-cols-[15rem_1fr] h-full    overflow-y-scroll'>
          <div className='flex flex-col    bg-chatsidebar    '>
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`${
                  selectedTab === index
                    ? ' text-[#fff] border-b-4 border-blue-500 '
                    : 'text-gray-500   '
                }  font-bold font-sans h-16 text-md `}
              >
                {tab.title}
                <span className='block font-normal'>{tab.sub}</span>
              </button>
            ))}
          </div>
          <Tab>{tabs[selectedTab].content}</Tab>
        </div>
      </ExpandedDrawerWithButton>
    </>
  )
}

const Tab = ({ children }) => {
  return <div className=' w-full  mx-auto py-4 px-12'>{children}</div>
}
