// import 'react-datepicker/dist/react-datepicker.css'
import { Input, Button } from '@nextui-org/react'

import { DatePicker } from 'rsuite'

export default function Documents() {
  return (
    <div className='grid gap-2 w-full py-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>
        Labour Association
      </h2>
      <form action=''>
        <div className='grid grid-cols-2 items-center w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Input
            size='sm'
            type='text'
            className='rounded-sm '
            label='Name'
            labelPlacement='outside'
            placeholder=' Name'
          />

          <div className=''>
            <label>Date Joined</label>
            <DatePicker
              className=' w-full border-gray-300 h-8 rounded-md  focus:outline-none'
              format='MM/dd/yyyy'
            />
          </div>
        </div>
        <div className='  '>
          <Button
            color='success'
            className='my-4  text-white rounded'
            // onClick={handleAddNote}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
