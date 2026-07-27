import { DateRangePicker } from 'rsuite'

export default function DatePickers() {
  return (
    <div className='w-[full]   mt-4'>
      <h1 className='font-bold text-sm py-1'>Range</h1>
      <DateRangePicker className='w-[600px]   border-gray-300 h-8 rounded-md  focus:outline-none' />
    </div>
  )
}
