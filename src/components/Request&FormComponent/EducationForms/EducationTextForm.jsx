// import 'react-datepicker/dist/react-datepicker.css'
import { Input, Button, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import { degrees } from './data'
import { DatePicker } from "antd";

export default function EducationTextForm() {
  const [value, setValue] = useState('')

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className='grid gap-2 w-full p-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>Education</h2>
      <form action='' className='z-[9999]'>
        <div className='grid md:grid-cols-2 gap-6'>

          <Input
            label='Institution Name'
            labelPlacement='outside'
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                }}
            placeholder='Institution Name'
            className='  '
            rows={2}
          />
          <Input
            type='text'
            className='rounded-sm '
            label='Course Name'
            labelPlacement='outside'
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                }}
            placeholder='Course Name '
          />
          <Input
            type='text'
            className='rounded-sm '
            label='Degree Name'
            labelPlacement='outside'
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                }}
            placeholder='Degree Name '
          />
          <Select
            label='Degree Class'
            labelPlacement='outside'
             radius="sm"
                classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
            placeholder='Degree Class'
            selectedKeys={[value]}
            className='max-w-xs rounded-sm'
            onChange={handleSelectionChange}
          >
            {degrees.map((degree) => (
              <SelectItem key={degree.value} value={degree.value}>
                {degree.label}
              </SelectItem>
            ))}
          </Select>
          <div className=''>
            <label>Start Date</label>
            <DatePicker
             className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
          </div>
          <div className=''>
            <label>End Date</label>

         <DatePicker
             className=" w-full border outline-none focus:border-transparent my-1 h-10 rounded-md focus:outline-none"
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <Button
            color='success'
            className='my-4  text-white rounded'
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
