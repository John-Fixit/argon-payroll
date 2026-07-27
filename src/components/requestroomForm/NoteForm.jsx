// import { Card } from '@nextui-org/react/dist'
import { useState } from 'react'
import { Card, CardBody, Textarea, Button } from '@nextui-org/react'
import { PlusCircle, Trash2Icon } from 'lucide-react'

const NoteForm = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  const handleInputChange = (e) => {
    setNewNote(e.target.value)
  }

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      setNotes([...notes, newNote])
      setNewNote('')
    }
  }

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index)
    setNotes(updatedNotes)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Logic to submit notes goes here
    // For example, you might want to send notes to an API, save them in the database, etc.
    console.log('Submitted Notes:', notes)
    setNotes([])
  }

  return (
    <div className='w-full py-8'>
      <h2 className='text-lg font-semibold text-[#212529] '>Add Note</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <Textarea
            value={newNote}
            onChange={handleInputChange}
            // label='Add Note'
            labelPlacement='outside'
            placeholder='Enter your note'
            className='col-span-12 md:col-span-6 mb-6 md:mb-0 my-2'
          />

          <PlusCircle
            className='bg-blue-500 text-white rounded-full my-2 w-8 h-8'
            onClick={handleAddNote}
          />
        </div>
        <div className='my-6'>
          {notes.map((note, index) => (
            <Card key={index} className=' my-2 shadow '>
              <CardBody className='flex flex-row justify-between items-center gap-3'>
                <p className=''>{note}</p>
                <Button
                  variant='isbordered'
                  isIconOnly
                  type='button'
                  onClick={() => handleDeleteNote(index)}
                >
                  <Trash2Icon className='text-red-500' />
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
        <Button
          color='success'
          className='my-4 text-white rounded'
          onClick={handleAddNote}
        >
          Submit Notes
        </Button>
      </form>
    </div>
  )
}

export default NoteForm
