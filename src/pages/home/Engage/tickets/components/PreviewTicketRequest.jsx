/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Textarea,
} from '@nextui-org/react'
import ExpandedDrawer from '../../../../../components/modals/ExpandedDrawer'
import { useForm } from 'react-hook-form'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
}

export default function PreviewTicketRequest({ isOpen, setIsOpen }) {
  const { register, handleSubmit } = useForm({})

  const onSubmit = () => {
    try {
      // console.log('onSubmit')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
        <div className='flex hfull gap-2 flex-col md:flex-row overflow-y-scrol'>
          <div className='flex min-h-screen flex-col  w-full md:w-60 bg-chatsidebar    '>
            <h3 className=' text-center text-gray-400 border-gray-400 border-b-2 p-2'>
              View Ticket Details
            </h3>
          </div>

          <div className=' w-[60%] mx-auto grid p-4  gap-8'>
            <Card className='bg-white w-full fontOswald rounded-md shadow-md p-4  hfull '>
              <ul className='font-Lato text-[15px] flex flex-col space-y-3'>
                <li className='grid grid-cols-2'>
                  <span className='text-[#444e4e] font-[500] text-[0.9rem] uppercase '>
                    {' '}
                    Ticket Id:
                  </span>
                  <span className='text-[#888888] max-w-sm font-profileFontSize '>
                    tk#123338
                  </span>
                </li>
                <li className='grid grid-cols-2'>
                  <span className='text-[#444e4e] font-[500] text-[0.9rem] uppercase '>
                    Ticket Subject:
                  </span>
                  <span className='text-[#888888] max-w-sm   font-profileFontSize '>
                    Rent
                  </span>
                </li>
                <li className='grid grid-cols-2'>
                  <span className='text-[#444e4e] font-[500] text-[0.9rem] uppercase '>
                    Created:
                  </span>
                  <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                    12/04/2024
                  </span>
                </li>
                <li className='grid grid-cols-2'>
                  <span className='text-[#444e4e] font-[500] text-[0.9rem] uppercase '>
                    Last Reply:
                  </span>
                  <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                    12/01/2024
                  </span>
                </li>
                <li className='grid grid-cols-2'>
                  <span className='text-[#444e4e] font-[500] text-[0.9rem] uppercase '>
                    {' '}
                    Priority:
                  </span>
                  <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                    Low
                  </span>
                </li>
                <li className='grid grid-cols-2'>
                  <span className='text-[#444e4e] font-[500] text-[0.9rem] uppercase '>
                    Status:
                  </span>
                  <span className='text-[#888888] max-w-sm  font-profileFontSize '>
                    Active
                  </span>
                </li>
              </ul>
            </Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className=' text-lg capitalize'>add comment</h3>
              <div className='w-full mx-auto'>
                <Textarea
                  {...register('notes')}
                  className='md:mb-0 w-[18.5rem] md:w-full md:w[22rem]'
                  labelPlacement='outside'
                  variant='bordered'
                  placeholder='Enter your note'
                />
              </div>

              <div className='flex items-center my-6 justify-between'>
                <Button
                  type='submit'
                  color='success'
                  className='my-4 text-white rounded'
                >
                  Add comment
                </Button>
                <div className='relative flex justify-end items-center gap-2'>
                  <Dropdown className='bg-background border-1 border-default-200'>
                    <DropdownTrigger>
                      <Chip
                        className='capitalize border-none cursor-pointer gap-1 text-default-600'
                        // color={statusColorMap[user.status]}
                        size='sm'
                        variant='solid'
                      >
                        {/* {cellValue} */}
                        Assign
                      </Chip>
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem>
                        <Chip
                          className='capitalize border-none gap-1 text-default-600'
                          color={statusColorMap.paused}
                          size='sm'
                          variant='dot'
                        >
                          Delete
                        </Chip>
                      </DropdownItem>

                      <DropdownItem>
                        <Chip
                          className='capitalize border-none gap-1 text-default-600'
                          color={statusColorMap.vacation}
                          size='sm'
                          variant='dot'
                        >
                          reassign
                        </Chip>
                      </DropdownItem>
                      <DropdownItem>
                        <Chip
                          className='capitalize border-none gap-1 text-default-600'
                          color={statusColorMap.vacation}
                          size='sm'
                          variant='dot'
                        >
                          Reopened
                        </Chip>
                      </DropdownItem>
                      <DropdownItem>
                        <Chip
                          className='capitalize border-none gap-1 text-default-600'
                          color={statusColorMap.active}
                          size='sm'
                          variant='dot'
                        >
                          Closed
                        </Chip>
                      </DropdownItem>
                      <DropdownItem>
                        <Chip
                          className='capitalize border-none gap-1 text-default-600'
                          color={statusColorMap.active}
                          size='sm'
                          variant='dot'
                        >
                          assign
                        </Chip>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ExpandedDrawer>
    </>
  )
}
