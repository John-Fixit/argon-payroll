
import Card from './Card'
import PropTypes from "prop-types";

export default function Pension({profile}) {
  return (
    <Card title='Pension' hasEditIcon={false}>
      <ul className=' mt-2 w-full px12 flex flex-col space-y-3'>
        <li className='grid grid-cols-2 border-b'>
          <span className='text-gray-500 text-sm font-medium font-helvetica uppercase text-start'>
            {' '}
            Pension Company:
          </span>
          <span className='h-auto hyphens-auto text-end  breakwords pb-2w-full max-w-sm font-helvetica text-[0.85rem] opacity-45'>
            {profile?.BIODATA?.PENSION_NAME ?? 'NIL'}
          </span>
        </li>
        <li className='grid grid-cols-2 border-b'>
          <span className='text-gray-500 text-sm font-medium font-helvetica uppercase text-start'>
            {' '}
            Pension Number:
          </span>
          <span className='h-auto hyphens-auto text-end  break-words pb-2w-full max-w-sm font-helvetica text-[0.85rem] opacity-45'>
          {profile?.BIODATA?.PENSION_NO ?? 'NIL'}
          </span>
        </li>
      </ul>
    </Card>
  )
}

Pension.propTypes = {
  profile: PropTypes.object
}