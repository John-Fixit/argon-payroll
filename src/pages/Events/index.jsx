import { Fragment, useState } from 'react'
import { BsTicketDetailed } from 'react-icons/bs'
import FormDrawer from '../../components/payroll_components/FormDrawer'
import ExpandedDrawerWithButton from '../../components/modals/ExpandedDrawerWithButton'
import PayrollCard from '../../components/payroll_components/PayrollCard'
import Document from './Document'
import Calendar from './Calendar'

export default function Events() {
  const [open, setOpen] = useState({ status: false, id: null })
  const iconSize = '5vh'
  const iconColor = '#344860'
  const listData = [
    {
      title: 'Event',
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: 'Documents',
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
  ]

  //drawer functions
  const handleOpenDrawer = (id) => {
    setOpen({ ...open, status: true, id })
  }
  const handleCloseDrawer = () => {
    setOpen({ ...open, status: false })
  }
  return (
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 my-3'>
        {listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div onClick={() => handleOpenDrawer(index)}>
                <PayrollCard icon={item.icon} title={item.title} />
              </div>
            </Fragment>
          )
        })}
      </div>

      <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
        maxWidth={open?.id === 0 ? '70rem' : '60rem'}
      >
        <FormDrawer tabs={[{ title: listData[open.id]?.title }]} page={'event'}>
          {open?.id === 0 ? <Calendar /> : open?.id === 1 ? <Document /> : null}
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  )
}
