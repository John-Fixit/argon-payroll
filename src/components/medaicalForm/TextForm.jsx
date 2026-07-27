/* eslint-disable react/prop-types */
import {
  Checkbox,
  Button,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { animals } from './datas'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function TextForm({ onNext }) {
  const [value, setValue] = useState('')

  const handleSelectionChange = (e) => {
    setValue(e.target.value)
  }
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
  })
  const {
    handleSubmit,
    control,
    register,
    //  formState: { errors },
  } = useForm({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    // Perform the submission logic here
    // You can send formData to your server or process it as needed

    // Reset the form after submission
    setFormData({
      name: '',
      description: '',
      image: null,
    })
    onNext()
  }
  return (
    <>
      {/* <div className='grid gap-2 w-full py-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>HMO </h2>
      <form onSubmit={handleSubmit}>
        <div className='grid  w-full flex-wrap items-center mb-6 md:mb-0 gap-4'>
          <Select
            label='Hospital'
            size='sm'
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
            size='sm'
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
          <Checkbox defaultChecked size='sm'>
            me
          </Checkbox>
          <Select
            size='sm'
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
    </div> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white shadow-md rounded border flex justify-center flex-col gap-4'>
          {/* <h2 className='text-[22px] font-normal text-[#212529] '>Education</h2> */}
          <div className='py-3 border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center px-5'>
            <h5 className='header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
              Hospital
            </h5>
            <Controller
              name='hospital'
              control={control}
              render={({ field }) => (
                <Select
                  variant='bordered'
                  placeholder='Hospital'
                  size='sm'
                  selectedKeys={field.value ? [field.value] : []}
                  {...field}
                  className='my-3 rounded-sm'
                  onChange={handleSelectionChange}
                  tabIndex='0'
                  aria-expanded='false'
                  classNames={{
                    trigger:
                      'text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20',
                  }}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
              rules={{ required: true }}
            />
          </div>
          <div className='py-3 border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center px-5'>
            <h5 className='header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
              beneficiaries
            </h5>
            <Controller
              name='beneficiaries'
              control={control}
              render={({ field }) => (
                <Select
                  variant='bordered'
                  placeholder='Beneficiaries'
                  size='sm'
                  selectedKeys={field.value ? [field.value] : []}
                  {...field}
                  className='my-3 rounded-sm'
                  onChange={handleSelectionChange}
                  tabIndex='0'
                  aria-expanded='false'
                  classNames={{
                    trigger:
                      'text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20',
                  }}
                >
                  {animals.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
              )}
              rules={{ required: true }}
            />
          </div>

          <div className='  rounded border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center py-3 px-5'>
            <label className='header_h3 pb-4 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
              address
            </label>
            <div className='flex items-center w-full flexcol'>
              <textarea
                // name='notes'
                {...register('notes')}
                className={`border rounded-md flex-1 bg-[#f1f1f1] border-blue-200 focus:outline-none focus:ring-2  focus:border-transparent px-2 py-2 `}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-end py-3'>
          <button
            type='submit'
            onClick={onNext}
            className='bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70'
          >
            Next
          </button>
        </div>
      </form>
    </>
  )
}
