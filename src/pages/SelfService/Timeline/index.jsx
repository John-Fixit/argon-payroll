// import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import TimeLine from '../../../components/self_services/timeline/TimeLine'
import Header from '../../../components/self_services/timeline/Header'
import Separator from '../../../components/payroll_components/Separator'

const Timeline = () => {
  return (
   <div className="py-8 font-helvetica">
    <Header />
     <div className="mb-6">
  <Separator separator_text={'History'}/>
  </div>
          <TimeLine />
      {/* <div className='py-6'>
        <h1 className='font-helvetica font-bold text-2xl sm:text-3xl '>
          Timeline
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
            <p className='text-[15px] '>Timeline</p>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className='flex  flex-wrap gap-3 p-4 '>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <TimeLine key={index} />
        ))}
      </div> */}
    </div>
  )
}

export default Timeline
