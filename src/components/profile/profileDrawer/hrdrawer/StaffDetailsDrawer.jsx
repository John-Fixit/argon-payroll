/* eslint-disable react/prop-types */
import { Input, Textarea } from '@nextui-org/input'
import ExpandedDrawer from '../../../modals/ExpandedDrawer'
import { Select, SelectItem } from '@nextui-org/select'
import { animals } from './data'
import { Button } from '@nextui-org/button'

export default function StaffDetailsDrawer({ isOpen, setIsOpen }) {
  return (
    <>
      <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
        <div className='flex h-full p-8  flex-col '>
          <h3 className='font-medium capitalize text-center text-lg'>
            Edit Staff Details
          </h3>
          <div className='grid w-full  p-2  gap-4 '>
            <div className=''>
              <Input
                type='Staff Number'
                label='Staff Number'
                labelPlacement='outside'
                placeholder='Enter your staff number'
                description
              />
            </div>
            <div className='grid grid-cols-2 items-center  gap-4 p-2'>
              <Input
                type='First Name'
                label='First Name'
                labelPlacement='outside'
                placeholder='Enter your first name'
                description
              />
              <Input
                type='Last Name'
                label='Last Name'
                labelPlacement='outside'
                placeholder='Enter your last name'
                description
              />
              <Input
                type='Other Names'
                label='Other Names'
                labelPlacement='outside'
                placeholder='Enter your other names'
                description
              />
              <Input
                type='Pension NO'
                label='Pension NO'
                labelPlacement='outside'
                placeholder='Enter your pension no'
                description
              />

              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Marital Status'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='PFA Company'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Office Region'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Blood Group'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type='Email'
                label='Email'
                labelPlacement='outside'
                placeholder='Enter your Email'
                description
              />
              <Input
                type='Phone'
                label='Phone'
                labelPlacement='outside'
                placeholder='Enter your Phone'
                description
              />
              <Input
                type='Decorations'
                label='Decorations'
                labelPlacement='outside'
                placeholder='Enter your Decorations'
                description
              />
              <Input
                type='Date of First Arrival'
                label='Date of First Arrival'
                labelPlacement='outside'
                placeholder='Enter your Date of First Arrival'
                description
              />
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Employee Type'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Step'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Grade Level'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Department'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                labelPlacement='outside'
                placeholder='Select an animal'
                label='Directorate'
                size='md'
              >
                {animals.map((animal) => (
                  <SelectItem key={animal.value} value={animal.value}>
                    {animal.label}
                  </SelectItem>
                ))}
              </Select>
              <Input
                type='Current Appointment Date'
                label='Current Appointment Date'
                labelPlacement='outside'
                placeholder='Enter your Current Appointment Date'
                description
              />
              <Input
                type='Date of First Appointment'
                label='Date of First Appointment'
                labelPlacement='outside'
                placeholder='Enter your Date of First Appointment'
                description
              />
              <Textarea
                label='Home Address'
                labelPlacement='outside'
                placeholder='Enter your Home Address'
                defaultValue=''
              />
            </div>
            <div className=' mx-auto  py-2'>
              <Button
                color='success'
                className='my-4 uppercase w-[6rem] text-white rounded'
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </ExpandedDrawer>
    </>
  )
}
