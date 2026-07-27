/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { LineChart } from 'lucide-react'
import { useState } from 'react'
import { GrAnnounce } from 'react-icons/gr'

export default function HRReportTabs({ step }) {
  const [current, setCurrent] = useState('general')

  const tabbing = (e) => {
    switch (e) {
      case 'general':
        step(1)
        setCurrent('general')
        break
      case 'comprehensive':
        step(2)
        setCurrent('comprehensive')
        break
      case 'promotion report':
        step(3)
        setCurrent('promotion report')
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
          key='general'
          className={`text-sm ${current === 'general ' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <LineChart size={15} />
              <span>General Report</span>
            </div>
          }
        />
        <Tab
          key='comprehensive'
          className={` text-sm ${current === 'comprehensive' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Comprehensive</span>
            </div>
          }
        />
        <Tab
          key='promotion report'
          className={` text-sm ${
            current === 'promotion report' && 'bg-white'
          } `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Promotion Report</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
