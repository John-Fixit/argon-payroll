// import 'react-datepicker/dist/react-datepicker.css'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { animals } from './datas'

export default function TextForm() {
  return (
    <div className='grid gap-2 w-full py-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>Skills</h2>
      <form action=''>
        <div className='grid grid-cols-2 items-center w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Select
            label='Favorite Animal'
            placeholder='Select an animal'
            selectionMode='multiple'
            className='max-w-xs'
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
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
