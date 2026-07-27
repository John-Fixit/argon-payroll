// import { useState } from 'react'
// import DatePicker from 'react-datepicker'
import { DatePicker } from 'rsuite'

const SinglePickerComponent = () => {
  // const [selectedDate, setSelectedDate] = useState(null)

  // const handleDateChange = (date) => {
  //   setSelectedDate(date)
  // }

  return (
    <div className='w-full  mx-auto mt-4'>
      <h1 className='font-bold text-sm py-1'>Date</h1>
      {/* <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat='MM/dd/yyyy'
        placeholderText='Select a date'
        className='w-[600px]  border border-gray-300 h-8 rounded-md p-2 focus:outline-none'
      /> */}
      <DatePicker
        className='w-[600px]  border-gray-300 h-8 rounded-md  focus:outline-none'
        format='MM/dd/yyyy'
      />
    </div>
  )
}

export default SinglePickerComponent
