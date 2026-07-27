import { Button, Select, SelectItem } from '@nextui-org/react'
import { animals } from './datas'
import { useState } from 'react'

export default function LanguagesTextForm() {
  const [information, setInformation] = useState({
  language:'',
  level:'',
  })

  const handleSelectionLanguage = (e) => {
    setInformation(prev=>{
    return {...prev,language:e.target.value}
    })
  }
  const handleSelectionLevel = (e) => {
    setInformation(prev=>{
    return {...prev,level:e.target.value}
    })
  }
  return (
    <div className='grid gap-2 w-full p-8 '>
      <h2 className='text-[22px] font-normal text-[#212529] mb-4'>
       Add Languages Spoken
      </h2>
      <form action=''>
        <div className='grid grid-cols-2 w-full flex-wrap  mb-6 md:mb-0 gap-4'>
          <Select
            label='Language'
            labelPlacement='outside'
            placeholder='Language'
            selectedKeys={[information.language]}
            className='max-w-xs rounded-sm'
            onChange={handleSelectionLanguage}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <Select
            label='Level'
            labelPlacement='outside'
            placeholder='Level'
            selectedKeys={[information.level]}
            className='max-w-xs rounded-sm'
            onChange={handleSelectionLevel}
          >
            {animals.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className='flex items-center justify-end'>
          <Button
            color='success'
            className='my-4  text-white rounded'
            // onClick={handleAddNote}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
