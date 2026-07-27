/* eslint-disable react/prop-types */
// import { Textarea, Button } from '@nextui-org/react'
import { useGetProfile, useUpdateProfile } from '../../API/profile'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import useCurrentUser from '../../hooks/useCurrentUser'
import useFormStore from '../formRequest/store'

const NoteForm = ({ setIsOpen }) => {
  const { mutateAsync: updateProfile } = useUpdateProfile()

  const { register, handleSubmit } = useForm({})

  const { userData } = useCurrentUser()
  const { data: profile } = useGetProfile({ user: userData?.data, path: "/profile/get_profile" })
  const package_id = profile?.BIODATA?.PACKAGE_ID
  const staff_id = userData?.data.STAFF_ID
  const company_id = userData?.data.COMPANY_ID

  const { updateData, data } = useFormStore()

  const onSubmit = async (formData) => {
    const { notes } = formData
    updateData({ notes })

    try {
      const res = await updateProfile({
        package_id,
        staff_id,
        company_id,
        attachments: data?.attachments,
        notes,
        ...data?.textForm,
      })
      if (res.data.status) {
        toast.success(res.data.message, {
          style: {
            background: 'green',
            color: '#fff',
            border: '2px solid #fff',
          },
         position: 'top-right',
          duration: 30000,
        })
        setIsOpen(false)
        // resetState()
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        style: {
          background: 'red',
          color: '#fff',
          border: '2px solid #fff',
        },
        position: 'top-right',
        duration: 30000,
      })
    }
  }

  return (
    <div className=''>
      {/* <h3 className='header_h3 text-lg capitalize'> note</h3> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className='w-full mx-auto'>
          <Textarea
            {...register('notes')}
            variant='bordered'
            className='mb-6 md:mb-0 my-2 w-[18.5rem] md:w-full md:w[22rem]'
            labelPlacement='outside'
            placeholder='Enter your note'
          />
        </div> */}

        <div className=''>
          <label className='header_h3 pb-4 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
            Add Note
          </label>
          <div className='flex items-center w-full flexcol'>
            <textarea
              // name='notes'
              {...register('notes')}
              className={`border rounded-md flex-1 bg-[#f1f1f1] border-blue-200 focus:outline-none focus:ring-2  focus:border-transparent px-2 py-2 `}
            />
          </div>
        </div>

        {/* <div className='flex items-center my-6 justifybetween justify-end'>
          <Button
            color='primary'
            onClick={onPrev}
            className='my-4 text-white rounded'
          >
            Prev
          </Button>
          <Button
            type='submit'
            color='success'
            className='my-4 text-white rounded'
          >
            Submit
          </Button>
        </div> */}
        <div className='flex justify-end py-3'>
          <button
            type='submit'
            className='bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default NoteForm
