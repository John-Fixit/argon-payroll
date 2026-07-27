// import 'react-datepicker/dist/react-datepicker.css'
import { Button, Select, SelectItem, Card } from '@nextui-org/react'
import { useState } from 'react'
import { DatePicker } from 'rsuite'
import { animals } from '../profile/profileDrawer/hrdrawer/data'

export default function HRGenerateReportForm() {
  const [value, setValue] = useState('')

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <Card className='grid gap-2 w-full py-8 shadow  px-4 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>
        GENERAL NOMINAL REPORT
      </h2>
      <form action=''>
        <div className='grid grid-cols-2 items-center w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Select
            label='SELECT EMPLOYEE TYPE'
            size='md'
            labelPlacement='outside'
            placeholder='SEARCH STAFF'
            selectedKeys={[value]}
            className=' rounded-sm'
            onChange={handleSelectionChange}
          >
            {animals.map((animal) => (
              <SelectItem key={animals.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label='SELECT NOMINAL ROLL CATEGORY'
            size='md'
            labelPlacement='outside'
            placeholder='EXIT REASON'
            selectedKeys={[value]}
            className=' rounded-sm'
            onChange={handleSelectionChange}
          >
            {animals.map((animal) => (
              <SelectItem key={animals.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label='SELECT STAFF GRADES'
            size='md'
            labelPlacement='outside'
            placeholder='EXIT REASON'
            selectedKeys={[value]}
            className=' rounded-sm'
            onChange={handleSelectionChange}
          >
            {animals.map((animal) => (
              <SelectItem key={animals.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>

          <div className='grid gap-2'>
            <label className=''>(AS AT) DATE</label>
            <DatePicker
              className=' w-full border-gray-300 h-8 rounded-md  focus:outline-none'
              format='MM/dd/yyyy'
            />
          </div>
        </div>
        <div className='  '>
          <Button color='success' className='my-4  text-white rounded'>
            Submit
          </Button>
        </div>
      </form>
    </Card>
  )
}
