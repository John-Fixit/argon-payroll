import { Button } from '@nextui-org/button'
import { Card } from '@nextui-org/card'
import { Input, Textarea } from '@nextui-org/input'
import { Select, SelectItem } from '@nextui-org/select'
import { useState } from 'react'
import { animals } from '../profile/profileDrawer/hrdrawer/data'
import { DatePicker } from 'rsuite'

const OnBoradingForm = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    // console.log('Form submitted:', formData)
  }

  return (
    <div>
      <Card className='shadow p-4'>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className='flex flex-col '>
              <div className='grid md:grid-cols-2 gap-4 py-4'>
                <Input
                  label='First Name'
                  labelPlacement='outside'
                  placeholder='first name'
                  type='text'
                  size='md'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                />

                <Input
                  label='Last Name'
                  placeholder='last Name'
                  labelPlacement='outside'
                  size='md'
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  label='other Name'
                  placeholder='other Name'
                  labelPlacement='outside'
                  size='md'
                  type='text'
                  name='otherName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  label='Marital Status'
                  placeholder='Marital Status'
                  labelPlacement='outside'
                  size='md'
                  type='text'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  label='Email'
                  placeholder='Email'
                  labelPlacement='outside'
                  size='md'
                  type='text'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  label='Phone'
                  placeholder='Phone'
                  labelPlacement='outside'
                  size='md'
                  type='text'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  label='Decorations'
                  placeholder='Decorations'
                  labelPlacement='outside'
                  size='md'
                  type='text'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Input
                  label='Blood Group'
                  placeholder='Blood Group'
                  labelPlacement='outside'
                  size='md'
                  type='text'
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
                <Select
                  label='Professional'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Professional'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Nationality'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Nationality'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='State of Origin'
                  size='md'
                  labelPlacement='outside'
                  placeholder='State of Origin'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='LGA'
                  size='md'
                  labelPlacement='outside'
                  placeholder='LGA'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Residential State'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Residential State'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Residential LGA'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Residential LGA'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Textarea
                  label='Residential Address'
                  labelPlacement='outside'
                  placeholder='Enter your Residential Address'
                  defaultValue=''
                  className=''
                />
              </div>
              <div className=''>
                <Button
                  className='bg-blue-400 text-white rounded'
                  type='button'
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className='grid md:grid-cols-2 gap-4 py-4'>
                <Select
                  label='Directorate'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Directorate'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label=' '
                  size='md'
                  labelPlacement='outside'
                  placeholder='Department'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Unit'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Unit'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Designation'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Designation'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Grade Level'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Grade Level'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Step'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Step'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Employee Type'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Employee Type'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Office region'
                  size='md'
                  labelPlacement='outside'
                  placeholder='Office region'
                  //   selectedKeys={[value]}
                  className=' rounded-sm'
                  //   onChange={handleSelectionChange}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animals.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>

                <div className='grid gap-2'>
                  <label htmlFor='date'>Date of First Appointment</label>
                  <DatePicker />
                </div>
                <div className='grid gap-2'>
                  <label htmlFor='date'>Date of First Arrival</label>
                  <DatePicker />
                </div>
                <div className='grid gap-2'>
                  <label htmlFor='date'>Current Appointment Date</label>
                  <DatePicker />
                </div>
                <div className='grid gap-2'>
                  <label htmlFor='date'>Date of Birth</label>
                  <DatePicker />
                </div>
              </div>
              <div className='flex justify-between py-2'>
                <Button
                  className='bg-blue-400 text-white rounded'
                  type='button'
                  onClick={handlePrev}
                >
                  Previous
                </Button>
                <Button
                  className='bg-green-400 text-white rounded'
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  )
}

export default OnBoradingForm
