/* eslint-disable react/prop-types */
import { Divider } from '@nextui-org/react'

export default function OverViewCard({ title, percentIncrease, number }) {
  return (
    <div>
      <div className='bg-white w[300px] rounded py-2 h-full border shadow'>
        <div className='flex justify-between py-2 px-4 items-center'>
          <div className='flex divide-x-1 gap-4 items-center'>
            <div className='font-Latos font-medium'>
              <p className='text-black text-md '>{title}</p>
            </div>
          </div>
          <div>
            <p className='text-green-500 font-medium'>{percentIncrease}</p>
          </div>
        </div>
        <Divider />
        <div className=' my-4 font-medium space-y-1 py-[0.54rem] px-4 rounded '>
          <div className=''>
            <div className='flex items-center justify-between mb-2'>
              <p className='font-medium text-3xl'>{number}</p>
            </div>
          </div>
          <div className=''>
            <div className='w-full bg-gray-200 rounded-full h-1'>
              <div className='bg-orange-400 h-1 rounded-full w-[50%]'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
