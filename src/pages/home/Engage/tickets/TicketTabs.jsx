/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { useState } from 'react'

export default function TicketTabs({ step }) {
  const [current, setCurrent] = useState('mine')

  const tabbing = (e) => {
    switch (e) {
      case 'mine':
        step(1)
        setCurrent('mine')
        break
      case 'following':
        step(2)
        setCurrent('following')
        break
      case 'assign to me':
        step(3)
        setCurrent('assign to me')
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
          tabList: 'rounded-md gap-0 p-0 bg-opacity-100 shadow-sm',
          tabContent:
            'font-bold bg-opacity-100 tracking-widest group-data-[selected=true]:text-gray-600 text-tablistUnselectedcolor ',
          cursor: 'bg-tabcursorcolor  h-[0.25rem] top-0 w-full',
          tab: 'h-24 w-40 bg-tablistcolor shadow-none bg-opacity-100',
        }}
      >
        <Tab
          key='mine'
          className={`text-sm ${
            current === 'mine' ? 'bg-white' : 'bg-tablistcolor'
          } `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Mine</span>
            </div>
          }
        />
        <Tab
          key='following'
          className={` text-sm ${current === 'following' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Following</span>
            </div>
          }
        />
        <Tab
          key='assign to me'
          className={` text-sm ${current === 'assign to me' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Assign to me</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
