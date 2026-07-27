/* eslint-disable react/prop-types */
import { Textarea, Button } from '@nextui-org/react'
import { useGetProfile, useUpdateProfile } from '../../API/profile'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import useCurrentUser from '../../hooks/useCurrentUser'
import useFormStore from '../formRequest/store'

const NoteForm = ({ onPrev }) => {
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
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message)
    }
  }

  return (
    <div className='py-8'>
      <h3 className='font-serif text-lg capitalize'>add note</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full mx-auto'>
          <Textarea
            {...register('notes')}
            className='mb-6 md:mb-0 my-2 w-[18.5rem] md:w-full md:w[22rem]'
            labelPlacement='outside'
            placeholder='Enter your note'
          />
        </div>

        <div className='flex items-center my-6 justify-between'>
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
        </div>
      </form>
    </div>
  )
}

export default NoteForm
