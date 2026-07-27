import { CircularProgress } from '@nextui-org/react'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { Line, LineChart, Tooltip } from 'recharts'

function EarningsCard() {
  const data = [
    { name: 'SUN', value: 400 },
    { name: 'MON', value: 200 },
    { name: 'TUe', value: 450 },
    { name: 'WED', value: 460 },
    { name: 'THUR', value: 220 },
    { name: 'FRI', value: 380 },
    { name: 'SAT', value: 800 },
  ]
  const data2 = [
    { name: 'SUN', value: 400 },
    { name: 'MON', value: 200 },
    { name: 'TUe', value: 550 },
    { name: 'WED', value: 760 },
    { name: 'THUR', value: 220 },
    { name: 'FRI', value: 380 },
    { name: 'SAT', value: 400 },
  ]

  return (
    <div className=' bg-white shadow border h-full flex flex-col '>
      <div className=' p-4 flex' role='tablist'>
        <div className='col-auto'>
          <div className='border-r pr-8'>
            <div className=' text-3xl text-stone-900 font-Roboto font-medium'>
              $25k
            </div>
            <div className='d-flex flex-col'>
              <p className='mb-0'>
                <strong>Earnings</strong>
              </p>
              <small className='text-50'>This billing cycle</small>
            </div>
          </div>
        </div>

        <div className='pl-4 flex justify-between items-start'>
          <div className='flex items-center gap-4 self-start'>
            <a href='#'>
              <CircularProgress
                size='lg'
                value={42}
                classNames={{
                  indicator: 'stroke-[#17a2b8]',
                }}
                showValueLabel={true}
              />
            </a>
            <p className='text-[12px]'>4 of 12 invoices</p>
          </div>
          <div>
            <HiOutlineDotsHorizontal className='w-4 h-4 text-gray-400' />
          </div>
        </div>
      </div>

      <div className='chart relative mt-6' style={{ height: '68px' }}>
        <div className='absolute'>
          <LineChart width={300} height={80} data={data}>
            <Tooltip />
            <Line
              type='monotone'
              dataKey='value'
              dot={false}
              activeDot={false}
              strokeWidth={'2.5px'}
              stroke='#2196F3'
              animationDuration={0}
            />
          </LineChart>
        </div>
        <div className='absolute'>
          <LineChart width={300} height={80} data={data2}>
            <Tooltip />
            <Line
              type='monotone'
              dataKey='value'
              dot={false}
              activeDot={false}
              strokeWidth={'2.5px'}
              stroke='#20c997'
              yAxisId='left'
            />
          </LineChart>
        </div>
      </div>
    </div>
  )
}

export default EarningsCard
