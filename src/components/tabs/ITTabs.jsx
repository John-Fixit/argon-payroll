/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { LineChart } from 'lucide-react'
import { useState } from 'react'
import { GrAnnounce } from 'react-icons/gr'

export default function ITTabs({ step }) {
  const [current, setCurrent] = useState('reset password')

  const tabbing = (e) => {
    switch (e) {
      case 'reset password':
        step(1)
        setCurrent('reset password')
        break
      case 'documents':
        step(2)
        setCurrent('documents')
        break
      case 'hr rights':
        step(3)
        setCurrent('hr rights')
        break

      default:
        break
    }
  }

  return (
    <div className='flex w-full flex-col'>
      <Tabs
        onSelectionChange={tabbing}
        size={'md'}
        fullWidth
        variant='underlined'
        aria-label='Content Option Tab'
        data
        classNames={{
          tabList:
            'rounded-md bg-tablistcolor gap-0 p-0 bg-opacity-100 shadow-sm',
          tabContent:
            'font-bold bg-opacity-100 tracking-widest group-data-[selected=true]:text-gray-700 text-tablistUnselectedcolor ',
          cursor: 'bg-tabcursorcolor  h-[0.35rem] top-0 w-full',
          tab: 'h-16 border border-[1.2px] border-tablistbordercolor shadow-none bg-opacity-100',
        }}
      >
        <Tab
          key='reset password'
          className={`text-sm ${current === 'reset password ' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <LineChart size={15} />
              <span>Reset Password</span>
            </div>
          }
        />
        <Tab
          key='documents'
          className={` text-sm ${current === 'documents' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Documents</span>
            </div>
          }
        />
        <Tab
          key='hr rights'
          className={` text-sm ${current === 'hr rights' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>HR Rights</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
