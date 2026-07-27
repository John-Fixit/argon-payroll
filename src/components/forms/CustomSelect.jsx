/* eslint-disable react/prop-types */
import { Select, SelectItem } from '@nextui-org/react'

const CustomSelect = ({ label, options, placeholder, value, onChange }) => {
  return (
    <>
      <div className='flex flex-col gap-2'>
        <Select
          size='md'
          labelPlacement='outside'
          label={label}
          variant='bordered'
          placeholder={placeholder}
          selectedKeys={[value]}
          onChange={onChange}
        >
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </>
  )
}

export default CustomSelect
