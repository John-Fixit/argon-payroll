/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import { Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import NewInputDesign from '../../../../../../components/forms/NewFormDesign'
import { assignStaffs, clients, priority } from '../data'

export default function TextForm({ onNext }) {
  const [value, setValue] = useState('')
  const { register, handleSubmit, control } = useForm({})

 
  const onSubmit = () => {
    // console.log(value)
    onNext(value)
  }
  return (
    <>
      {/* <div className='grid gap-2 w-full py-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>
        Create A New Tickte
      </h2>
      <form action=''>
        <div className='grid grid-cols-2 items-center w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Input
            size='md'
            type='text'
            className='rounded-sm '
            label='Ticket Subject'
            labelPlacement='outside'
            placeholder=' ticket subject'
            variant='bordered'
          />
          <Input
            size='md'
            type='text'
            className='rounded-sm '
            label='Ticket Id'
            labelPlacement='outside'
            placeholder=' ticket id'
            variant='bordered'
          />
          <Select
            label='Assign Staff'
            size='md'
            labelPlacement='outside'
            placeholder='Assign Staff'
            selectedKeys={[value]}
            variant='bordered'
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
            label='Client'
            size='md'
            labelPlacement='outside'
            placeholder='Client'
            selectedKeys={[value]}
            variant='bordered'
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
            label='Priority'
            size='md'
            labelPlacement='outside'
            placeholder='Priority'
            selectedKeys={[value]}
            variant='bordered'
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
            size='md'
            type='text'
            className='rounded-sm '
            label='CC'
            labelPlacement='outside'
            placeholder=' CC'
            variant='bordered'
          />
          <Input
            size='md'
            type='text'
            className='rounded-sm '
            label='Assign'
            labelPlacement='outside'
            placeholder=' Assign'
            variant='bordered'
          />
          <Input
            size='md'
            type='text'
            className='rounded-sm '
            label='Add Followers'
            labelPlacement='outside'
            placeholder=' Add Followers'
            variant='bordered'
          />
        </div>
        <div className='flex justify-end pt-8  '>
          <Button
            color='primary'
            className='my-4  text-white rounded'
            onClick={onNext}
          >
            Next
          </Button>
        </div>
      </form>
    </div> */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='bg-white shadow-md rounded border flex justify-center flex-col gap-4 p-5'>
            <Controller
              name='first_name'
              control={control}
              render={({ field }) => (
                <NewInputDesign type='text' label='Ticket Subject' {...field} />
              )}
              rules={{ required: true }}
            />
            <Controller
              name='last_name'
              control={control}
              render={({ field }) => (
                <NewInputDesign
                  type='text'
                  label='Ticket Id'
                  {...field}
                  required={true}
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              name='cc'
              control={control}
              render={({ field }) => (
                <NewInputDesign type='text' label='CC' {...field} />
              )}
              rules={{ required: true }}
            />
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <NewInputDesign type='text' label='Assign' {...field} />
              )}
            />
            <div className='py-3 border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center px-5'>
              <h5 className='header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
                Priority
              </h5>
              <Controller
                name='Priority'
                control={control}
                render={({ field }) => (
                  <Select
                    variant='bordered'
                    placeholder='Priority'
                    size='sm'
                    selectedKeys={field.value ? [field.value] : []}
                    {...field}
                    tabIndex='0'
                    aria-expanded='false'
                    classNames={{
                      trigger:
                        'text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20',
                    }}
                  >
                    {priority.map((pri) => (
                      <SelectItem key={pri.value} value={pri.value}>
                        {pri.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className='py-3 border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center px-5'>
              <h5 className='header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
                Client
              </h5>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Select
                    variant='bordered'
                    placeholder='Client'
                    size='sm'
                    selectedKeys={field.value ? [field.value] : []}
                    {...field}
                    tabIndex='0'
                    aria-expanded='false'
                    classNames={{
                      trigger:
                        'text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20',
                    }}
                  >
                    {clients.map((client) => (
                      <SelectItem key={client.value} value={client.value}>
                        {client.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
                rules={{ required: true }}
              />
            </div>
            <div className='py-3 border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center px-5'>
              <h5 className='header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
                Assign Staff
              </h5>
              <Controller
                name='title'
                control={control}
                render={({ field }) => (
                  <Select
                    variant='bordered'
                    size='md'
                    placeholder='Assign Staff'
                    selectedKeys={field.value ? [field.value] : []}
                    {...field}
                    tabIndex='0'
                    aria-expanded='false'
                    classNames={{
                      trigger:
                        'text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20',
                    }}
                  >
                    {assignStaffs.map((assignStaff) => (
                      <SelectItem
                        key={assignStaff.value}
                        value={assignStaff.value}
                      >
                        {assignStaff.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
                rules={{ required: true }}
              />
            </div>

            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <NewInputDesign type='text' label='Add Followers' {...field} />
              )}
            />
          </div>
          <div className='flex justify-end py-3'>
            <button
              type='submit'
              className='bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
