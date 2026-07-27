import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import LeaveHandOverCard from '../../../components/self_services/LeaveHandOverCard'

const LeaveHandover = () => {
  return (
    <div className='max-w-[63rem] mx-auto'>
      <div className='py-6'>
        <h1 className='text-[#1f1f1f] font-helvetica font-bold text-2xl sm:text-3xl '>
          LeaveHandover
        </h1>
        <Breadcrumbs
          separator='/'
          itemClasses={{
            separator: 'px-2',
          }}
          className='text-[#6c757d] text-[26px] font-medium '
        >
          <BreadcrumbItem>
            <p className='text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica '>
              SELF SERVICE
            </p>{' '}
          </BreadcrumbItem>
          <BreadcrumbItem>
            {' '}
            <p className='text-[15px] '>LeaveHandover</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className='flex  flex-wrap gap-3 p-4 '>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <LeaveHandOverCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default LeaveHandover
