/* eslint-disable react/prop-types */

import { Tabs, Tab } from '@nextui-org/react'

import { useState } from 'react'





export default function GeneralTabs({ step, tabElements }) {
  const [current, setCurrent] = useState('mine')

  const tabbing = (e) => {
      const findIt = tabElements?.find(el => el.name === e)
        step(findIt?.step)
        setCurrent(findIt?.name)
  }

  return (
    <div className='flex w-full fontOswald flex-col'>
      <Tabs
        onSelectionChange={tabbing}
        size={'md'}
        fullWidth
        variant='underlined'
        aria-label='Content Option Tab'
        // data
        classNames={{
          tabList: 'rounded-md gap-0 p-0 bg-opacity-100 shadow-sm',
          tabContent:
            'font-bold bg-opacity-100 tracking-widest group-data-[selected=true]:text-gray-600 text-tablistUnselectedcolor ',
          cursor: 'bg-tabcursorcolor  h-[0.25rem] top-0 w-full',
          tab: 'h-24 w-40 bg-tablistcolor shadow-none bg-opacity-100',
        }}
      >      

        {
            tabElements?.map(tabE =>(
                <Tab
                  key={tabE?.name}
                  className={`text-sm ${
                    current === tabE?.name ? 'bg-white' : 'bg-tablistcolor'
                  } `}
                  title={
                    <div className='flex items-center space-x-2'>
                      <span>{tabE?.label}</span>
                    </div>
                  }
                />
            ))
        }
      </Tabs>
    </div>
  )
}
