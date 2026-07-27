/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { LineChart } from 'lucide-react'
import { useState } from 'react'
import { GrAnnounce } from 'react-icons/gr'

export default function ApresTabs({ step }) {
  const [current, setCurrent] = useState('my request')

  const tabbing = (e) => {
    switch (e) {
      case 'my request':
        step(1)
        setCurrent('my request')
        break
      case 'pending approval':
        step(2)
        setCurrent('pending approval')
        break
      case 'treated approval ':
        step(3)
        setCurrent('treated approval')
        break
      case 'new form':
        step(4)
        setCurrent('new form')
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
          key='my request'
          className={`text-sm ${current === 'my request ' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <LineChart size={15} />
              <span>My Request</span>
            </div>
          }
        />
        <Tab
          key='pending approval'
          className={` text-sm ${
            current === 'pending approval' && 'bg-white'
          } `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Pending Approval</span>
            </div>
          }
        />
        <Tab
          key='treated approval'
          className={` text-sm ${
            current === 'treated approval' && 'bg-white'
          } `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Treated Approval</span>
            </div>
          }
        />
        <Tab
          key='new form'
          className={` text-sm ${current === 'new form' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>New Form</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
