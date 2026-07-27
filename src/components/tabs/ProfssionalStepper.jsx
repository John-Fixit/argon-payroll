/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { LineChart } from 'lucide-react'
import { useState } from 'react'
import { GrAnnounce } from 'react-icons/gr'

export default function ProfssionalStepper({ step }) {
  const [current, setCurrent] = useState('work experience')

  const tabbing = (e) => {
    switch (e) {
      case 'work experience':
        step(1)
        setCurrent('work experience')
        break
      case 'professonal':
        step(2)
        setCurrent('professonal')
        break
      case 'professional bodies':
        step(3)
        setCurrent('professional bodies')
        break
      case 'cooparative':
        step(4)
        setCurrent('cooparative')
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
          key='work experience'
          className={`text-sm ${current === 'work experience' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <LineChart size={15} />
              <span>Work Experience</span>
            </div>
          }
        />
        <Tab
          key='professonal'
          className={`text-sm ${current === 'professonal' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Professonal</span>
            </div>
          }
        />
        {/* <Tab
          key='professional bodies'
          className={`text-sm ${
            current === 'professional bodies' && 'bg-white'
          } `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Professional Bodies</span>
            </div>
          }
        />
        <Tab
          key='labour association'
          className={` text-sm ${
            current === 'labour association' && 'bg-white'
          } `}
          title={
            <div className='flex items-center space-x-2'>
              <GrAnnounce size={15} />
              <span>Labour Association</span>
            </div>
          }
        /> */}
      </Tabs>
    </div>
  )
}
