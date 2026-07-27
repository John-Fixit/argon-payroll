import { Button, Card, CardBody } from '@nextui-org/react'
import { useState } from 'react'

import { Input } from '@nextui-org/react'
import { LucideUpload, PlusIcon, Trash2Icon } from 'lucide-react'

const AttachmentForm = () => {
  const [attachments, setAttachments] = useState([])
  const [attachmentName, setAttachmentName] = useState('')
  const [attachmentFile, setAttachmentFile] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleNameInputChange = (e) => {
    setAttachmentName(e.target.value)
  }

  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    // setAttachmentName(file.name)
    setAttachmentFile(file)
    // setSelectedFile(URL.createObjectURL(file)) // Create a URL for preview
    setSelectedFile(attachmentFile) // Create a URL for preview
  }

  const handleAddAttachment = () => {
    if (attachmentName.trim() !== '' && attachmentFile) {
      setAttachments([
        ...attachments,
        { name: attachmentName, file: attachmentFile },
      ])
      setAttachmentName('')
      setAttachmentFile(null)
      setSelectedFile(null) // Clear the selected file preview
    }
  }

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index)
    setAttachments(updatedAttachments)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic to submit attachments goes here
    // For example, you might want to send attachments to an API, save them in the database, etc.
    // console.log('Submitted Attachments:', attachments)
    setAttachments([])
  }

  return (
    <div className='py-8'>
      <h3 className='font-serif text-lg capitalize'>add attachment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <div className=' grid gap-3 my-4'>
            <div className='flex elative items-center cursor-text bg-gray-100 rounded-lg hover:bg-gray-200 px-2'>
              <label htmlFor='fileInput'>
                <LucideUpload
                  className='text-2xl bsolute text-default-400 cursor-pointer'
                  variant='transparent'
                  aria-label='add file'
                />
              </label>
              <input
                data-slot='input'
                data-has-start-content='true'
                className='w-full font-normal bg-gray-100 cursor-text hover:bg-gray-200 py-2 rounded-md bgtransparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small group-data-[has-value=true]:text-default-foreground'
                id='fileInput'
                aria-label=' '
                type='file'
                name='attachments'
                onChange={handleFileInputChange}
              />
            </div>
            <Input
              type='text'
              size='md'
              value={attachmentName}
              label='Attachment Name'
              labelPlacement='outside'
              onChange={handleNameInputChange}
              className=' bgwhite w-full ring-0 rounded-md '
            />
          </div>

          <div className='flex gap-2 items-center'>
            <Button
              color='primary'
              variant='bordered'
              className='my-4 rounded font-normal hover:-translate-y-1 ease-in-out duration-300'
              onClick={handleAddAttachment}
              endContent={<PlusIcon />}
            >
              {attachments.length > 0 ? 'Add more' : 'Add Attachment'}
            </Button>
          </div>
        </div>
        <div>
          <ul className=''>
            {attachments.map((attachment, index) => (
              <Card key={index} className=' my-2 shadow '>
                <CardBody className='flex flex-row justify-between items-center gap-3'>
                  <div>
                    <div className='text-[#444] font-medium'>
                      Name: {attachment.name}
                    </div>
                    <div>
                      {' '}
                      <span className='font-semibold'>File:</span>{' '}
                      {attachment.file.name}
                    </div>
                  </div>
                  <Button
                    type='button'
                    className='bg-white text-md font-semibold rounded-md'
                    onClick={() => handleDeleteAttachment(index)}
                    isIconOnly
                  >
                    <Trash2Icon className='text-red-500' />
                  </Button>
                </CardBody>
              </Card>
            ))}
          </ul>
        </div>
        {attachments.length > 0 && (
          <Button
            type='submit'
            color='success'
            className='my-4 text-white rounded'
          >
            Submit Attachments
          </Button>
        )}
      </form>
    </div>
  )
}

export default AttachmentForm
