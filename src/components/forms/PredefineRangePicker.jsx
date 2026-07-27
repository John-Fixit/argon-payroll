import { useState, useRef, useEffect } from 'react'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'

const PredefineRangePicker = () => {
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const datePickerRef = useRef(null)

  const handleSelect = (ranges) => {
    setSelectedRange([ranges.selection])
  }

  const handleInputClick = () => {
    setShowDatePicker(true)
  }

  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setShowDatePicker(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='w-full grid gap-2 mt-4' ref={datePickerRef}>
      <h1 className='font-bold text-sm py-1'>Predefined Range</h1>

      <input
        type='text'
        onClick={handleInputClick}
        value={`${selectedRange[0].startDate.toISOString().split('T')[0]} to ${
          selectedRange[0].endDate
            ? selectedRange[0].endDate.toISOString().split('T')[0]
            : 'Select end date'
        }`}
        className='w-[600px] h-8 border order-2 border-gray-300 rounded-md p-2 focus:outline-none'
        readOnly
      />
      {showDatePicker && (
        <DateRangePicker
          className='w-[600px]'
          ranges={selectedRange}
          onChange={handleSelect}
        />
      )}
    </div>
  )
}

export default PredefineRangePicker
