// import 'react-datepicker/dist/react-datepicker.css'
import { Input, Button, Select, SelectItem, Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import { DatePicker } from 'antd'
import { certificationTypes } from './data.js'

export default function CertificationTextForm() {
  const [value, setValue] = useState('')

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className='grid gap-2 w-full p-4'>
      <h2 className='text-[22px] font-normal text-[#212529] mb-4'>Add Certification</h2>
      <form action='' className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input
          type='text'
          className='rounded-sm'
          label='Certification Name'
          labelPlacement='outside'
           radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
          placeholder='Certification Name'
        />
          <Select
            label='Certification Type'

            labelPlacement='outside'
             radius="sm"
               classNames={{
            trigger: "border-1 bg-transparent hover:bg-transparent focus-within:outline-blue-500 outline-offset-0 outline-1 ",
            }}
            placeholder='Certification Type'
            selectedKeys={[value]}
            className='rounded-sm'
            onChange={handleSelectionChange}
          >
            {certificationTypes.map((certificationType) => (
              <SelectItem key={certificationType.value} value={certificationType.value}>
                {certificationType.label}
              </SelectItem>
            ))}
          </Select>

          <Input

            type='text'
            className='rounded-sm '
            label='Certification Authority'
            labelPlacement='outside'
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            placeholder=' Certification Authority'
          />
          <Input

            type='text'
            className='rounded-sm '
            label='License Number'
            labelPlacement='outside'
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            placeholder=' License Number'
          />
          <Input

            type='text'
            className='rounded-sm '
            label='URL Number'
            labelPlacement='outside'
             radius="sm"
                         classNames={{
                  inputWrapper: "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
                  
                  label: "z-1",
                }}
            placeholder=' url'
          />

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
        <Checkbox defaultSelected size='md'>
          This certificate does not expire
        </Checkbox>
        <div className='flex justify-end md:col-span-2'>
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
