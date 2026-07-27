import {
  Checkbox,
  Button,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { animals } from './datas'
import { useState } from 'react'

export default function MedicalTextForm() {
  const [value, setValue] = useState('')

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Perform the submission logic here
    // You can send formData to your server or process it as needed

    // Reset the form after submission
    setFormData({
      name: '',
      description: '',
      image: null,
    })
  }
  return (
    <div className='grid gap-2 w-full p-8'>
      <h2 className='text-[22px] font-normal text-[#212529] mb-4'>HMO </h2>
      <form onSubmit={handleSubmit}>
        <div className='grid  w-full flex-wrap items-center mb-6 md:mb-0 gap-4'>
          <Select
            label='Hospital'
            
            labelPlacement='outside'
            placeholder='Hospital'
            selectedKeys={[value]}
            className=' rounded-sm'
            onChange={handleSelectionChange}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            
            type='text'
            name='address'
            classaddress='rounded-sm '
            label='Address'
            labelPlacement='outside'
            placeholder=' address'
            value={formData.name}
            onChange={handleInputChange}
          />
          <label htmlFor='beneficiaries'>Beneficiaries</label>
          <Checkbox defaultChecked >
            me
          </Checkbox>
          <Select
            
            labelPlacement='outside'
            placeholder='Hospital'
            selectedKeys={[value]}
            className=' rounded-sm'
            onChange={handleSelectionChange}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className='flex justify-end'>
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
