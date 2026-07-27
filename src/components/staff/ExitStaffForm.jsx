// import 'react-datepicker/dist/react-datepicker.css'
import { Input, Button, Select, SelectItem, Card } from '@nextui-org/react'
import { useState } from 'react'
import { DatePicker } from 'rsuite'
import { animals } from '../profile/profileDrawer/hrdrawer/data'
import { LucideUpload } from 'lucide-react'

export default function ExitStaffForm() {
  const [value, setValue] = useState('')
  const [attachmentName, setAttachmentName] = useState('')

  const handleNameInputChange = (e) => {
    setAttachmentName(e.target.value)
  }

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <Card className='grid gap-2 w-full py-8 shadow  px-4 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>Exit Form</h2>
      <form action=''>
        <div className='grid grid-cols-2 items-center w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Select
            label='SEARCH STAFF'
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
            label='EXIT REASON'
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

          <Input
            size='md'
            type='text'
            className='rounded-sm '
            label='REMARK'
            labelPlacement='outside'
            placeholder=' REMARK'
          />

          <div>
            <div className='my-4'>
              <p>{attachmentName} </p>

              <Input
                variant='transparent'
                label='Attachment Name'
                placeholder='Attachments name'
                labelPlacement='outside'
                aria-label='add file'
                onChange={handleNameInputChange}
                className=''
                size='md'
                onClick={() => document.getElementById('fileInput').click()}
                startContent={
                  <div className='pointer-events-none flex items-center'>
                    <LucideUpload
                      onClick={() =>
                        document.getElementById('fileInput').click()
                      }
                    />
                  </div>
                }
              />

              <Input type='file' id='fileInput' className='hidden' />
            </div>
          </div>

          <div className=''>
            <label>Exit Date</label>
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
