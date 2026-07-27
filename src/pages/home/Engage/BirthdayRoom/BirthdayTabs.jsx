/* eslint-disable react/prop-types */
import { Tabs, Tab } from '@nextui-org/react'
import { useState } from 'react'

export default function BirthdayTabs({ step }) {
  const [current, setCurrent] = useState('mine')

  const tabbing = (e) => {
    switch (e) {
      case 'birthdays':
        step(1)
        setCurrent('birthdays')
        break
      case 'promotions':
        step(2)
        setCurrent('promotions')
        break
      case 'recruitments':
        step(3)
        setCurrent('recruitments')
        break
      case 'role changes':
        step(4)
        setCurrent('role changes')
        break
      case 'celebrations':
        step(5)
        setCurrent('celebrations')
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
          tab: 'h-16 w-40 bg-tablistcolor shadow-none bg-opacity-100',
        }}
      >
        <Tab
          key='birthdays'
          className={`text-sm ${
            current === 'birthdays' ? 'bg-white' : 'bg-tablistcolor'
          } `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Birthdays</span>
            </div>
          }
        />
        <Tab
          key='promotions'
          className={` text-sm ${current === 'promotions' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Promotions</span>
            </div>
          }
        />
        <Tab
          key='recruitments'
          className={` text-sm ${current === 'recruitments' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Recruitments</span>
            </div>
          }
        />
        <Tab
          key='role changes'
          className={` text-sm ${current === 'role changes' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Role Changes</span>
            </div>
          }
        />
        <Tab
          key='celebrations'
          className={` text-sm ${current === 'celebrations' && 'bg-white'} `}
          title={
            <div className='flex items-center space-x-2'>
              <span>Celebrations</span>
            </div>
          }
        />
      </Tabs>
    </div>
  )
}
