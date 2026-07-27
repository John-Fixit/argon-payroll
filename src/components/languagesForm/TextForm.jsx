import { Button, Select, SelectItem } from '@nextui-org/react'
import { animals } from './datas'
import { useState } from 'react'

export default function TextForm() {
  const [value, setValue] = useState('')

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className='grid gap-2 w-full py-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>
        Languages Spoken
      </h2>
      <form action=''>
        <div className='grid grid-cols-2 w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Select
            label='Language'
            size='sm'
            labelPlacement='outside'
            placeholder='Language'
            selectedKeys={[value]}
            className='max-w-xs rounded-sm'
            onChange={handleSelectionChange}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label='Level'
            size='sm'
            labelPlacement='outside'
            placeholder='Level'
            selectedKeys={[value]}
            className='max-w-xs rounded-sm'
            onChange={handleSelectionChange}
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
