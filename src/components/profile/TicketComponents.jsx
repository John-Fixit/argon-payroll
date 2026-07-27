import OverViewCard from '../../pages/home/Engage/tickets/components/OverViewCard'
// import Separator from '../payroll_components/Separator'

export default function TicketComponents() {
  return (
    <div>
      {/* <Separator separator_text={'Overview'} /> */}

      <div className='flex justifybetween gap-8 w-full pt-4'>
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
          <OverViewCard number='90' percentIncrease='+21%' title='Following' />
        </div>
      </div>
    </div>
  )
}
