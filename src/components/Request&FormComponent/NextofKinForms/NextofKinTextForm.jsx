import { Input, Checkbox, Button, Select, SelectItem } from '@nextui-org/react'
import { animals } from './datas'
import { useState } from 'react'
import { CameraIcon } from 'lucide-react'
import { DatePicker } from 'antd'

export default function NextofKinTextForm() {
  const [value, setValue] = useState('')

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  })
  const [previewImage, setPreviewImage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setFormData({ ...formData, image: file })
      setPreviewImage(URL.createObjectURL(file))
    }
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
    setPreviewImage(null)
  }
  return (
    <div className='grid gap-2 w-full p-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] mb-4'>Add Next Of Kin </h2>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 w-full flex-wrap items-center mb-6 md:mb-0 gap-4'>
          <div className=''>
            <label className='cursor-pointer  text-white py2 px-4 rounded-md'>
            <div className="bg-gray-100 h-20 w-28 mx-auto flex items-center justify-center rounded-lg">
              <CameraIcon className='w-8 h-8 text-red-500' />
              <Input
                type='file'
                accept='.jpg, .jpeg, .png, .gif, .pdf'
                
                className='rounded-sm hidden'
                label='Image'
                labelPlacement='outside'
                placeholder='image'
                id='image'
                name='image'
                onChange={handleImageChange} // Add the desired file types
              />
            </div>
            </label>

            {previewImage && (
              <img
                src={previewImage}
                alt='Preview'
                // style={{ maxWidth: '300px', marginTop: '10px' }}
              />
            )}
          </div>
          <Input
          
            type='text'
            name='name'
            className='rounded-sm '
            label='First Name'
            labelPlacement='outside'
            placeholder=' first name'
            value={formData.name}
            onChange={handleInputChange}
          />
          <Checkbox defaultSelected size='md'>
            Is Primary
          </Checkbox>
          <Input
          
            type='text'
            name='name'
            className='rounded-sm '
            label='Last Name'
            labelPlacement='outside'
            placeholder=' last name'
            value={formData.name}
            onChange={handleInputChange}
          />

          <Select
            label='Relationship'
          
            labelPlacement='outside'
            placeholder='Relationship'
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
          <Input
          
            type='text'
            name='address'
            className='rounded-sm '
            label='Address'
            labelPlacement='outside'
            placeholder=' address'
            // value={formData.name}
            onChange={handleInputChange}
          />

          <Input
          
            type='phone'
            name='phone'
            className='rounded-sm '
            label='Phone'
            labelPlacement='outside'
            placeholder=' phone'
            // value={formData.name}
            onChange={handleInputChange}
          />
          <div className=''>
            <label htmlFor='Date'> Date of Birth</label>
            <DatePicker
              className=' w-full border-none bg-gray-100 hover:bg-gray-200 h-10 rounded-lg focus:outline-none'
            />
          </div>
          <Input
          
            type='email'
            name='email'
            className='rounded-sm '
            label='email'
            labelPlacement='outside'
            placeholder=' email'
            // value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div className='flex items-center justify-end'>
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
