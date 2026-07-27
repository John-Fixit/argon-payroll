/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { LineChart } from 'lucide-react'
import { useState } from 'react'
import { GrAnnounce } from 'react-icons/gr'

export default function InfoTab({ step }) {
  const [current, setCurrent] = useState('education')

  const tabbing = (e) => {
    switch (e) {
      case 'education':
        step(1)
        setCurrent('education')
        break
      case 'certifications':
        step(2)
        setCurrent('certifications')
        break

      default:
        break
    }
  }

  return (
    <div className='flex w-full fontOswald flex-col'>
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
          key='education'
          className={`text-sm ${current === 'education ' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <LineChart size={15} />
              <span>Education</span>
            </div>
          }
        />
        <Tab
          key='certifications'
          className={` text-sm ${current === 'certifications' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Certifications</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
