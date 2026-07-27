/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { LineChart } from 'lucide-react'
import { useState } from 'react'
import { GrAnnounce } from 'react-icons/gr'

export default function ExitTabs({ step }) {
  const [current, setCurrent] = useState('exit staff')

  const tabbing = (e) => {
    switch (e) {
      case 'exit staff':
        step(1)
        setCurrent('exit staff')
        break
      case 'exit report':
        step(2)
        setCurrent('exit report')
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
          key='exit staff'
          className={`text-sm ${current === 'exit staff ' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <LineChart size={15} />
              <span>Exit Staff</span>
            </div>
          }
        />
        <Tab
          key='exit report'
          className={` text-sm ${current === 'exit report' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Exit Report</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
