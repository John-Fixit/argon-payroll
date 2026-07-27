import { Button } from '@nextui-org/react'
import PageHeader from '../../../../components/payroll_components/PageHeader'
import Separator from '../../../../components/payroll_components/Separator'
import OverViewCard from './components/OverViewCard'
import TicketTable2 from './components/TicketTable2'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import NewTicketDrawer from './components/NewTicketDrawer'
// import TicketTabs from './TicketTabs'
import GeneralTabs from '../../../../components/tabs/GeneralTabs'

const tabElements = [
  {
      name: 'mine',
      label: 'Mine',
      step: 1
  },
  {
      name: 'following',
      label: 'Following',
      step: 2
  },
  {
      name: 'assign to me',
      label: 'Assign to me',
      step: 3
  },
]

export default function Tickets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [stepper, setstepper] = useState(1)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <div className='w-[83%] mx-auto '>
        <div className='flex justify-between items-center'>
          <PageHeader
            header_text={'Tickets'}
            breadCrumb_data={[{ name: 'Engage' }, { name: 'Tickets' }]}
            buttonProp={false}
          />
          <Button
            className='bg-[#00bcc2] text-white'
            endContent={<PlusIcon />}
            onClick={handleEditClick}
          >
            Add New Ticket
          </Button>
        </div>

        <Separator separator_text={'Overview'} />

        <div className=' grid md:grid-cols-2 lg:grid-cols-3  gap-8 w-full pt-4'>
          <div className=''>
            <OverViewCard number='100' percentIncrease='+10%' title='Mine' />
          </div>
          <div className=''>
            <OverViewCard
              number='78'
              percentIncrease='+25%'
              title='Assign to me'
            />
          </div>
          <div className=''>
            <OverViewCard
              number='90'
              percentIncrease='+21%'
              title='Following'
            />
          </div>
        </div>
        <Separator separator_text={'Tickets'} />
        {/* <div className='pt-6'>
          <TicketTable2 />
        </div> */}

        <div className='bg-white rounded-lg border mt-8'>
          {/* <TicketTabs step={setstepper} /> */}
          <GeneralTabs step={setstepper} tabElements={tabElements}/>

          {stepper === 1 && (
            <div className='space-y-5'>
              <TicketTable2 />
            </div>
          )}
          {stepper === 2 && (
            <div className='space-y-5'>
              <TicketTable2 />
            </div>
          )}
          {stepper === 3 && (
            <div className='space-y-5'>
              <TicketTable2 />
            </div>
          )}
        </div>
      </div>

      {isDrawerOpen && (
        <NewTicketDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
      )}
    </>
  )
}
