import {Button, Input,} from '@nextui-org/react'
import { useRef, useState } from 'react'

export default function ProfilePictureTextForm() {
const fileRef=useRef(null)
const [previewImage, setPreviewImage] = useState(null)

  const handleImageChange = async(e) => {
    const file =await e.target.files[0]
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const selectProfile = () => {
  fileRef.current.click()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='grid gap-2 w-full p-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] '>Change Picture</h2>
      <form onSubmit={handleSubmit}>
       <div className='flex flex-col md:flex-row gap-8 justify-center w-[80%] mx-auto'>
       <div className='w-40'>
       <p className='font-semibold mb-2'>Old Picture</p>
       <img src="https://i.stack.imgur.com/l60Hf.png" alt="" className='border rounded h-40 w-40' />
       </div>
       <div className='w-40'>
       <p className='font-semibold mb-2'>New Picture</p>
       <img src={`${previewImage?previewImage:"https://i.stack.imgur.com/l60Hf.png"}`} alt="" className='border rounded h-40 w-40 cursor-pointer' onClick={selectProfile} />
         <Input
         ref={fileRef}
                type='file'
                accept='.jpg, .jpeg, .png, .gif, .pdf'
                size='sm'
                className='rounded-sm hidden'
                label='Image'
                labelPlacement='outside'
                placeholder='image'
                id='image'
                name='image'
                onChange={handleImageChange} // Add the desired file types
              />
       </div>
       </div>

        <div className='flex justify-end'>
          <Button
            color='success'
            className='my-4  text-white rounded'
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
